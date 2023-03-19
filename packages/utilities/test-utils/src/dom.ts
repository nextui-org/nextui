export function isElement(el: any): el is Element {
  return (
    el != null && typeof el == "object" && "nodeType" in el && el.nodeType === Node.ELEMENT_NODE
  );
}

export function isHTMLElement(el: any): el is HTMLElement {
  if (!isElement(el)) {
    return false;
  }

  const win = el.ownerDocument.defaultView ?? window;

  return el instanceof win.HTMLElement;
}

export function getOwnerDocument(node?: Element | null): Document {
  return isElement(node) ? node.ownerDocument ?? document : document;
}

export function getActiveElement(node?: HTMLElement) {
  const doc = getOwnerDocument(node);

  return doc?.activeElement as HTMLElement;
}
