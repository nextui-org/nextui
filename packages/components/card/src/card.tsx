import {forwardRef} from "@nextui-org/system";
import {Drip} from "@nextui-org/drip";

import {useCard, UseCardProps} from "./use-card";

export interface CardProps extends Omit<UseCardProps, "ref"> {}

const Card = forwardRef<CardProps, "div">((props, ref) => {
  const {children, Component, drips, isPressable, disableAnimation, disableRipple, getCardProps} =
    useCard({
      ref,
      ...props,
    });

  return (
    <Component {...getCardProps()}>
      {isPressable && !disableAnimation && !disableRipple && <Drip drips={drips} />}
      {children}
    </Component>
  );
});

Card.displayName = "NextUI.Card";

export default Card;
