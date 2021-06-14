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

export const isProd = process.env.NODE_ENV === 'production';
