import {forwardRef, HTMLNextUIProps} from "@nextui-org/system";
import {useDOMRef} from "@nextui-org/dom-utils";
import {clsx} from "@nextui-org/shared-utils";

const CardBody = forwardRef<HTMLNextUIProps, "div">((props, ref) => {
  const {as, className, children, ...otherProps} = props;

  const Component = as || "div";
  const domRef = useDOMRef(ref);

  return (
    <Component
      ref={domRef}
      {...otherProps}
      className={clsx(
        "relative flex flex-auto flex-col place-content-inherit align-items-inherit w-full h-auto py-5 px-3 text-left overflow-y-auto",
        className,
      )}
    >
      {children}
    </Component>
  );
});

export default CardBody;
