export const toCapitalize = (name: string) => {
  const [first, ...rest] = name;
  return `${first.toUpperCase()}${rest.join('')}`;
};

export function removeFromLast<T>(path: string, key: string): string | T {
  const i = path.lastIndexOf(key);
  return i === -1 ? path : path.substring(0, i);
}
