// export default function getTimeElapsedNumber(elapsedTime: number) {
//   const totalSeconds = Math.floor(elapsedTime / 1000);
//   const hours = Math.floor(totalSeconds / 3600);
//   const minutes = Math.floor((totalSeconds % 3600) / 60);
//   const seconds = totalSeconds % 60;

//   const parts = [];
//   if (hours > 0) {
//     parts.push(`${hours} ${hours > 1 ? "hours" : "hour"}`);
//   }
//   if (minutes > 0) {
//     parts.push(`${minutes} ${minutes > 1 ? "minutes" : "minute"}`);
//   }
//   if (seconds > 0) {
//     parts.push(`${seconds} ${seconds > 1 ? "seconds" : "second"}`);
//   }

//   if (parts.length === 0) {
//     return "0 seconds";
//   }

//   if (parts.length === 1) {
//     return parts[0];
//   }

//   const lastPart = parts.pop();
//   const firstParts = parts.join(", ");

//   return `${firstParts} and ${lastPart}`;
// }

export default function getTimeElapsedNumber(lastRefreshedTime: Date) {
  const now = new Date();
  const elapsedMs = now.getTime() - lastRefreshedTime.getTime();
  const elapsedSeconds = Math.floor(elapsedMs / 1000);

  if (elapsedSeconds < 60) {
    return `${elapsedSeconds} ${
      elapsedSeconds === 1 ? "second" : "seconds"
    } ago @ ${formatTime(lastRefreshedTime)}`;
  } else if (elapsedSeconds < 3600) {
    const elapsedMinutes = Math.floor(elapsedSeconds / 60);
    return `${elapsedMinutes} ${
      elapsedMinutes === 1 ? "minute" : "minutes"
    } ago @ ${formatTime(lastRefreshedTime)}`;
  } else if (elapsedSeconds < 86400) {
    const elapsedHours = Math.floor(elapsedSeconds / 3600);
    return `${elapsedHours} ${
      elapsedHours === 1 ? "hour" : "hours"
    } ago @ ${formatTime(lastRefreshedTime)}`;
  } else {
    return `${lastRefreshedTime.toLocaleDateString()} @ ${formatTime(
      lastRefreshedTime
    )}`;
  }
}

function formatTime(time: Date) {
  const hours = time.getHours() % 12 || 12;
  const minutes = time.getMinutes().toString().padStart(2, "0");
  const amPm = time.getHours() < 12 ? "AM" : "PM";
  return `${hours}:${minutes} ${amPm}`;
}
