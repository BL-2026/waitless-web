import type { Strings } from "../translations/translations";
import type { PaymentMethod } from "../types";
import { CardIcon, CashIcon } from "./Icons";

interface Props {
  t: Strings;
  onChoose: (method: PaymentMethod) => void;
  onCancel: () => void;
  busy?: boolean;
}

export default function BillModal({ t, onChoose, onCancel, busy = false }: Props) {
  return (
    <div className="overlay" onClick={onCancel} role="presentation">
      <div className="modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-labelledby="bill-title">
        <p id="bill-title" className="modal-title">
          {t.howToPay}
        </p>
        <p className="modal-hint">{t.howToPayHint}</p>
        <div className="modal-buttons">
          <button className="pay-option" onClick={() => onChoose("card")} disabled={busy}>
            <CardIcon />
            <span>{t.card}</span>
          </button>
          <button className="pay-option" onClick={() => onChoose("cash")} disabled={busy}>
            <CashIcon />
            <span>{t.cash}</span>
          </button>
        </div>
        <button className="text-button cancel-link" onClick={onCancel}>
          {t.cancel}
        </button>
      </div>
    </div>
  );
}
