const App = `import {forwardRef} from "react";
import {useButton, Ripple, Spinner} from "@nextui-org/react";


const MyButton = forwardRef((props, ref) => {
  const {
    domRef,
    children,
    ripples,
    spinnerSize,
    spinner = <Spinner color="current" size={spinnerSize} />,
    spinnerPlacement,
    startContent,
    endContent,
    isLoading,
    disableRipple,
    getButtonProps,
  } = useButton({
    ref,
    ...props,
  });

  return (
    <button ref={domRef} {...getButtonProps()}>
      {startContent}
      {isLoading && spinnerPlacement === "start" && spinner}
      {children}
      {isLoading && spinnerPlacement === "end" && spinner}
      {endContent}
      {!disableRipple && <Ripple ripples={ripples} />}
    </button>
  );
});

MyButton.displayName = "MyButton";

export default MyButton;`;

const AppTs = `import {forwardRef} from "react";
import {useButton, Ripple, Spinner, ButtonProps as BaseButtonProps} from "@nextui-org/react";

export interface ButtonProps extends BaseButtonProps {}

const MyButton = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    domRef,
    children,
    ripples,
    spinnerSize,
    spinner = <Spinner color="current" size={spinnerSize} />,
    spinnerPlacement,
    startContent,
    endContent,
    isLoading,
    disableRipple,
    getButtonProps,
  } = useButton({
    ref,
    ...props,
  });

  return (
    <button ref={domRef} {...getButtonProps()}>
      {startContent}
      {isLoading && spinnerPlacement === "start" && spinner}
      {children}
      {isLoading && spinnerPlacement === "end" && spinner}
      {endContent}
      {!disableRipple && <Ripple ripples={ripples} />}
    </button>
  );
});

MyButton.displayName = "MyButton";

export default MyButton;`;

const react = {
  "/App.jsx": App,
};

const reactTs = {
  "/App.tsx": AppTs,
};

export default {
  ...react,
  ...reactTs,
};
