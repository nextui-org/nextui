import {pick} from "../utils/collections";

const SIZING_STYLE = [
  "borderBottomWidth",
  "borderLeftWidth",
  "borderRightWidth",
  "borderTopWidth",
  "boxSizing",
  "fontFamily",
  "fontSize",
  "fontStyle",
  "fontWeight",
  "letterSpacing",
  "lineHeight",
  "paddingBottom",
  "paddingLeft",
  "paddingRight",
  "paddingTop",
  "tabSize",
  "textIndent",
  "textRendering",
  "textTransform",
  "width",
  "wordBreak",
] as const;

const HIDDEN_TEXTAREA_STYLE = {
  "min-height": "0",
  "max-height": "none",
  height: "0",
  visibility: "hidden",
  overflow: "hidden",
  position: "absolute",
  "z-index": "-1000",
  top: "0",
  right: "0",
} as const;

type SizingProps = Extract<typeof SIZING_STYLE[number], keyof CSSStyleDeclaration>;

type SizingStyle = Pick<CSSStyleDeclaration, SizingProps>;

export type SizingData = {
  sizingStyle: SizingStyle;
  paddingSize: number;
  borderSize: number;
};

const isIE =
  typeof document !== "undefined" ? !!(document.documentElement as any).currentStyle : false;

export const forceHiddenStyles = (node: HTMLElement) => {
  Object.keys(HIDDEN_TEXTAREA_STYLE).forEach((key) => {
    node.style.setProperty(
      key,
      HIDDEN_TEXTAREA_STYLE[key as keyof typeof HIDDEN_TEXTAREA_STYLE],
      "important",
    );
  });
};

export const getSizingData = (node: HTMLElement): SizingData | null => {
  const style = window.getComputedStyle(node);

  if (style === null) {
    return null;
  }

  const sizingStyle = pick(SIZING_STYLE as unknown as SizingProps[], style);
  const {boxSizing} = sizingStyle;

  // probably node is detached from DOM, can't read computed dimensions
  if (boxSizing === "") {
    return null;
  }

  // IE (Edge has already correct behaviour) returns content width as computed width
  // so we need to add manually padding and border widths
  if (isIE && boxSizing === "border-box") {
    sizingStyle.width =
      parseFloat(sizingStyle.width!) +
      parseFloat(sizingStyle.borderRightWidth!) +
      parseFloat(sizingStyle.borderLeftWidth!) +
      parseFloat(sizingStyle.paddingRight!) +
      parseFloat(sizingStyle.paddingLeft!) +
      "px";
  }

  const paddingSize = parseFloat(sizingStyle.paddingBottom!) + parseFloat(sizingStyle.paddingTop!);

  const borderSize =
    parseFloat(sizingStyle.borderBottomWidth!) + parseFloat(sizingStyle.borderTopWidth!);

  return {
    sizingStyle,
    paddingSize,
    borderSize,
  };
};

// TODO: use labelled tuples once they are avaiable:
//   export type CalculatedNodeHeights = [height: number, rowHeight: number];
// https://github.com/microsoft/TypeScript/issues/28259
export type CalculatedNodeHeights = number[];

let hiddenTextarea: HTMLTextAreaElement | null = null;

const getHeight = (node: HTMLElement, sizingData: SizingData): number => {
  const height = node.scrollHeight;

  if (sizingData.sizingStyle.boxSizing === "border-box") {
    // border-box: add border, since height = content + padding + border
    return height + sizingData.borderSize;
  }

  // remove padding, since height = content
  return height - sizingData.paddingSize;
};

export const calculateNodeHeight = (
  sizingData: SizingData,
  value: string,
  minRows = 1,
  maxRows = Infinity,
): CalculatedNodeHeights => {
  if (!hiddenTextarea) {
    hiddenTextarea = document.createElement("textarea");
    hiddenTextarea.setAttribute("tabindex", "-1");
    hiddenTextarea.setAttribute("aria-hidden", "true");
    forceHiddenStyles(hiddenTextarea);
  }

  if (hiddenTextarea.parentNode === null) {
    document.body.appendChild(hiddenTextarea);
  }

  const {paddingSize, borderSize, sizingStyle} = sizingData;
  const {boxSizing} = sizingStyle;

  Object.keys(sizingStyle).forEach((_key) => {
    const key = _key as keyof typeof sizingStyle;

    hiddenTextarea!.style[key] = sizingStyle[key] as any;
  });

  forceHiddenStyles(hiddenTextarea);

  hiddenTextarea.value = value;
  let height = getHeight(hiddenTextarea, sizingData);

  // measure height of a textarea with a single row
  hiddenTextarea.value = "x";
  const rowHeight = hiddenTextarea.scrollHeight - paddingSize;

  let minHeight = rowHeight * minRows;

  if (boxSizing === "border-box") {
    minHeight = minHeight + paddingSize + borderSize;
  }
  height = Math.max(minHeight, height);

  let maxHeight = rowHeight * maxRows;

  if (boxSizing === "border-box") {
    maxHeight = maxHeight + paddingSize + borderSize;
  }
  height = Math.min(maxHeight, height);

  return [height, rowHeight];
};
