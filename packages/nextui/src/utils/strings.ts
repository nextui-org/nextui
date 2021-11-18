export const kebabCase = (text: string) => {
  return text
    ?.replace?.(/([a-z])([A-Z])/g, '$1-$2')
    ?.replace?.(/\s+/g, '-')
    .toLowerCase?.();
};

export const includes = (text?: string, search?: string[]) => {
  return search?.some((item) => text?.includes(item));
};
