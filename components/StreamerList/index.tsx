import type { StreamerTotal } from "@/types/WatchEntry";

type StreamerListProps = {
  totals: StreamerTotal[];
  maxSeconds: number
};

export default function StreamerList({ totals, maxSeconds }: StreamerListProps) {
  return totals.length > 0 ? (
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
  );
}
