import { useState, useEffect } from "react";
import { fetchTable } from "../api/requestService";
import type { LanguageCode, Table } from "../types";

interface UseTableResult {
  table: Table | null;
  loading: boolean;
}

export function useTable(tableToken: string, language: LanguageCode): UseTableResult {
  const [table, setTable] = useState<Table | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);

    fetchTable(tableToken, language).then((data) => {
      setTable(data);
      setLoading(false);
    });
  }, [tableToken, language]);

  return { table, loading };
}
