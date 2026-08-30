import type {
  Table,
  RequestTypeValue,
  PaymentMethod,
  LanguageCode,
} from "../types";

const MOCK_TABLES: Record<LanguageCode, Table> = {
  en: {
    tableNumber: 7,
    restaurant: { name: "Cafe Meridian" },
    menu: [
      {
        category: "Coffee",
        items: [
          { name: "Flat white", desc: "Double shot, steamed milk", price: "4.50" },
          { name: "Pour over", desc: "Single origin, rotating", price: "5.00" },
        ],
      },
      {
        category: "Bakery",
        items: [{ name: "Almond croissant", desc: "Baked daily", price: "4.25" }],
      },
    ],
  },
  fr: {
    tableNumber: 7,
    restaurant: { name: "Café Meridian" },
    menu: [
      {
        category: "Café",
        items: [
          { name: "Flat white", desc: "Double shot, lait vapoté", price: "4.50" },
          { name: "Filtre", desc: "Origine unique, rotation", price: "5.00" },
        ],
      },
      {
        category: "Boulangerie",
        items: [{ name: "Croissant aux amandes", desc: "Cuit chaque jour", price: "4.25" }],
      },
    ],
  },
  es: {
    tableNumber: 7,
    restaurant: { name: "Café Meridian" },
    menu: [
      {
        category: "Café",
        items: [
          { name: "Flat white", desc: "Doble espresso, leche vaporizada", price: "4.50" },
          { name: "Filtrado", desc: "Un solo origen, rotativo", price: "5.00" },
        ],
      },
      {
        category: "Panadería",
        items: [{ name: "Croissant de almendra", desc: "Horneado cada día", price: "4.25" }],
      },
    ],
  },
  ar: {
    tableNumber: 7,
    restaurant: { name: "كافيه ميريديان" },
    menu: [
      {
        category: "القهوة",
        items: [
          { name: "فلات وايت", desc: "مزدوج، حليب مبخر", price: "4.50" },
          { name: "قهوة مصفاة", desc: "أصل واحد، متنوع", price: "5.00" },
        ],
      },
      {
        category: "المخبوزات",
        items: [{ name: "كرواسون اللوز", desc: "مخبوز يوميًا", price: "4.25" }],
      },
    ],
  },
};

// The return type Promise<Table> is a promise: this documents the shape
// of data every caller will get back, matching what Spring will
// eventually return as JSON from GET /api/tables/{tableToken}.
export async function fetchTable(
  _tableToken: string,
  language: LanguageCode = "en"
): Promise<Table> {
  // const res = await fetch(`/api/tables/${_tableToken}?lang=${language}`);
  // if (!res.ok) throw new Error("Failed to load table");
  // return res.json();
  return Promise.resolve(MOCK_TABLES[language]);
}

// An interface for the request payload keeps createRequest's signature
// readable, and paymentMethod being optional (the "?") mirrors reality:
// it's only present for REQUEST_BILL, not CALL_WAITER.
export interface CreateRequestPayload {
  tableNumber: number;
  type: RequestTypeValue;
  paymentMethod?: PaymentMethod;
}

export async function createRequest(
  payload: CreateRequestPayload
): Promise<{ ok: boolean }> {
  // const res = await fetch("/api/requests", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(payload),
  // });
  // if (!res.ok) throw new Error("Failed to send request");
  // return res.json();
  console.log("Request sent:", payload);
  return Promise.resolve({ ok: true });
}
