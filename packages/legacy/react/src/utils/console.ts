const warningStack: {[key: string]: boolean} = {};

export const warn = (message: string, component?: string) => {
  const tag = component ? ` [${component}]` : " ";
  const log = `[Next UI]${tag}: ${message}`;

  if (typeof console === "undefined") return;
  if (warningStack[log]) return;
  warningStack[log] = true;

  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    return console.error(log);
  }
  // eslint-disable-next-line no-console
  console.warn(log);
};
