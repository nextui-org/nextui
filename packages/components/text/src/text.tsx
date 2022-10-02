import {ReactNode, useMemo} from "react";
import {forwardRef} from "@nextui-org/system";
import {useDOMRef} from "@nextui-org/dom-utils";
import {clsx, __DEV__} from "@nextui-org/shared-utils";

import {UseTextProps, TextRenderableElements, useText} from "./use-text";
import TextChild, {TextChildProps} from "./text-child";

export interface TextProps extends UseTextProps {}

const getModifierChild = (
  tags: TextRenderableElements,
  children: ReactNode,
  size?: TextChildProps["size"],
  transform?: TextChildProps["transform"],
) => {
  if (!tags.length) return children;
  const nextTag = tags.slice(1, tags.length);

  return (
    <TextChild size={size} tag={tags[0]} transform={transform}>
      {getModifierChild(nextTag, children, size)}
    </TextChild>
  );
};

const Text = forwardRef<TextProps, "p">((props, ref) => {
  const {children, size, transform, tag, renderableChildElements, className, ...otherProps} =
    useText(props);

  const domRef = useDOMRef(ref);

  const modifers = useMemo(() => {
    if (!renderableChildElements.length) return children;

    return getModifierChild(renderableChildElements, children, size, transform);
  }, [renderableChildElements, children, size, transform]);

  return (
    <TextChild
      ref={domRef}
      className={clsx("nextui-text", className)}
      size={size}
      tag={tag}
      transform={transform}
      {...otherProps}
    >
      {modifers}
    </TextChild>
  );
});

if (__DEV__) {
  Text.displayName = "NextUI.Text";
}

Text.toString = () => ".nextui-text";

export default Text;
