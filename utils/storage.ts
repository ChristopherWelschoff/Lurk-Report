import type { WatchEntry } from "@/types/WatchEntry";

export const watchEntries = storage.defineItem<WatchEntry[]>(
  "local:watchEntries",
  { fallback: [] },
);
