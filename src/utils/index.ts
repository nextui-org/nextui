/**
 * This function allows validate if a string is a hexadecimal
 * value
 * @param str [string] hexadecimal value
 * @returns result [boolean]
 */
export const isHex = (str: string): boolean => {
  const exp = /#[a-fA-F0-9]{3,6}/g;
  return exp.test(str);
};

/**
 *
 * @param hex [string]
 * @param alpha [number]
 * @returns [string]
 */
export const hexToRGBA = (hex: string, alpha: number = 1): string => {
  let r: string | number = 0,
    g: string | number = 0,
    b: string | number = 0;
  // 3 digits
  if (hex.length == 4) {
    r = '0x' + hex[1] + hex[1];
    g = '0x' + hex[2] + hex[2];
    b = '0x' + hex[3] + hex[3];
    // 6 digits
  } else if (hex.length == 7) {
    r = '0x' + hex[1] + hex[2];
    g = '0x' + hex[3] + hex[4];
    b = '0x' + hex[5] + hex[6];
  }
  return `rgba(${+r}, ${+g},${+b},${alpha})`;
};
