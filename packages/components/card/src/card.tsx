import {forwardRef} from "@nextui-org/system";
import {Ripple} from "@nextui-org/ripple";

import {CardProvider} from "./card-context";
import {useCard, UseCardProps} from "./use-card";

export interface CardProps extends UseCardProps {}

const Card = forwardRef<"div", CardProps>((props, ref) => {
  const {
    children,
    context,
    Component,
    isPressable,
    disableAnimation,
    disableRipple,
    getCardProps,
    getRippelProps,
  } = useCard({...props, ref});

  return (
    <Component {...getCardProps()}>
      <CardProvider value={context}>{children}</CardProvider>
      {isPressable && !disableAnimation && !disableRipple && <Ripple {...getRippelProps()} />}
    </Component>
  );
});

Card.displayName = "NextUI.Card";

export default Card;
