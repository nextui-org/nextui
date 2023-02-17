import {forwardRef, HTMLNextUIProps} from "@nextui-org/system";
import {useDOMRef} from "@nextui-org/dom-utils";
import {clsx} from "@nextui-org/shared-utils";

const CardFooter = forwardRef<HTMLNextUIProps & {isBlurred?: boolean}, "div">((props, ref) => {
  const {as, className, children, isBlurred, ...otherProps} = props;

  const Component = as || "div";
  const domRef = useDOMRef(ref);

  return (
    <Component
      ref={domRef}
      {...otherProps}
      className={clsx(
        "w-full h-auto p-3 flex items-center overflow-hidden color-inherit rounded-b-xl",
        {
          "backdrop-blur-md backdrop-saturate-[1.8]": isBlurred,
        },
        className,
      )}
    >
      {children}
    </Component>
  );
});

export default CardFooter;
