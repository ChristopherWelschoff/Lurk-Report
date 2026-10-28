import { useState, useEffect } from "react";
import type { WatchEntry, StreamerTotal } from "@/types/WatchEntry";
import "./App.css";
import { formatDuration } from "@/utils/formatDuration";
import { getToday, getWeekStart } from "@/utils/date";

function App() {
  const [entries, setEntries] = useState<WatchEntry[]>([]);
  const [period, setPeriod] = useState<"today" | "week" | "month" | "all">(
    "all",
  );

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

  const today = getToday(); // "2026-10-28"
  const weekStart = getWeekStart(); // "2026-10-26"
  const currentMonth = today.slice(0, 7); // "2026-10"

  function filterByPeriod(entry: WatchEntry): boolean {
    if (period === "today") return entry.date === today;
    if (period === "week") return entry.date >= weekStart;
    if (period === "month") return entry.date.startsWith(currentMonth);
    return true;
  }

  const filteredEntries = entries.filter(filterByPeriod);

  const totals: StreamerTotal[] = [];

  for (const entry of filteredEntries) {
    const existing = totals.find((total) => total.streamer === entry.streamer);

    if (existing) {
      existing.seconds += entry.seconds;
    } else {
      totals.push({ streamer: entry.streamer, seconds: entry.seconds });
    }
  }

  totals.sort((a, b) => b.seconds - a.seconds);

  const maxSeconds = totals[0]?.seconds ?? 1;
  const totalSeconds = totals.reduce((sum, total) => sum + total.seconds, 0);

  return (
    <main className="popup">
      <header className="header">
        <h1 className="title">
          Lurk <span>Report</span>
        </h1>
        {totals.length > 0 && (
          <p className="total">{formatDuration(totalSeconds)} gesamt</p>
        )}
      </header>
      <div className="filters">
        <button
          className={period === "today" ? "filter active" : "filter"}
          onClick={() => setPeriod("today")}
        >
          Heute
        </button>
        <button
          className={period === "week" ? "filter active" : "filter"}
          onClick={() => setPeriod("week")}
        >
          Woche
        </button>
        <button
          className={period === "month" ? "filter active" : "filter"}
          onClick={() => setPeriod("month")}
        >
          Monat
        </button>
        <button
          className={period === "all" ? "filter active" : "filter"}
          onClick={() => setPeriod("all")}
        >
          Gesamt
        </button>
      </div>
      {totals.length > 0 ? (
        <ol className="list">
          {totals.map((total, index) => (
            <li key={total.streamer} className="item">
              <span className="rank">{index + 1}</span>
              <a
                className="name"
                href={`https://www.twitch.tv/${total.streamer}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {total.streamer}
              </a>
              <span className="time">{formatDuration(total.seconds)}</span>
              <div className="bar">
                <div
                  className="bar-fill"
                  style={{ width: `${(total.seconds / maxSeconds) * 100}%` }}
                />
              </div>
            </li>
          ))}
        </ol>
      ) : (
        <p className="empty">
          Noch keine Watchtime.
          <br />
          Schau einen Stream auf Twitch, dann erscheint er hier.
        </p>
      )}
    </main>
  );
}

export default App;
