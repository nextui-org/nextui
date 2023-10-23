export const getOwnerDocument = (el: Element | null | undefined): Document => {
  return el?.ownerDocument ?? document;
};

export const getOwnerWindow = (el: Element | null | undefined): Window & typeof global => {
  // @ts-ignore
  return el?.ownerDocument?.defaultView ?? window;
};
