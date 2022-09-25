import type {ReactNode} from "react";
import type {UseCardProps} from "./use-card";

import React, {PropsWithoutRef, RefAttributes} from "react";

import Drip from "../utils/drip";
import {CSS} from "../theme/stitches.config";
import {Image, Divider} from "../index";
import {__DEV__} from "../utils/assertion";

import {useCard} from "./use-card";
import {
  StyledCard,
  StyledCardHeader as CardHeader,
  StyledCardFooter as CardFooter,
  StyledCardBody as CardBody,
} from "./card.styles";

interface Props extends Omit<UseCardProps, "ref"> {
  children: ReactNode | ReactNode[];
  as?: keyof JSX.IntrinsicElements;
}

export type CardProps = Props & {css?: CSS};

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({...cardProps}, ref: React.Ref<HTMLDivElement | null>) => {
    const {as, css, children, ...otherProps} = cardProps;

    const {
      cardRef,
      variant,
      isFocusVisible,
      isPressable,
      isPressed,
      disableAnimation,
      disableRipple,
      borderWeight,
      isHovered,
      getCardProps,
      dripBindings,
    } = useCard({...otherProps, ref});

    return (
      <StyledCard
        ref={cardRef}
        as={as}
        borderWeight={borderWeight}
        css={css as any}
        disableAnimation={disableAnimation}
        isFocusVisible={isFocusVisible}
        isHovered={isHovered}
        isPressable={isPressable}
        isPressed={isPressed}
        role={isPressable ? "button" : "section"}
        tabIndex={isPressable ? 0 : -1}
        variant={variant}
        {...getCardProps()}
      >
        {isPressable && !disableAnimation && !disableRipple && <Drip {...dripBindings} />}
        {children}
      </StyledCard>
    );
  },
);

type CardComponent<T, P = {}> = React.ForwardRefExoticComponent<
  PropsWithoutRef<P> & RefAttributes<T>
> & {
  Header: typeof CardHeader;
  Body: typeof CardBody;
  Footer: typeof CardFooter;
  Image: typeof Image;
  Divider: typeof Divider;
};

if (__DEV__) {
  Card.displayName = "NextUI.Card";
}

Card.toString = () => ".nextui-card";

export default Card as CardComponent<HTMLDivElement, CardProps>;
