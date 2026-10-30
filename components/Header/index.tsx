import type { StreamerTotal } from "@/types/WatchEntry";
import { formatDuration } from "@/utils/formatDuration";

type HeaderProps = {
  totals: StreamerTotal[];
  totalSeconds: number;
};

export default function Header({ totals, totalSeconds }: HeaderProps) {
  return (
    <header className="header">
      <h1 className="title">
        Lurk <span>Report</span>
      </h1>
      {totals.length > 0 && (
        <p className="total">{formatDuration(totalSeconds)} gesamt</p>
      )}
    </header>
  );
}
