import { useCallback, useEffect, useState } from "react";
import { ApiError, fetchTable } from "../api/requestService";
import type { Table } from "../types";

/**
 * `no-token`     — the page was opened directly instead of by scanning a QR code.
 * `not-found`    — the token is unknown to the backend (stale or mistyped QR).
 * `offline`      — no network / cannot reach the server.
 * `server-error` — the server answered with an unexpected failure.
 */
export type TableErrorKind = "no-token" | "not-found" | "offline" | "server-error";

interface UseTableResult {
  table: Table | null;
  loading: boolean;
  error: TableErrorKind | null;
  retry: () => void;
}

type State =
  | { status: "loading" }
  | { status: "ready"; table: Table }
  | { status: "error"; kind: TableErrorKind };

function kindFromError(cause: unknown): TableErrorKind {
  if (!(cause instanceof ApiError)) return "server-error";
  if (cause.isOffline) return "offline";
  if (cause.status === 404 || cause.code === "NOT_FOUND") return "not-found";
  return "server-error";
}

export function useTable(qrToken: string | null): UseTableResult {
  const [state, setState] = useState<State>({ status: "loading" });
  const [attempt, setAttempt] = useState(0);

  const retry = useCallback(() => {
    setState({ status: "loading" });
    setAttempt((value) => value + 1);
  }, []);

  useEffect(() => {
    if (!qrToken) return;

    let cancelled = false;

    fetchTable(qrToken)
      .then((table) => {
        if (!cancelled) setState({ status: "ready", table });
      })
      .catch((cause: unknown) => {
        if (cancelled) return;
        setState({ status: "error", kind: kindFromError(cause) });
      });

    return () => {
      cancelled = true;
    };
  }, [qrToken, attempt]);

  // Arriving without a token is knowable during render, so it needs no effect.
  if (!qrToken) {
    return { table: null, loading: false, error: "no-token", retry };
  }

  return {
    table: state.status === "ready" ? state.table : null,
    loading: state.status === "loading",
    error: state.status === "error" ? state.kind : null,
    retry,
  };
}
