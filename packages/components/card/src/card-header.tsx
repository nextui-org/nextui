import {forwardRef, HTMLNextUIProps} from "@nextui-org/system";
import {useDOMRef} from "@nextui-org/dom-utils";
import {clsx} from "@nextui-org/shared-utils";

import {useCardContext} from "./card-context";

const CardHeader = forwardRef<HTMLNextUIProps, "div">((props, ref) => {
  const {as, className, children, ...otherProps} = props;
  const Component = as || "div";

  const domRef = useDOMRef(ref);

  const {slots, styles} = useCardContext();

  const headerStyles = clsx(styles?.header, className);

  return (
    <>
      <Component ref={domRef} className={slots.header?.({class: headerStyles})} {...otherProps}>
        {children}
      </Component>
    </>
  );
});

export default CardHeader;
