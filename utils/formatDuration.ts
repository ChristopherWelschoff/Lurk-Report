export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (hours < 1) {
    return `${minutes} min`;
  }

  return `${hours}h and ${minutes} min`;
}
