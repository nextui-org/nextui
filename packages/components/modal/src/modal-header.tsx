import {useEffect} from "react";
import {forwardRef, HTMLHeroUIProps} from "@heroui/system";
import {ReactRef, useDOMRef} from "@heroui/react-utils";
import {clsx} from "@heroui/shared-utils";

import {useModalContext} from "./modal-context";

export interface ModalHeaderProps extends HTMLHeroUIProps<"header"> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLElement | null>;
}

const ModalHeader = forwardRef<"header", ModalHeaderProps>((props, ref) => {
  const {as, children, className, ...otherProps} = props;

  const {slots, classNames, headerId, setHeaderMounted} = useModalContext();

  const domRef = useDOMRef(ref);

  const Component = as || "header";

  /**
   * Notify us if this component was rendered or used,
   * so we can append `aria-labelledby` automatically
   */
  useEffect(() => {
    setHeaderMounted(true);

    return () => setHeaderMounted(false);
  }, [setHeaderMounted]);

  return (
    <Component
      ref={domRef}
      className={slots.header({class: clsx(classNames?.header, className)})}
      id={headerId}
      {...otherProps}
    >
      {children}
    </Component>
  );
});

ModalHeader.displayName = "HeroUI.ModalHeader";

export default ModalHeader;
