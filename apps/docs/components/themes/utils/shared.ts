/**
 * Copy data to clipboard
 * @param data
 */
export function copyData(data: string) {
  navigator.clipboard.writeText(data);
}

/**
 * Stringify data
 *
 * @param data
 * @returns
 */
export function stringifyData(data: unknown) {
  return JSON.stringify(data, null, 2);
}
