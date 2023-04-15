import {useEffect} from "react";
import {forwardRef, HTMLNextUIProps} from "@nextui-org/system";
import {useDOMRef} from "@nextui-org/dom-utils";
import {clsx} from "@nextui-org/shared-utils";

import {useModalContext} from "./modal-context";

export interface ModalBodyProps extends HTMLNextUIProps<"div"> {}

const ModalBody = forwardRef<ModalBodyProps, "div">((props, ref) => {
  const {as, children, className, ...otherProps} = props;

  const {slots, classNames, bodyId, setBodyMounted} = useModalContext();

  const domRef = useDOMRef(ref);

  const Component = as || "div";

  /**
   * Notify us if this component was rendered or used,
   * so we can append `aria-labelledby` automatically
   */
  useEffect(() => {
    setBodyMounted(true);

    return () => setBodyMounted(false);
  }, [setBodyMounted]);

  return (
    <Component
      ref={domRef}
      className={slots.body({class: clsx(classNames?.body, className)})}
      id={bodyId}
      {...otherProps}
    >
      {children}
    </Component>
  );
});

ModalBody.displayName = "NextUI.ModalBody";

export default ModalBody;
