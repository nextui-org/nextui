export const kebabCase = (text: string) => {
  return text
    ?.replace?.(/([a-z])([A-Z])/g, '$1-$2')
    ?.replace?.(/\s+/g, '-')
    .toLowerCase?.();
};
