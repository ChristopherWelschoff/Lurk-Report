import type { WatchEntry } from "@/types/WatchEntry";
import { useState, useEffect } from "react";

export function useWatchEntries(): WatchEntry[] {
  const [entries, setEntries] = useState<WatchEntry[]>([]);

  useEffect(() => {
    async function load() {
      const data = await watchEntries.getValue();
      setEntries(data);
    }
    load();

    const unwatch = watchEntries.watch((newEntries) => {
      setEntries(newEntries);
    });

    return () => unwatch();
  }, []);

  return entries;
}
