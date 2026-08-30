import { useEffect, useState } from "react";
import { LanguageProvider, useLanguage } from "./context/LanguageContext";
import { useTable } from "./hooks/useTable";
import { createRequest } from "./api/requestService";
import { RequestType, type Screen, type PaymentMethod, type LanguageCode } from "./types";
import LanguageSelect from "./components/LanguageSelect";
import WelcomeScreen from "./components/WelcomeScreen";
import MenuScreen from "./components/MenuScreen";
import BillModal from "./components/BillModal";
import ConfirmationScreen from "./components/ConfirmationScreen";
import { LANGUAGES } from "./translations/translations";
import { APP_THEME, applyTheme } from "./theme";
import "./App.css";

const TABLE_TOKEN = "table-7";

export default function App() {
  return (
    <LanguageProvider>
      <CustomerFlow />
    </LanguageProvider>
  );
}

function CustomerFlow() {
  const { language, setLanguage, t } = useLanguage();
  const { table, loading } = useTable(TABLE_TOKEN, language ?? "en");

  // useState<Screen> restricts this variable to only the four strings
  // defined in the Screen type (types.ts) — setScreen("oops-typo") would
  // fail to compile.
  const [screen, setScreen] = useState<Screen>("welcome");
  const [showBillModal, setShowBillModal] = useState<boolean>(false);
  const [billMethod, setBillMethod] = useState<PaymentMethod | null>(null);

  useEffect(() => {
    applyTheme(APP_THEME);
  }, []);

  if (!language || !t) {
    return <LanguageSelect />;
  }

  if (loading || !table) {
    return <div className="screen">Loading…</div>;
  }

  async function handleCallWaitress() {
    if (!table) return;

    await createRequest({
      tableNumber: table.tableNumber,
      type: RequestType.CALL_WAITER,
    });
    setScreen("waitress-sent");
  }

  async function handleBillChoice(method: PaymentMethod) {
    if (!table) return;

    setBillMethod(method);
    await createRequest({
      tableNumber: table.tableNumber,
      type: RequestType.REQUEST_BILL,
      paymentMethod: method,
    });
    setShowBillModal(false);
    setScreen("bill-sent");
  }

  return (
    <>
      {language && (
        <div className="top-bar">
          <label className="language-switcher" htmlFor="language-switcher">
            <span>Language</span>
            <select
              id="language-switcher"
              value={language}
              onChange={(event) => setLanguage(event.target.value as LanguageCode)}
            >
              {LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      )}

      {screen === "welcome" && (
        <WelcomeScreen
          t={t}
          tableNumber={table.tableNumber}
          restaurantName={table.restaurant.name}
          onCallWaitress={handleCallWaitress}
          onOpenMenu={() => setScreen("menu")}
          onOpenBill={() => setShowBillModal(true)}
        />
      )}

      {screen === "menu" && (
        <MenuScreen
          t={t}
          restaurantName={table.restaurant.name}
          menu={table.menu}
          onBack={() => setScreen("welcome")}
        />
      )}

      {screen === "waitress-sent" && (
        <ConfirmationScreen
          title={t.waitressSentTitle}
          body={t.waitressSentBody}
          backLabel={t.back}
          onBack={() => setScreen("welcome")}
        />
      )}

      {screen === "bill-sent" && billMethod && (
        <ConfirmationScreen
          title={t.billSentTitle}
          body={t.billSentBody(billMethod)}
          backLabel={t.back}
          onBack={() => setScreen("welcome")}
        />
      )}

      {showBillModal && (
        <BillModal
          t={t}
          onChoose={handleBillChoice}
          onCancel={() => setShowBillModal(false)}
        />
      )}
    </>
  );
}
