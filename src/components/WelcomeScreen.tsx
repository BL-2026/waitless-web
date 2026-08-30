import type { Strings } from "../translations/translations";

// This is the pattern you'll repeat for every component: define a
// "Props" interface listing exactly what the component needs, then
// destructure it in the function signature. If a parent forgets to
// pass one of these, or passes the wrong type, TypeScript flags it
// immediately instead of you finding out at runtime.
interface Props {
  t: Strings;
  tableNumber: number;
  restaurantName: string;
  onCallWaitress: () => void;
  onOpenMenu: () => void;
  onOpenBill: () => void;
}

export default function WelcomeScreen({
  t,
  tableNumber,
  restaurantName,
  onCallWaitress,
  onOpenMenu,
  onOpenBill,
}: Props) {
  return (
    <div className="screen">
      <div className="welcome-header">
        <p className="table-tag">
          {t.table} {tableNumber}
        </p>
        <h1 className="title">
          {t.welcome} <br />
          <span className="restaurant-name">{restaurantName}</span>
        </h1>
      </div>

      <div className="button-stack">
        <button className="primary-button" onClick={onCallWaitress}>
          🔔 {t.waitress}
        </button>
        <button className="secondary-button" onClick={onOpenMenu}>
          📚 {t.menu}
        </button>
        <button className="secondary-button" onClick={onOpenBill}>
          🧷 {t.bill}
        </button>
      </div>
    </div>
  );
}
