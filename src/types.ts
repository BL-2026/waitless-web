export type LanguageCode = "en" | "fr" | "es" | "ar";

export const RequestType = {
  CALL_WAITER: "CALL_WAITER",
  REQUEST_BILL: "REQUEST_BILL",
} as const;

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
  zone: string;
  restaurant: Restaurant;
  menu: MenuSection[];
}

export type Screen = "welcome" | "menu" | "waitress-sent" | "bill-sent";
