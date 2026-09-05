import type {
  Table,
  RequestTypeValue,
  PaymentMethod,
  LanguageCode,
} from "../types";

const MOCK_TABLES: Record<LanguageCode, Table> = {
  en: {
    tableNumber: 7,
    zone: "Terrace",
    restaurant: { name: "Maison Atlas" },
    menu: [
      {
        category: "Coffee",
        items: [
          { name: "Espresso", desc: "Single origin, roasted in Casablanca", price: "18" },
          { name: "Café crème", desc: "Double shot, steamed milk", price: "28" },
          { name: "Mint tea", desc: "Gunpowder, fresh nana mint", price: "22" },
        ],
      },
      {
        category: "Breakfast",
        items: [
          { name: "Msmen & honey", desc: "Warm layered pancake, Amlou, thyme honey", price: "45" },
          { name: "Atlas bowl", desc: "Yogurt, orange blossom, almonds, dates", price: "52" },
        ],
      },
      {
        category: "Kitchen",
        items: [
          { name: "Chicken pastilla", desc: "Crisp warqa, cinnamon, toasted almonds", price: "95" },
          { name: "Lamb tagine", desc: "Prunes, sesame, slow-cooked in clay", price: "120" },
          { name: "Sea bass chermoula", desc: "Charred vegetables, preserved lemon", price: "135" },
        ],
      },
    ],
  },
  fr: {
    tableNumber: 7,
    zone: "Terrasse",
    restaurant: { name: "Maison Atlas" },
    menu: [
      {
        category: "Café",
        items: [
          { name: "Espresso", desc: "Origine unique, torréfié à Casablanca", price: "18" },
          { name: "Café crème", desc: "Double shot, lait vapeur", price: "28" },
          { name: "Thé à la menthe", desc: "Gunpowder, nana fraîche", price: "22" },
        ],
      },
      {
        category: "Petit-déjeuner",
        items: [
          { name: "Msemen & miel", desc: "Feuilleté chaud, amlou, miel de thym", price: "45" },
          { name: "Bol Atlas", desc: "Yaourt, fleur d’oranger, amandes, dattes", price: "52" },
        ],
      },
      {
        category: "Cuisine",
        items: [
          { name: "Pastilla au poulet", desc: "Warqa croustillante, cannelle, amandes", price: "95" },
          { name: "Tajine d’agneau", desc: "Pruneaux, sésame, cuit à l’étouffée", price: "120" },
          { name: "Bar en chermoula", desc: "Légumes grillés, citron confit", price: "135" },
        ],
      },
    ],
  },
  es: {
    tableNumber: 7,
    zone: "Terraza",
    restaurant: { name: "Maison Atlas" },
    menu: [
      {
        category: "Café",
        items: [
          { name: "Espresso", desc: "Origen único, tostado en Casablanca", price: "18" },
          { name: "Café crème", desc: "Doble espresso, leche vaporizada", price: "28" },
          { name: "Té de menta", desc: "Gunpowder, hierbabuena fresca", price: "22" },
        ],
      },
      {
        category: "Desayuno",
        items: [
          { name: "Msemen y miel", desc: "Panqueque hojaldrado, amlou, miel de tomillo", price: "45" },
          { name: "Bol Atlas", desc: "Yogur, azahar, almendras, dátiles", price: "52" },
        ],
      },
      {
        category: "Cocina",
        items: [
          { name: "Pastela de pollo", desc: "Warqa crujiente, canela, almendras", price: "95" },
          { name: "Tajine de cordero", desc: "Ciruelas, sésamo, cocción lenta", price: "120" },
          { name: "Lubina chermoula", desc: "Verduras asadas, limón en conserva", price: "135" },
        ],
      },
    ],
  },
  ar: {
    tableNumber: 7,
    zone: "التراس",
    restaurant: { name: "ميزون أطلس" },
    menu: [
      {
        category: "القهوة",
        items: [
          { name: "إسبريسو", desc: "أصل واحد، محمّص في الدار البيضاء", price: "18" },
          { name: "كافيه كريم", desc: "جرعتان، حليب مبخّر", price: "28" },
          { name: "شاي بالنعناع", desc: "شاي أخضر ونعناع طازج", price: "22" },
        ],
      },
      {
        category: "الفطور",
        items: [
          { name: "مسمن وعسل", desc: "مسمن دافئ، أملو، عسل الزعتر", price: "45" },
          { name: "صحن أطلس", desc: "زبادي، زهر البرتقال، لوز وتمور", price: "52" },
        ],
      },
      {
        category: "المطبخ",
        items: [
          { name: "بسطيلة الدجاج", desc: "ورقة مقرمشة، قرفة ولوز", price: "95" },
          { name: "طاجين لحم", desc: "برقوق، سمسم، طهي بطيء", price: "120" },
          { name: "قاروص بالشرمولة", desc: "خضار مشوية وليمون مخلل", price: "135" },
        ],
      },
    ],
  },
};

export async function fetchTable(
  _tableToken: string,
  language: LanguageCode = "en"
): Promise<Table> {
  return Promise.resolve(MOCK_TABLES[language]);
}

export interface CreateRequestPayload {
  tableNumber: number;
  type: RequestTypeValue;
  paymentMethod?: PaymentMethod;
}

export async function createRequest(
  payload: CreateRequestPayload
): Promise<{ ok: boolean }> {
  console.log("Request sent:", payload);
  return Promise.resolve({ ok: true });
}
