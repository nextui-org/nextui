export const __PROD__ = process.env.NODE_ENV === "production";
export const __DEV__ = process.env.NODE_ENV !== "production";
export const __TEST__ = process.env.NODE_ENV === "test";
export const __PREVIEW__ = process.env.IS_PREVIEW === "true";
export const __ENABLE_ADS__ = process.env.NEXT_PUBLIC_ENABLE_ADS === "true";
