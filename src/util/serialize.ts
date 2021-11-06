export function serialize<T>(object: T): T {
  const properties = Object.getOwnPropertyNames(object).filter(
    (key) => key.startsWith('__') && key.endsWith('__'),
  );
  properties.forEach((property) => delete object[property]);
  return object;
}

export function serializeAll<T>(arr: T[]): T[] {
  return arr.map((i) => serialize(i));
}
