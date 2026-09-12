interface Props {
  title: string;
  body: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function ErrorScreen({ title, body, actionLabel, onAction }: Props) {
  return (
    <div className="screen screen-center">
      <div className="confirmation-container">
        <h2 className="confirm-title">{title}</h2>
        <p className="confirm-body">{body}</p>
        {actionLabel && onAction && (
          <button className="primary-button" onClick={onAction}>
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
}
