import Router from 'next/router';
export const isBrowser = typeof window !== `undefined`;

export const toCapitalize = (name: string) => {
  const [first, ...rest] = name;
  return `${first.toUpperCase()}${rest.join('')}`;
};

export function removeFromLast<T>(path: string, key: string): string | T {
  const i = path.lastIndexOf(key);
  return i === -1 ? path : path.substring(0, i);
}

export function isFunction(fn: any): boolean {
  return typeof fn === 'function';
}

export const isPathActive = (href: string, exact = false): boolean => {
  if (!isBrowser) return false;
  if (exact) return Router.pathname === href;
  return Router.pathname.startsWith(href);
};

export const hexFromString = (
  str: string,
  defaultColor: string = '',
  returnLast = false
): string | string[] => {
  const fullReg = /#[a-fA-F0-9]{6}|#[a-fA-F0-9]{3}$/g;
  const hexCodes = str.match(fullReg);
  if (hexCodes && hexCodes.length > 0) {
    return returnLast ? hexCodes[hexCodes.length - 1] : hexCodes;
  }
  return defaultColor;
};

function padZero(str: string, len?: number): string {
  len = len || 2;
  var zeros = new Array(len).join('0');
  return (zeros + str).slice(-len);
}

export const invertHex = (hex: string, smooth = true) => {
  if (hex.indexOf('#') === 0) {
    hex = hex.slice(1);
  }
  // convert 3-digit hex to 6-digits.
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  if (hex.length !== 6) {
    console.error('Invalid HEX color.');
  }
  let r = parseInt(hex.slice(0, 2), 16),
    g = parseInt(hex.slice(2, 4), 16),
    b = parseInt(hex.slice(4, 6), 16);
  if (smooth) {
    // http://stackoverflow.com/a/3943023/112731
    return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? '#000000' : '#FFFFFF';
  }
  // invert color components
  r = 255 - r;
  g = 255 - g;
  b = 255 - b;
  // pad each with zeros and return
  return (
    '#' +
    padZero(r.toString(16)) +
    padZero(g.toString(16)) +
    padZero(b.toString(16))
  );
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
export const isProd = process.env.NODE_ENV === 'production';
