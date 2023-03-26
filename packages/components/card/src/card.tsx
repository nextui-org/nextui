"use client";

import {forwardRef} from "@nextui-org/system";
import {Drip} from "@nextui-org/drip";

import {CardProvider} from "./card-context";
import {useCard, UseCardProps} from "./use-card";

export interface CardProps extends Omit<UseCardProps, "ref"> {}

const Card = forwardRef<CardProps, "div">((props, ref) => {
  const {
    children,
    context,
    Component,
    drips,
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
      {isPressable && !disableAnimation && !disableRipple && <Drip drips={drips} />}
    </Component>
  );
});

Card.displayName = "NextUI.Card";

export default Card;
