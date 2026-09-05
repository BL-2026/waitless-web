import { CheckIcon } from "./Icons";

interface Props {
  title: string;
  body: string;
  backLabel: string;
  onBack: () => void;
}

export default function ConfirmationScreen({ title, body, backLabel, onBack }: Props) {
  return (
    <div className="screen screen-center">
      <div className="confirmation-container">
        <div className="check-circle">
          <CheckIcon />
        </div>
        <h2 className="confirm-title">{title}</h2>
        <p className="confirm-body">{body}</p>
        <button className="primary-button" onClick={onBack}>
          {backLabel}
        </button>
      </div>
    </div>
  );
}
