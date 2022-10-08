import {forwardRef} from "@nextui-org/system";
import {clsx, __DEV__} from "@nextui-org/shared-utils";
import {Divider} from "@nextui-org/divider";
import {Image} from "@nextui-org/image";
import {Drip} from "@nextui-org/drip";

import {
  StyledCard,
  StyledCardHeader as CardHeader,
  StyledCardFooter as CardFooter,
  StyledCardBody as CardBody,
} from "./card.styles";
import {UseCardProps, useCard} from "./use-card";

export interface CardProps extends Omit<UseCardProps, "ref"> {}

type CompoundCard = {
  Header: typeof CardHeader;
  Body: typeof CardBody;
  Footer: typeof CardFooter;
  Image: typeof Image;
  Divider: typeof Divider;
};

const Card = forwardRef<CardProps, "div", CompoundCard>((props, ref) => {
  const {
    cardRef,
    children,
    className,
    variant,
    isFocusVisible,
    isPressable,
    isPressed,
    disableAnimation,
    disableRipple,
    borderWeight,
    isHovered,
    dripBindings,
    getCardProps,
  } = useCard({ref, ...props});

  return (
    <StyledCard
      ref={cardRef}
      borderWeight={borderWeight}
      className={clsx("nextui-card", className)}
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
});

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;
Card.Image = Image;
Card.Divider = Divider;

if (__DEV__) {
  Card.displayName = "NextUI.Card";
}

Card.toString = () => ".nextui-card";

export default Card;
