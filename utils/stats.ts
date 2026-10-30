import type { WatchEntry, StreamerTotal, Period } from "@/types/WatchEntry";
import { getToday, getWeekStart } from "@/utils/date";

export function filterByPeriod(
  entries: WatchEntry[],
  period: Period,
): WatchEntry[] {
  const today = getToday(); // "yyyy-mm-dd"
  const weekStart = getWeekStart(); // Montag dieser Woche, "yyyy-mm-dd"
  const currentMonth = today.slice(0, 7); // "yyyy-mm"

  return entries.filter((entry) => {
    if (period === "today") return entry.date === today;
    if (period === "week") return entry.date >= weekStart;
    if (period === "month") return entry.date.startsWith(currentMonth);
    return true;
  });
}

export function groupByStreamer(entries: WatchEntry[]): StreamerTotal[] {
  const totals: StreamerTotal[] = [];

  for (const entry of entries) {
    const existing = totals.find((total) => total.streamer === entry.streamer);

    if (existing) {
      existing.seconds += entry.seconds;
    } else {
      totals.push({ streamer: entry.streamer, seconds: entry.seconds });
    }
  }

  totals.sort((a, b) => b.seconds - a.seconds);

  return totals;
}
