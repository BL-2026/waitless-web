import type { Strings } from "../translations/translations";
import { BellIcon, BillIcon, ChevronIcon, MenuIcon } from "./Icons";

interface Props {
  t: Strings;
  tableNumber: number;
  zone: string;
  restaurantName: string;
  onCallWaitress: () => void;
  onOpenMenu: () => void;
  onOpenBill: () => void;
  busy?: boolean;
}

export default function WelcomeScreen({
  t,
  tableNumber,
  zone,
  restaurantName,
  onCallWaitress,
  onOpenMenu,
  onOpenBill,
  busy = false,
}: Props) {
  return (
    <div className="screen welcome-screen">
      <header className="welcome-hero">
        <p className="eyebrow">{t.welcome}</p>
        <h1 className="restaurant-title">{restaurantName}</h1>
        <div className="table-pills">
          <span className="pill">
            {t.table} {tableNumber}
          </span>
          <span className="pill pill-quiet">
            {t.zone} · {zone}
          </span>
        </div>
      </header>

      <div className="action-stack">
        <button className="action-card action-card-primary" onClick={onCallWaitress} disabled={busy}>
          <span className="action-icon">
            <BellIcon />
          </span>
          <span className="action-copy">
            <strong>{t.waitress}</strong>
            <small>{t.waitressHint}</small>
          </span>
          <ChevronIcon />
        </button>

        <button className="action-card" onClick={onOpenMenu}>
          <span className="action-icon">
            <MenuIcon />
          </span>
          <span className="action-copy">
            <strong>{t.menu}</strong>
            <small>{t.menuHint}</small>
          </span>
          <ChevronIcon />
        </button>

        <button className="action-card" onClick={onOpenBill}>
          <span className="action-icon">
            <BillIcon />
          </span>
          <span className="action-copy">
            <strong>{t.bill}</strong>
            <small>{t.billHint}</small>
          </span>
          <ChevronIcon />
        </button>
      </div>
    </div>
  );
}
