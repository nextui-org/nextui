import Router from "next/router";
export const isBrowser = typeof window !== `undefined`;

export const getCssVar = (name?: string) => {
  if (typeof document !== "undefined" || !name) {
    const property = isCssVar(name) ? name?.replace("var(", "").replace(")", "") : `--${name}`;

    if (!property) return "";

    return getComputedStyle(document.documentElement).getPropertyValue(property);
  }

  return "";
};

export const isCssVar = (property?: string) => {
  return property && property?.indexOf("var(") === 0 ? true : false;
};

export const toCapitalize = (name: string) => {
  const [first, ...rest] = name;

  return `${first.toUpperCase()}${rest.join("")}`;
};

export const validateEmail = (value: string) => {
  return /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(value);
};

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

export function removeFromLast<T>(path: string, key: string): string | T {
  const i = path.lastIndexOf(key);

  return i === -1 ? path : path.substring(0, i);
}

export function isFunction(fn: any): boolean {
  return typeof fn === "function";
}

export const isPathActive = (href: string, exact = false): boolean => {
  if (!isBrowser) return false;
  if (exact) return Router.pathname === href;

  return Router.pathname.startsWith(href);
};

export const hexFromString = (
  str: string,
  defaultColor: string = "",
  returnLast = false,
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
  var zeros = new Array(len).join("0");

  return (zeros + str).slice(-len);
}

export const invertHex = (hexProp: string, smooth = true) => {
  let hex = isCssVar(hexProp) ? getCssVar(hexProp) : hexProp;

  if (hex.indexOf("#") === 0) {
    hex = hex.slice(1);
  }
  // convert 3-digit hex to 6-digits.
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  if (hex.length !== 6) {
    return hexProp;
  }
  let r = parseInt(hex.slice(0, 2), 16),
    g = parseInt(hex.slice(2, 4), 16),
    b = parseInt(hex.slice(4, 6), 16);

  if (smooth) {
    // http://stackoverflow.com/a/3943023/112731
    return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? "#000000" : "#FFFFFF";
  }
  // invert color components
  r = 255 - r;
  g = 255 - g;
  b = 255 - b;

  // pad each with zeros and return
  return "#" + padZero(r.toString(16)) + padZero(g.toString(16)) + padZero(b.toString(16));
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
    r = "0x" + hex[1] + hex[1];
    g = "0x" + hex[2] + hex[2];
    b = "0x" + hex[3] + hex[3];
    // 6 digits
  } else if (hex.length == 7) {
    r = "0x" + hex[1] + hex[2];
    g = "0x" + hex[3] + hex[4];
    b = "0x" + hex[5] + hex[6];
  }

  return `rgba(${+r}, ${+g},${+b},${alpha})`;
};

export const hexToRgb = (color: string): [number, number, number] => {
  const fullReg = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const full = color.replace(fullReg, (_, r, g, b) => `${r}${r}${g}${g}${b}${b}`);
  const values = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(full);

  if (!values) {
    throw new Error(`Next UI: Unsupported ${color} color.`);
  }

  return [
    Number.parseInt(values[1], 16),
    Number.parseInt(values[2], 16),
    Number.parseInt(values[3], 16),
  ];
};

export const colorToRgbValues = (color: string) => {
  if (color.charAt(0) === "#") return hexToRgb(color);

  const safeColor = color.replace(/ /g, "");
  const colorType = color.substr(0, 4);

  const regArray = safeColor.match(/\((.+)\)/);

  if (!colorType.startsWith("rgb") || !regArray) {
    throw new Error(`Next UI: Only support ["RGB", "RGBA", "HEX"] color.`);
  }

  return regArray[1].split(",").map((str) => Number.parseFloat(str));
};

export const addColorAlpha = (colorProp?: string, alpha?: number) => {
  if (!colorProp) return colorProp;
  const color = isCssVar(colorProp) ? getCssVar(colorProp) : colorProp;

  if (isHex(color)) {
    return hexToRGBA(color, alpha);
  } else if (!/^#|rgb|RGB/.test(color)) {
    return color;
  }
  const [r, g, b] = colorToRgbValues(color);

  if (alpha) {
    const safeAlpha = alpha > 1 ? 1 : alpha < 0 ? 0 : alpha;

    return `rgba(${r}, ${g}, ${b}, ${safeAlpha})`;
  }

  return `rgb(${r}, ${g}, ${b})`;
};

export const isProd = process.env.NODE_ENV === "production";
