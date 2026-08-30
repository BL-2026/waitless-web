import type { Strings } from "../translations/translations";
import type { PaymentMethod } from "../types";

interface Props {
  t: Strings;
  // Because onChoose only accepts "card" | "cash" (via PaymentMethod),
  // TypeScript would reject a call like onChoose("bitcoin") at the
  // call site — this is the kind of bug TS catches before you run anything.
  onChoose: (method: PaymentMethod) => void;
  onCancel: () => void;
}

export default function BillModal({ t, onChoose, onCancel }: Props) {
  return (
    <div className="overlay" onClick={onCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <p className="modal-title">💳 {t.howToPay}</p>
        <div className="modal-buttons">
          <button className="primary-button" onClick={() => onChoose("card")}>
            📄 {t.card}
          </button>
          <button className="primary-button" onClick={() => onChoose("cash")}>
            💵 {t.cash}
          </button>
        </div>
        <button className="cancel-link" onClick={onCancel}>
          {t.cancel}
        </button>
      </div>
    </div>
  );
}
