export function toSnakeCase<T>(input: T): T {
  if (Array.isArray(input)) {
    return input.map((item) => toSnakeCase(item)) as unknown as T;
  }

  if (input !== null && typeof input === 'object') {
    const entries = Object.entries(input as Record<string, unknown>).map(
      ([key, value]) => [
        key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`),
        toSnakeCase(value),
      ],
    );

    return Object.fromEntries(entries) as T;
  }

  return input;
}
