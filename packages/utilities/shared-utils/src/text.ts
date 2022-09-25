export const safeText = (text: string): string => {
  if (text?.length <= 4) return text;

  return text?.slice(0, 3);
};
