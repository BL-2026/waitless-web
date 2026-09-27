import type { LanguageCode, PaymentMethod } from "../types";

export interface Strings {
  brand: string;
  chooseLanguage: string;
  chooseLanguageHint: string;
  welcome: string;
  table: string;
  zone: string;
  waitress: string;
  waitressHint: string;
  menu: string;
  menuHint: string;
  bill: string;
  billHint: string;
  waitressSentTitle: string;
  waitressSentBody: string;
  back: string;
  howToPay: string;
  howToPayHint: string;
  card: string;
  cash: string;
  cancel: string;
  billSentTitle: string;
  billSentBody: (method: PaymentMethod) => string;
  loading: string;
  currency: string;
  tableNotFoundTitle: string;
  tableNotFoundBody: string;
  offlineTitle: string;
  offlineBody: string;
  serverErrorTitle: string;
  serverErrorBody: string;
  retry: string;
  sendFailedTitle: string;
  sendFailedBody: string;
  sendOfflineTitle: string;
  sendOfflineBody: string;
}

export const LANGUAGES: { code: LanguageCode; label: string; native: string }[] = [
  { code: "fr", label: "Français", native: "Français" },
  { code: "ar", label: "العربية", native: "العربية" },
  { code: "en", label: "English", native: "English" },
  { code: "es", label: "Español", native: "Español" },
];

export const STRINGS: Record<LanguageCode, Strings> = {
  en: {
    brand: "Floorcall",
    chooseLanguage: "Choose your language",
    chooseLanguageHint: "Your table experience, in your language.",
    welcome: "Welcome",
    table: "Table",
    zone: "Zone",
    waitress: "Call waiter",
    waitressHint: "A team member will come to your table.",
    menu: "View the menu",
    menuHint: "Explore dishes, drinks, and specialties.",
    bill: "Request the bill",
    billHint: "Pay by card or cash, without leaving your seat.",
    waitressSentTitle: "On the way",
    waitressSentBody: "Someone from the team will be with you shortly.",
    back: "Back to table",
    howToPay: "How would you like to pay?",
    howToPayHint: "We’ll bring the bill to your table.",
    card: "Card",
    cash: "Cash",
    cancel: "Cancel",
    billSentTitle: "The bill is on its way",
    billSentBody: (method) =>
      method === "card"
        ? "A team member will bring a card terminal to your table."
        : "A team member will bring your bill for cash payment.",
    loading: "Preparing your table…",
    currency: "DH",
    tableNotFoundTitle: "We can’t find your table",
    tableNotFoundBody: "Scan the QR code on your table to get started.",
    offlineTitle: "No internet connection",
    offlineBody: "Check your network and try again.",
    serverErrorTitle: "Something went wrong",
    serverErrorBody: "The restaurant could not load your table. Please try again.",
    retry: "Try again",
    sendFailedTitle: "Request not sent",
    sendFailedBody: "Something went wrong on the way. Please try again.",
    sendOfflineTitle: "No internet connection",
    sendOfflineBody: "Your request was not sent. Check your network and try again.",
  },
  fr: {
    brand: "Floorcall",
    chooseLanguage: "Choisissez votre langue",
    chooseLanguageHint: "Votre expérience à table, dans votre langue.",
    welcome: "Bienvenue",
    table: "Table",
    zone: "Zone",
    waitress: "Appeler le serveur",
    waitressHint: "Un membre de l’équipe viendra à votre table.",
    menu: "Voir la carte",
    menuHint: "Découvrez plats, boissons et spécialités.",
    bill: "Demander l’addition",
    billHint: "Payez par carte ou en espèces, sans quitter votre place.",
    waitressSentTitle: "En route",
    waitressSentBody: "Quelqu’un de l’équipe sera avec vous sous peu.",
    back: "Retour à la table",
    howToPay: "Comment souhaitez-vous payer ?",
    howToPayHint: "Nous apporterons l’addition à votre table.",
    card: "Carte",
    cash: "Espèces",
    cancel: "Annuler",
    billSentTitle: "L’addition arrive",
    billSentBody: (method) =>
      method === "card"
        ? "Un membre de l’équipe apportera un terminal de paiement."
        : "Un membre de l’équipe apportera l’addition pour un paiement en espèces.",
    loading: "Préparation de votre table…",
    currency: "DH",
    tableNotFoundTitle: "Table introuvable",
    tableNotFoundBody: "Scannez le QR code sur votre table pour commencer.",
    offlineTitle: "Pas de connexion Internet",
    offlineBody: "Vérifiez votre réseau et réessayez.",
    serverErrorTitle: "Une erreur est survenue",
    serverErrorBody:
      "Le restaurant n’a pas pu charger votre table. Veuillez réessayer.",
    retry: "Réessayer",
    sendFailedTitle: "Demande non envoyée",
    sendFailedBody: "Un problème est survenu. Veuillez réessayer.",
    sendOfflineTitle: "Pas de connexion Internet",
    sendOfflineBody:
      "Votre demande n’a pas été envoyée. Vérifiez votre réseau et réessayez.",
  },
  es: {
    brand: "Floorcall",
    chooseLanguage: "Elige tu idioma",
    chooseLanguageHint: "Tu experiencia en mesa, en tu idioma.",
    welcome: "Bienvenido",
    table: "Mesa",
    zone: "Zona",
    waitress: "Llamar al camarero",
    waitressHint: "Un miembro del equipo vendrá a tu mesa.",
    menu: "Ver la carta",
    menuHint: "Explora platos, bebidas y especialidades.",
    bill: "Pedir la cuenta",
    billHint: "Paga con tarjeta o en efectivo, sin moverte.",
    waitressSentTitle: "En camino",
    waitressSentBody: "Alguien del equipo estará contigo en breve.",
    back: "Volver a la mesa",
    howToPay: "¿Cómo te gustaría pagar?",
    howToPayHint: "Llevaremos la cuenta a tu mesa.",
    card: "Tarjeta",
    cash: "Efectivo",
    cancel: "Cancelar",
    billSentTitle: "La cuenta está en camino",
    billSentBody: (method) =>
      method === "card"
        ? "Un miembro del equipo traerá el datáfono."
        : "Un miembro del equipo traerá la cuenta para pago en efectivo.",
    loading: "Preparando tu mesa…",
    currency: "DH",
    tableNotFoundTitle: "No encontramos tu mesa",
    tableNotFoundBody: "Escanea el código QR de tu mesa para empezar.",
    offlineTitle: "Sin conexión a Internet",
    offlineBody: "Comprueba tu red e inténtalo de nuevo.",
    serverErrorTitle: "Algo ha salido mal",
    serverErrorBody: "El restaurante no pudo cargar tu mesa. Inténtalo de nuevo.",
    retry: "Reintentar",
    sendFailedTitle: "Solicitud no enviada",
    sendFailedBody: "Algo ha ido mal. Inténtalo de nuevo.",
    sendOfflineTitle: "Sin conexión a Internet",
    sendOfflineBody:
      "Tu solicitud no se envió. Comprueba tu red e inténtalo de nuevo.",
  },
  ar: {
    brand: "Floorcall",
    chooseLanguage: "اختر لغتك",
    chooseLanguageHint: "تجربتك على الطاولة، بلغتك.",
    welcome: "مرحباً",
    table: "الطاولة",
    zone: "المنطقة",
    waitress: "استدعاء النادل",
    waitressHint: "سيأتي أحد أفراد الفريق إلى طاولتك.",
    menu: "عرض القائمة",
    menuHint: "اكتشف الأطباق والمشروبات والتخصصات.",
    bill: "طلب الحساب",
    billHint: "ادفع بالبطاقة أو نقداً دون مغادرة مقعدك.",
    waitressSentTitle: "في الطريق",
    waitressSentBody: "سيكون أحد أفراد الفريق معك قريباً.",
    back: "العودة إلى الطاولة",
    howToPay: "كيف تريد الدفع؟",
    howToPayHint: "سنحضر الحساب إلى طاولتك.",
    card: "بطاقة",
    cash: "نقداً",
    cancel: "إلغاء",
    billSentTitle: "الحساب في الطريق",
    billSentBody: (method) =>
      method === "card"
        ? "سيجلب أحد أفراد الفريق جهاز الدفع بالبطاقة."
        : "سيجلب أحد أفراد الفريق الحساب للدفع نقداً.",
    loading: "جارٍ تجهيز طاولتك…",
    currency: "د.م",
    tableNotFoundTitle: "لم نتمكن من العثور على طاولتك",
    tableNotFoundBody: "امسح رمز QR الموجود على طاولتك للبدء.",
    offlineTitle: "لا يوجد اتصال بالإنترنت",
    offlineBody: "تحقق من الشبكة وحاول مرة أخرى.",
    serverErrorTitle: "حدث خطأ ما",
    serverErrorBody: "تعذر على المطعم تحميل طاولتك. يرجى المحاولة مرة أخرى.",
    retry: "أعد المحاولة",
    sendFailedTitle: "لم يتم إرسال الطلب",
    sendFailedBody: "حدث خطأ ما. يرجى المحاولة مرة أخرى.",
    sendOfflineTitle: "لا يوجد اتصال بالإنترنت",
    sendOfflineBody: "لم يتم إرسال طلبك. تحقق من الشبكة وحاول مرة أخرى.",
  },
};
