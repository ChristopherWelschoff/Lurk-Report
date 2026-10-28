import { useState, useEffect } from "react";
import type { WatchEntry, StreamerTotal } from "@/types/WatchEntry";
import "./App.css";
import { formatDuration } from "@/utils/formatDuration";

function App() {
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

  const maxSeconds = totals[0]?.seconds ?? 1;
  const totalSeconds = totals.reduce((sum, total) => sum + total.seconds, 0);

  return (
    <main className="popup">
      <header className="header">
        <h1 className="title">
          Twitch <span>Wrapped</span>
        </h1>
        {totals.length > 0 && (
          <p className="total">{formatDuration(totalSeconds)} gesamt</p>
        )}
      </header>

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
