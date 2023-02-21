import {forwardRef} from "@nextui-org/system";
import {__DEV__} from "@nextui-org/shared-utils";
import {Image} from "@nextui-org/image";
import {Drip} from "@nextui-org/drip";

import CardHeader from "./card-header";
import {useCard, UseCardProps} from "./use-card";
import CardBody from "./card-body";
import CardFooter from "./card-footer";

export interface CardProps extends Omit<UseCardProps, "ref"> {}

type CompoundCard = {
  Header: typeof CardHeader;
  Body: typeof CardBody;
  Footer: typeof CardFooter;
  Image: typeof Image;
};

const Card = forwardRef<CardProps, "div", CompoundCard>((props, ref) => {
  const {
    cardRef,
    children,
    className,
    Component,
    styles,
    isPressable,
    disableAnimation,
    disableRipple,
    dripBindings,
    getCardProps,
  } = useCard({ref, ...props});

  const {base} = styles;

  return (
    <Component
      ref={cardRef}
      className={base({class: className})}
      role={isPressable ? "button" : "section"}
      tabIndex={isPressable ? 0 : -1}
      {...getCardProps()}
    >
      {isPressable && !disableAnimation && !disableRipple && (
        <Drip
          {...dripBindings}
          styles={{
            base: "opacity-30 z-50",
            svg: "text-inherit",
          }}
        />
      )}
      {children}
    </Component>
  );
});

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;
Card.Image = Image;

if (__DEV__) {
  Card.displayName = "NextUI.Card";
}

Card.toString = () => ".nextui-card";

export default Card;
