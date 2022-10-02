import {useMemo} from "react";
import {HTMLNextUIProps, forwardRef, CSS} from "@nextui-org/system";
import {useDOMRef} from "@nextui-org/dom-utils";
import {clsx, __DEV__, isNormalColor} from "@nextui-org/shared-utils";

import {StyledText} from "./text.styles";

export interface TextChildProps extends HTMLNextUIProps<"p"> {
  tag: keyof JSX.IntrinsicElements;
  /**
   * Text color.
   * @default "default"
   */
  color?: CSS["color"];
  /**
   * The **`font-size`** CSS property sets the size of the font. Changing the font size also updates the sizes of the font size-relative `<length>` units, such as `em`, `ex`, and so forth.
   *
   * **Syntax**: `<absolute-size> | <relative-size> | <length-percentage>`
   *
   * **Initial value**: `medium`
   *
   */
  size?: CSS["fontSize"];
  /**
   * The **`text-transform`** CSS property specifies how to capitalize an element's text. It can be used to make text appear in all-uppercase or all-lowercase, or with each word capitalized. It also can help improve legibility for ruby.
   *
   * **Syntax**: `none | capitalize | uppercase | lowercase | full-width | full-size-kana`
   *
   * **Initial value**: `none`
   *
   */
  transform?: CSS["textTransform"];
  /**
   * The **`font-weight`** CSS property specifies the weight (or boldness) of the font. The font weights available to you will depend on the `font-family` you are using. Some fonts are only available in `normal` and `bold`.
   */
  weight?: CSS["fontWeight"];
}

const TextChild = forwardRef<TextChildProps, "p">((props, ref) => {
  const {
    tag,
    css,
    children,
    color: userColor = "$text",
    transform: textTransform,
    size: fontSize,
    weight: fontWeight,
    className,
    ...otherProps
  } = props;

  const domRef = useDOMRef(ref);

  const color = useMemo(() => {
    if (isNormalColor(userColor as string)) {
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
      className={clsx("nextui-text-child", className)}
      css={{
        color,
        fontSize,
        textTransform,
        fontWeight,
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

export default TextChild;
