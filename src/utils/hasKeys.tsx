export default function hasKeys<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): obj is T & Record<K, unknown> {
  if (typeof obj !== "object" || obj === null) {
    return false;
  }

  for (const key of keys) {
    if (!obj.hasOwnProperty(key)) {
      return false;
    }
  }

  return true;
}
