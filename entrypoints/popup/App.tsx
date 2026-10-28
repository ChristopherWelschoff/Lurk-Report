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

  return (
    <main>
      <h1>Twitch Wrapped</h1>
      {entries.length > 0 ? (
        <ul>
          {totals.map((total) => (
            <li key={total.streamer}>
              <p>Channel: {total.streamer}</p>
              <p>Watchtime: {formatDuration(total.seconds)}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>You have no watchtime...</p>
      )}
    </main>
  );
}

export default App;
