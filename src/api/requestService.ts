import type {
  MenuSection,
  PaymentMethod,
  RequestTypeValue,
  Table,
} from "../types";

/// Override per environment, e.g. VITE_API_BASE_URL=http://192.168.1.20:8081
/// when a phone on the same network scans the QR code.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8081";

/** Shape of the backend's `TableResolutionResponse`. */
interface TableResolution {
  table: { id: string; tableNumber: number; zone: string | null };
  store: { id: string; name: string };
  menu: {
    id: string;
    category: string;
    name: string;
    description: string | null;
    price: number;
  }[];
}

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

/** The QR code points at `/?t=<qrToken>`; the token is the customer's only credential. */
export function readTableToken(): string | null {
  const params = new URLSearchParams(window.location.search);
  return params.get("t") ?? params.get("table");
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...init,
      headers: { "Content-Type": "application/json", ...init?.headers },
    });
  } catch {
    // Backend down, wrong host, no network — status 0 so callers can tell this
    // apart from a real HTTP error.
    throw new ApiError("Cannot reach the server", 0);
  }

  if (!response.ok) {
    // Errors come back as `ApiError { timestamp, status, error, message }`.
    let message = response.statusText;
    try {
      const body = (await response.json()) as { message?: string };
      message = body.message ?? message;
    } catch {
      // Non-JSON error body; the status text will do.
    }
    throw new ApiError(message, response.status);
  }

  return (await response.json()) as T;
}

/** `18.00` reads better as `18`, but `120.50` must keep its cents. */
function formatPrice(price: number): string {
  return Number.isInteger(price) ? String(price) : price.toFixed(2);
}

/** The backend returns a flat list ordered by category, the UI wants sections. */
function groupByCategory(items: TableResolution["menu"]): MenuSection[] {
  const sections: MenuSection[] = [];

  for (const item of items) {
    let section = sections.find((candidate) => candidate.category === item.category);
    if (!section) {
      section = { category: item.category, items: [] };
      sections.push(section);
    }
    section.items.push({
      name: item.name,
      desc: item.description ?? "",
      price: formatPrice(item.price),
    });
  }

  return sections;
}

export async function fetchTable(qrToken: string): Promise<Table> {
  const data = await request<TableResolution>(
    `/api/tables/${encodeURIComponent(qrToken)}`
  );

  return {
    tableNumber: data.table.tableNumber,
    zone: data.table.zone,
    restaurant: { id: data.store.id, name: data.store.name },
    menu: groupByCategory(data.menu),
  };
}

export interface CreateRequestPayload {
  storeId: string;
  tableNumber: number;
  qrToken: string;
  type: RequestTypeValue;
  paymentMethod?: PaymentMethod;
}

export async function createRequest(payload: CreateRequestPayload): Promise<void> {
  await request("/api/requests", {
    method: "POST",
    body: JSON.stringify({
      // storeId and tableNumber say where we are; qrToken proves it. The server
      // resolves the token itself and 403s if they disagree.
      storeId: payload.storeId,
      tableNumber: payload.tableNumber,
      qrToken: payload.qrToken,
      type: payload.type,
      // The backend enum is upper case. Undefined keys are dropped by stringify,
      // which matters: it rejects a paymentMethod on a CALL_WAITER request.
      paymentMethod: payload.paymentMethod?.toUpperCase(),
    }),
  });
}
