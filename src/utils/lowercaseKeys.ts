export default function lowerCaseKeys(obj: any) {
  if (typeof obj !== "object" || obj === null) {
    return;
  }

  for (const key in obj) {
    const newKey = key.charAt(0).toLowerCase() + key.slice(1);
    if (newKey !== key) {
      obj[newKey] = obj[key];
      delete obj[key];
    }
    lowerCaseKeys(obj[newKey]);
  }
}
