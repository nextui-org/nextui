import {forwardRef} from "react";
import {Ripple} from "@nextui-org/ripple";

import {CardProvider} from "./card-context";
import {useCard, UseCardProps} from "./use-card";

export interface CardProps extends Omit<UseCardProps, "ref"> {}

const Card = forwardRef<HTMLDivElement, CardProps>((props, ref) => {
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
      {isPressable && !disableAnimation && !disableRipple && <Ripple ripples={ripples} />}
    </Component>
  );
});

Card.displayName = "NextUI.Card";

export default Card;
