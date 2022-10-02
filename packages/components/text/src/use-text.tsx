import {getKeyValue, TextTransforms} from "@nextui-org/shared-utils";
import {useMemo} from "react";
import {HTMLNextUIProps} from "@nextui-org/system";
import {HideShowInProps} from "@nextui-org/shared-css";

import {TextChildProps} from "./text-child";

export interface UseTextProps
  extends HTMLNextUIProps<"p", Omit<TextChildProps, "tag">>,
    HideShowInProps {
  h1?: boolean;
  h2?: boolean;
  h3?: boolean;
  h4?: boolean;
  h5?: boolean;
  h6?: boolean;
  b?: boolean;
  small?: boolean;
  transform?: TextTransforms;
  i?: boolean;
  span?: boolean;
  del?: boolean;
  em?: boolean;
  blockquote?: boolean;
}

type ElementMap = {[key in keyof JSX.IntrinsicElements]?: boolean};
export type TextRenderableElements = Array<keyof JSX.IntrinsicElements>;

export function useText(props: UseTextProps) {
  const {
    h1 = false,
    h2 = false,
    h3 = false,
    h4 = false,
    h5 = false,
    h6 = false,
    b = false,
    small = false,
    i = false,
    span = false,
    del = false,
    em = false,
    blockquote = false,
    transform = "none",
    size,
    ...otherProps
  } = props;

  const elements: ElementMap = {h1, h2, h3, h4, h5, h6, blockquote};
  const inlineElements: ElementMap = {span, small, b, em, i, del};

  const names = Object.keys(elements).filter((name: string) =>
    getKeyValue(elements, name),
  ) as TextRenderableElements;

  const inlineNames = Object.keys(inlineElements).filter((name: string) =>
    getKeyValue(inlineElements, name),
  ) as TextRenderableElements;

  /**
   *  Render element "p" only if no element is found.
   *  If there is only one modifier, just rendered one modifier element
   *  e.g.
   *    <Text /> => <p />
   *    <Text em /> => <em />
   *    <Text b em /> => <b><em>children</em></b>
   */

  const tag = useMemo(() => {
    if (names[0]) return names[0];
    if (inlineNames[0]) return inlineNames[0];

    return "p" as keyof JSX.IntrinsicElements;
  }, [names, inlineNames]);

  const renderableChildElements = inlineNames.filter(
    (name: keyof JSX.IntrinsicElements) => name !== tag,
  ) as TextRenderableElements;

  return {renderableChildElements, tag, transform, size, ...otherProps};
}

export type UseTextReturn = ReturnType<typeof useText>;
