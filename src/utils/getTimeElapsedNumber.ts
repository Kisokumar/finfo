export default function getTimeElapsedNumber(elapsedTime: number) {
  const totalSeconds = Math.floor(elapsedTime / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const parts = [];
  if (hours > 0) {
    parts.push(`${hours} ${hours > 1 ? "hours" : "hour"}`);
  }
  if (minutes > 0) {
    parts.push(`${minutes} ${minutes > 1 ? "minutes" : "minute"}`);
  }
  if (seconds > 0) {
    parts.push(`${seconds} ${seconds > 1 ? "seconds" : "second"}`);
  }

  if (parts.length === 0) {
    return "0 seconds";
  }

  if (parts.length === 1) {
    return parts[0];
  }

  const lastPart = parts.pop();
  const firstParts = parts.join(", ");

  return `${firstParts} and ${lastPart}`;
}
