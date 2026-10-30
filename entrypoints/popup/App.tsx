import { useState } from "react";
import type { Period } from "@/types/WatchEntry";
import "./App.css";
import Buttons from "@/components/Buttons";
import StreamerList from "@/components/StreamerList";
import Header from "@/components/Header";
import { useWatchEntries } from "@/hooks/useWatchEntries";
import { filterByPeriod, groupByStreamer } from "@/utils/stats";

function App() {
  const [period, setPeriod] = useState<Period>("all");
  const entries = useWatchEntries();

  const totals = groupByStreamer(filterByPeriod(entries, period));

  const maxSeconds = totals[0]?.seconds ?? 1;
  const totalSeconds = totals.reduce((sum, total) => sum + total.seconds, 0);

  return (
    <main className="popup">
      <Header totals={totals} totalSeconds={totalSeconds} />
      <Buttons period={period} setPeriod={setPeriod} />
      <StreamerList totals={totals} maxSeconds={maxSeconds} />
    </main>
  );
}

export default App;
