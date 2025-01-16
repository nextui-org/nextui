import {forwardRef} from "@heroui/system";

import {UseScrollShadowProps, useScrollShadow} from "./use-scroll-shadow";

export interface ScrollShadowProps extends UseScrollShadowProps {}

const ScrollShadow = forwardRef<"div", ScrollShadowProps>((props, ref) => {
  const {Component, children, getBaseProps} = useScrollShadow({...props, ref});

  return <Component {...getBaseProps()}>{children}</Component>;
});

ScrollShadow.displayName = "HeroUI.ScrollShadow";

export default ScrollShadow;
