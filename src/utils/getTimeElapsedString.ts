// export default function getTimeElapsedString(dateString: string) {
//   const date: any = new Date(dateString);
//   const now: any = new Date();
//   const elapsedSeconds = Math.floor((now - date) / 1000);
//   if (elapsedSeconds < 60) {
//     return `${elapsedSeconds} seconds ago`;
//   } else if (elapsedSeconds < 3600) {
//     const elapsedMinutes = Math.floor(elapsedSeconds / 60);
//     return `${elapsedMinutes} minute${elapsedMinutes > 1 ? "s" : ""} ago`;
//   } else if (elapsedSeconds < 86400) {
//     const elapsedHours = Math.floor(elapsedSeconds / 3600);
//     return `${elapsedHours} hour${elapsedHours > 1 ? "s" : ""} ago`;
//   } else {
//     const elapsedDays = Math.floor(elapsedSeconds / 86400);
//     return `${elapsedDays} day${elapsedDays > 1 ? "s" : ""} ago`;
//   }
// }
export default function getTimeElapsedString(dateString: string) {
  const date: any = new Date(dateString);
  if (isNaN(date)) {
    return "Invalid date";
  }
  const now: any = new Date();
  const elapsedSeconds = Math.floor((now - date) / 1000);
  if (elapsedSeconds < 60) {
    return `${elapsedSeconds} second${elapsedSeconds === 1 ? "" : "s"} ago`;
  } else if (elapsedSeconds < 3600) {
    const elapsedMinutes = Math.floor(elapsedSeconds / 60);
    return `${elapsedMinutes} minute${elapsedMinutes === 1 ? "" : "s"} ago`;
  } else if (elapsedSeconds < 86400) {
    const elapsedHours = Math.floor(elapsedSeconds / 3600);
    return `${elapsedHours} hour${elapsedHours === 1 ? "" : "s"} ago`;
  } else {
    const elapsedDays = Math.floor(elapsedSeconds / 86400);
    return `${elapsedDays} day${elapsedDays === 1 ? "" : "s"} ago`;
  }
}
