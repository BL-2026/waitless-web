import { useEffect, useMemo, useState } from "react";
import { LanguageProvider, useLanguage } from "./context/LanguageContext";
import { useTable } from "./hooks/useTable";
import { createRequest, readTableToken, ApiError } from "./api/requestService";
import { RequestType, type Screen, type PaymentMethod, type LanguageCode } from "./types";
import LanguageSelect from "./components/LanguageSelect";
import WelcomeScreen from "./components/WelcomeScreen";
import MenuScreen from "./components/MenuScreen";
import BillModal from "./components/BillModal";
import ConfirmationScreen from "./components/ConfirmationScreen";
import ErrorScreen from "./components/ErrorScreen";
import { LANGUAGES } from "./translations/translations";
import { APP_THEME, applyTheme } from "./theme";
import "./App.css";

export default function App() {
  return (
    <LanguageProvider>
      <CustomerFlow />
    </LanguageProvider>
  );
}

function CustomerFlow() {
  const { language, setLanguage, t } = useLanguage();
  // Read once: the token identifies the table for the whole session.
  const qrToken = useMemo(() => readTableToken(), []);
  const { table, loading, error, retry } = useTable(qrToken);
  const [screen, setScreen] = useState<Screen>("welcome");
  const [showBillModal, setShowBillModal] = useState(false);
  const [billMethod, setBillMethod] = useState<PaymentMethod | null>(null);
  const [busy, setBusy] = useState(false);
  const [sendFailed, setSendFailed] = useState(false);
  const [sendOffline, setSendOffline] = useState(false);

  useEffect(() => {
    applyTheme(APP_THEME);
  }, []);

  if (!language || !t) {
    return <LanguageSelect />;
  }

  if (error) {
    const offline = error === "offline";
    const server = error === "server-error";
    return (
      <div className="app-shell">
        <ErrorScreen
          title={
            offline
              ? t.offlineTitle
              : server
                ? t.serverErrorTitle
                : t.tableNotFoundTitle
          }
          body={
            offline
              ? t.offlineBody
              : server
                ? t.serverErrorBody
                : t.tableNotFoundBody
          }
          actionLabel={offline || server ? t.retry : undefined}
          onAction={offline || server ? retry : undefined}
        />
      </div>
    );
  }

  if (loading || !table || !qrToken) {
    return (
      <div className="app-shell">
        <div className="loading-spinner">
          <div className="spinner" />
          <div className="loading-text">{t.loading}</div>
        </div>
      </div>
    );
  }

  async function send(type: (typeof RequestType)[keyof typeof RequestType], paymentMethod?: PaymentMethod) {
    if (!table || !qrToken || busy) return false;
    setBusy(true);
    try {
      await createRequest({
        storeId: table.restaurant.id,
        tableNumber: table.tableNumber,
        qrToken,
        type,
        paymentMethod,
      });
      return true;
    } catch (cause) {
      // Never show a confirmation for a request the kitchen never received.
      const offline = cause instanceof ApiError && cause.isOffline;
      setSendOffline(offline);
      setSendFailed(true);
      return false;
    } finally {
      setBusy(false);
    }
  }

  async function handleCallWaitress() {
    if (await send(RequestType.CALL_WAITER)) {
      setScreen("waitress-sent");
    }
  }

  async function handleBillChoice(method: PaymentMethod) {
    setBillMethod(method);
    if (await send(RequestType.REQUEST_BILL, method)) {
      setShowBillModal(false);
      setScreen("bill-sent");
    }
  }

  function backToTable() {
    setSendFailed(false);
    setSendOffline(false);
    setShowBillModal(false);
    setScreen("welcome");
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

      {sendFailed ? (
        <ErrorScreen
          title={sendOffline ? t.sendOfflineTitle : t.sendFailedTitle}
          body={sendOffline ? t.sendOfflineBody : t.sendFailedBody}
          actionLabel={t.back}
          onAction={backToTable}
        />
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}
