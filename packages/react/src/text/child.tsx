import type {CSS} from "../theme/stitches.config";
import type {SimpleColors} from "../utils/prop-types";

import React, {useMemo, ReactNode} from "react";

import {isNormalColor} from "../utils/color";
import {CSSFontSize} from "../theme";
import {ReactRef} from "../utils/refs";
import {useDOMRef} from "../utils/dom";
import {__DEV__} from "../utils/assertion";

import {StyledText, TextVariantsProps} from "./text.styles";

type As = keyof JSX.IntrinsicElements | React.ComponentType<any>;

export interface Props {
  tag: keyof JSX.IntrinsicElements;
  children?: ReactNode;
  color?: SimpleColors | string;
  /**
   * The **`font-size`** CSS property sets the size of the font. Changing the font size also updates the sizes of the font size-relative `<length>` units, such as `em`, `ex`, and so forth.
   *
   * **Syntax**: `<absolute-size> | <relative-size> | <length-percentage>`
   *
   * **Initial value**: `medium`
   *
   */
  size?: CSSFontSize;
  /**
   * The **`text-transform`** CSS property specifies how to capitalize an element's text. It can be used to make text appear in all-uppercase or all-lowercase, or with each word capitalized. It also can help improve legibility for ruby.
   *
   * **Syntax**: `none | capitalize | uppercase | lowercase | full-width | full-size-kana`
   *
   * **Initial value**: `none`
   *
   */
  transform?: CSS["tt"];
  css?: CSS;
  as?: As;
}

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>;

export type TextChildProps = Props & NativeAttrs & TextVariantsProps;

export const TextChild = React.forwardRef((props: TextChildProps, ref: ReactRef<HTMLElement>) => {
  const {
    children,
    tag,
    color: userColor = "default",
    transform,
    size: fontSize,
    css,
    ...otherProps
  } = props;

  const domRef = useDOMRef(ref);

  const color = useMemo(() => {
    if (isNormalColor(userColor)) {
      switch (userColor) {
        case "default":
          return "$text";
        default:
          return `$${userColor}`;
      }
    }

    return userColor;
  }, [userColor]);

  return (
    <StyledText
      ref={domRef}
      as={tag}
      css={{
        color,
        fontSize,
        tt: transform,
        ...css,
      }}
      {...otherProps}
    >
      {children}
    </StyledText>
  );
});

if (__DEV__) {
  TextChild.displayName = "NextUI.TextChild";
}

TextChild.toString = () => ".nextui-text-child";

export default React.memo(TextChild);
