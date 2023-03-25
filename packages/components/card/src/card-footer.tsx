import {forwardRef, HTMLNextUIProps} from "@nextui-org/system";
import {useDOMRef} from "@nextui-org/dom-utils";
import {clsx} from "@nextui-org/shared-utils";
import {filterDOMProps} from "@react-aria/utils";

import {useCardContext} from "./card-context";

export interface CardFooterProps extends HTMLNextUIProps<"div"> {
  isBlurred?: boolean;
}

const CardFooter = forwardRef<CardFooterProps, "div">((props, ref) => {
  const {as, className, children, isBlurred, ...otherProps} = props;

  const Component = as || "div";
  const domRef = useDOMRef(ref);

  const {slots, styles} = useCardContext();

  const footerStyles = clsx(styles?.body, className, {
    "backdrop-blur-md backdrop-saturate-[1.8]": isBlurred,
  });

  return (
    <Component
      ref={domRef}
      className={slots.footer?.({class: footerStyles})}
      {...filterDOMProps(otherProps, {labelable: true})}
    >
      {children}
    </Component>
  );
});

export default CardFooter;
