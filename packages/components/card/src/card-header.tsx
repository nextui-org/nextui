import {forwardRef, HTMLNextUIProps} from "@nextui-org/system";
import {useDOMRef} from "@nextui-org/dom-utils";
import {clsx} from "@nextui-org/shared-utils";

const CardHeader = forwardRef<HTMLNextUIProps, "div">((props, ref) => {
  const {as, className, children, ...otherProps} = props;
  const Component = as || "div";

  const domRef = useDOMRef(ref);

  return (
    <>
      <Component
        ref={domRef}
        {...otherProps}
        className={clsx(
          "flex justify-start items-center shrink-0 w-full overflow-inherit color-inherit p-3 z-10",
          className,
        )}
      >
        {children}
      </Component>
    </>
  );
});

export default CardHeader;
