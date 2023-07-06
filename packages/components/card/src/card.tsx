import {forwardRef} from "@nextui-org/system";
import {lazy} from "react";

import {CardProvider} from "./card-context";
import {useCard, UseCardProps} from "./use-card";

const Ripple = lazy(() => import("@nextui-org/ripple").then(({Ripple}) => ({default: Ripple})));

export interface CardProps extends Omit<UseCardProps, "ref"> {}

const Card = forwardRef<CardProps, "div">((props, ref) => {
  const {
    children,
    context,
    Component,
    ripples,
    isPressable,
    disableAnimation,
    disableRipple,
    getCardProps,
  } = useCard({
    ref,
    ...props,
  });

  return (
    <Component {...getCardProps()}>
      <CardProvider value={context}>{children}</CardProvider>
      {isPressable && !disableAnimation && !disableRipple && <Ripple suspense ripples={ripples} />}
    </Component>
  );
});

Card.displayName = "NextUI.Card";

export default Card;
