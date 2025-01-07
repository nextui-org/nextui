import {forwardRef, HTMLNextUIProps} from "@heroui/system";
import {useDOMRef} from "@heroui/react-utils";
import {clsx} from "@heroui/shared-utils";

import {useCardContext} from "./card-context";

const CardHeader = forwardRef<"div", HTMLNextUIProps<"div">>((props, ref) => {
  const {as, className, children, ...otherProps} = props;
  const Component = as || "div";

  const domRef = useDOMRef(ref);

  const {slots, classNames} = useCardContext();

  const headerStyles = clsx(classNames?.header, className);

  return (
    <Component ref={domRef} className={slots.header?.({class: headerStyles})} {...otherProps}>
      {children}
    </Component>
  );
});

CardHeader.displayName = "NextUI.CardHeader";

export default CardHeader;
