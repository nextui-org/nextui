/**
 * Capitalizes the first letter of a string
 * @param {string} text
 * @returns {string}
 */
export const capitalize = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};
