function CheckIcon() {
  return (
    <div className="check-circle">
      <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="#f4fff8" strokeWidth={3} strokeLinecap="round">
        <path d="M4 12l6 6L20 6" />
      </svg>
    </div>
  );
}

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
        <CheckIcon />
        <h2 className="confirm-title">{title}</h2>
        <p className="confirm-body">{body}</p>
        <button className="secondary-button" onClick={onBack}>
          {backLabel}
        </button>
      </div>
    </div>
  );
}
