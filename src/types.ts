// Centralizing shared types here means every file that needs to know
// "what shape is a Table" imports it from one place, instead of each
// file re-describing the same shape slightly differently.

export type LanguageCode = "en" | "fr" | "es" | "ar";

// A "union type" of exact string values — TypeScript will reject
// anything else, e.g. RequestType.CALL_WAITER = "call_waiterr" (typo)
// would fail to compile instead of silently breaking at runtime.
export const RequestType = {
  CALL_WAITER: "CALL_WAITER",
  REQUEST_BILL: "REQUEST_BILL",
} as const;

// "typeof RequestType" reads the object above, and [keyof ...] pulls out
// its values as a union type: "CALL_WAITER" | "REQUEST_BILL".
export type RequestTypeValue = (typeof RequestType)[keyof typeof RequestType];

export type PaymentMethod = "card" | "cash";

export interface MenuItem {
  name: string;
  desc: string;
  price: string;
}

export interface MenuSection {
  category: string;
  items: MenuItem[];
}

export interface Restaurant {
  name: string;
}

export interface Table {
  tableNumber: number;
  restaurant: Restaurant;
  menu: MenuSection[];
}

export type Screen = "welcome" | "menu" | "waitress-sent" | "bill-sent";
