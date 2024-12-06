/**
 * Formats a number into a shortened string representation (e.g., 1K, 1.5M, 2B)
 * @param number The number to format
 * @param decimals Number of decimal places to show (default: 1)
 * @returns Formatted string
 */
export function formatCompactNumber(number: number, decimals: number = 1): string {
  if (number === 0) return "0";

  const absNumber = Math.abs(number);
  const sign = number < 0 ? "-" : "";

  if (absNumber < 1000) {
    return sign + absNumber.toString();
  }

  const suffixes = ["", "K", "M", "B", "T"];
  const exponent = Math.min(Math.floor(Math.log10(absNumber) / 3), suffixes.length - 1);
  const shortNumber = (absNumber / Math.pow(1000, exponent)).toFixed(decimals);

  // Remove trailing zeros after decimal point
  const formattedNumber = parseFloat(shortNumber).toString();

  return sign + formattedNumber + suffixes[exponent];
}
