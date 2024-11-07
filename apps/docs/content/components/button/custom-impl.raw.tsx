import {forwardRef} from "react";
import {useButton, Ripple, Spinner, ButtonProps as BaseButtonProps} from "@nextui-org/react";

export interface ButtonProps extends BaseButtonProps {}

const MyButton = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    domRef,
    children,
    spinnerSize,
    spinner = <Spinner color="current" size={spinnerSize} />,
    spinnerPlacement,
    startContent,
    endContent,
    isLoading,
    disableRipple,
    getButtonProps,
    getRippleProps,
  } = useButton({
    ref,
    ...props,
  });

  const {ripples, onClear} = getRippleProps();

  return (
    <button ref={domRef} {...getButtonProps()}>
      {startContent}
      {isLoading && spinnerPlacement === "start" && spinner}
      {children}
      {isLoading && spinnerPlacement === "end" && spinner}
      {endContent}
      {!disableRipple && <Ripple ripples={ripples} onClear={onClear} />}
    </button>
  );
});

MyButton.displayName = "MyButton";

export default MyButton;
