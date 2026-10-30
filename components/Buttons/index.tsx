import type { Period } from "@/types/WatchEntry";

type ButtonProps = {
  period: string;
  setPeriod: (value: Period) => void;
};

export default function Buttons({ period, setPeriod }: ButtonProps) {
  return (
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
  );
}
