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
  const { table, loading } = useTable(TABLE_TOKEN, language ?? "fr");
  const [screen, setScreen] = useState<Screen>("welcome");
  const [showBillModal, setShowBillModal] = useState(false);
  const [billMethod, setBillMethod] = useState<PaymentMethod | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    applyTheme(APP_THEME);
  }, []);

  if (!language || !t) {
    return <LanguageSelect />;
  }

  if (loading || !table) {
    return (
      <div className="app-shell">
        <div className="loading-spinner">
          <div className="spinner" />
          <div className="loading-text">{t.loading}</div>
        </div>
      </div>
    );
  }

  async function handleCallWaitress() {
    if (!table || busy) return;
    setBusy(true);
    await createRequest({
      tableNumber: table.tableNumber,
      type: RequestType.CALL_WAITER,
    });
    setBusy(false);
    setScreen("waitress-sent");
  }

  async function handleBillChoice(method: PaymentMethod) {
    if (!table || busy) return;
    setBusy(true);
    setBillMethod(method);
    await createRequest({
      tableNumber: table.tableNumber,
      type: RequestType.REQUEST_BILL,
      paymentMethod: method,
    });
    setBusy(false);
    setShowBillModal(false);
    setScreen("bill-sent");
  }

  return (
    <div className="app-shell">
      <div className="top-bar">
        <span className="brand-mark">{t.brand}</span>
        <label className="language-switcher" htmlFor="language-switcher">
          <select
            id="language-switcher"
            value={language}
            onChange={(event) => setLanguage(event.target.value as LanguageCode)}
            aria-label="Language"
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.native}
              </option>
            ))}
          </select>
        </label>
      </div>

      {screen === "welcome" && (
        <WelcomeScreen
          t={t}
          tableNumber={table.tableNumber}
          zone={table.zone}
          restaurantName={table.restaurant.name}
          onCallWaitress={handleCallWaitress}
          onOpenMenu={() => setScreen("menu")}
          onOpenBill={() => setShowBillModal(true)}
          busy={busy}
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
        <BillModal t={t} onChoose={handleBillChoice} onCancel={() => setShowBillModal(false)} busy={busy} />
      )}
    </div>
  );
}
