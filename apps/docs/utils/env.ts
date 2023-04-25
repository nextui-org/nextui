export const __PROD__ = process.env.NODE_ENV === "production";
export const __DEV__ = process.env.NODE_ENV !== "production";
export const __TEST__ = process.env.NODE_ENV === "test";
