export const toCapitalize = (name: string) => {
  const [first, ...rest] = name;
  return `${first.toUpperCase()}${rest.join('')}`;
};
