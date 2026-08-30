import type { LanguageCode, PaymentMethod } from "../types";

export interface Strings {
  chooseLanguage: string;
  welcome: string;
  table: string;
  waitress: string;
  menu: string;
  bill: string;
  waitressSentTitle: string;
  waitressSentBody: string;
  back: string;
  howToPay: string;
  card: string;
  cash: string;
  cancel: string;
  billSentTitle: string;
  billSentBody: (method: PaymentMethod) => string;
}

export const LANGUAGES: { code: LanguageCode; label: string }[] = [
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
  { code: "es", label: "Español" },
  { code: "ar", label: "العربية" }
];

// Record<LanguageCode, Strings> means: this object MUST have exactly
// one key per LanguageCode ("en" | "fr" | "es" | "ar"), and each value MUST
// match the Strings shape above. If you add a language to LanguageCode
// in types.ts but forget to add it here, TypeScript will error —
// this is the main payoff of typing translations.
export const STRINGS: Record<LanguageCode, Strings> = {
  en: {
    chooseLanguage: "Choose your language",
    welcome: "Welcome to",
    table: "Table",
    waitress: "Call waitress",
    menu: "Menu",
    bill: "Ask for the bill",
    waitressSentTitle: "Waitress is on the way",
    waitressSentBody: "Someone from the team will be with you shortly.",
    back: "Back",
    howToPay: "How would you like to pay?",
    card: "Card",
    cash: "Cash",
    cancel: "Cancel",
    billSentTitle: "The bill is on its way",
    billSentBody: (method) =>
      method === "card"
        ? "A team member will bring a card machine to your table."
        : "A team member will bring your bill for cash payment.",
  },
  fr: {
    chooseLanguage: "Choisissez votre langue",
    welcome: "Bienvenue à",
    table: "Table",
    waitress: "Appeler le serveur",
    menu: "Menu",
    bill: "Demander l'addition",
    waitressSentTitle: "Le serveur arrive",
    waitressSentBody: "Quelqu'un de l'équipe sera avec vous sous peu.",
    back: "Retour",
    howToPay: "Comment souhaitez-vous payer ?",
    card: "Carte",
    cash: "Espèces",
    cancel: "Annuler",
    billSentTitle: "L'addition arrive",
    billSentBody: (method) =>
      method === "card"
        ? "Un membre de l'équipe apportera un terminal de paiement."
        : "Un membre de l'équipe apportera l'addition pour un paiement en espèces.",
  },
  es: {
    chooseLanguage: "Elige tu idioma",
    welcome: "Bienvenido a",
    table: "Mesa",
    waitress: "Llamar al camarero",
    menu: "Menú",
    bill: "Pedir la cuenta",
    waitressSentTitle: "El camarero está en camino",
    waitressSentBody: "Alguien del equipo estará contigo en breve.",
    back: "Volver",
    howToPay: "¿Cómo te gustaría pagar?",
    card: "Tarjeta",
    cash: "Efectivo",
    cancel: "Cancelar",
    billSentTitle: "La cuenta está en camino",
    billSentBody: (method) =>
      method === "card"
        ? "Un miembro del equipo traerá el datáfono."
        : "Un miembro del equipo traerá la cuenta para pago en efectivo.",
  },
  ar: {
    chooseLanguage: "اختر لغتك",
    welcome: "مرحبا بكم في",
    table: "الطاولة",
    waitress: "اطلب من الموزع",
    menu: "القائمة",
    bill: "اطلب الحساب",
    waitressSentTitle: "الموزع قادم",
    waitressSentBody: "شخص من الفريق سيكون معك قريبًا.",
    back: "رجوع",
    howToPay: "كيف تريد الدفع?",
    card: "بطاقة",
    cash: "نقدا",
    cancel: "إلغاء",
    billSentTitle: "الحساب قادم",
    billSentBody: (method) =>
      method === "card"
        ? "شخص من الفريق سيجلب آلة البطاقات."
        : "شخص من الفريق سيجلب الحساب للدفع نقدًا.",
  },
};
