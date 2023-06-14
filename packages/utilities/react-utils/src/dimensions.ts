export type ShapeType = {
  width: number;
  height: number;
};

export const getCSSStyleVal = (str: string, parentNum: number) => {
  if (!str) return 0;
  const strVal = str.includes("px")
    ? +str.split("px")[0]
    : str.includes("%")
    ? +str.split("%")[0] * parentNum * 0.01
    : str;

  return Number.isNaN(+strVal) ? 0 : +strVal;
};

export const getRealShape = (el: HTMLElement | null): ShapeType => {
  const defaultShape: ShapeType = {width: 0, height: 0};

  if (!el || typeof window === "undefined") return defaultShape;

  const rect = el.getBoundingClientRect();
  const {width, height} = window.getComputedStyle(el);

  return {
    width: getCSSStyleVal(`${width}`, rect.width),
    height: getCSSStyleVal(`${height}`, rect.height),
  };
};
