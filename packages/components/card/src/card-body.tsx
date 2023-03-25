import {forwardRef, HTMLNextUIProps} from "@nextui-org/system";
import {useDOMRef} from "@nextui-org/dom-utils";
import {clsx} from "@nextui-org/shared-utils";
import {filterDOMProps} from "@react-aria/utils";

import {useCardContext} from "./card-context";

const CardBody = forwardRef<HTMLNextUIProps, "div">((props, ref) => {
  const {as, className, children, ...otherProps} = props;

  const Component = as || "div";
  const domRef = useDOMRef(ref);

  const {slots, styles} = useCardContext();

  const bodyStyles = clsx(styles?.body, className);

  return (
    <Component
      ref={domRef}
      className={slots.body?.({class: bodyStyles})}
      {...filterDOMProps(otherProps, {labelable: true})}
    >
      {children}
    </Component>
  );
});

export default CardBody;
