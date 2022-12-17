export function querifyData(data: Record<string, unknown> = {}) {
  return (
    '?' +
    Object.entries(data)
      .map(([key, value]) => `${key}=${value}`)
      .join('&')
  );
}
