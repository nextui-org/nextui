const App = `import { forwardRef } from "react";

import { useButton, Drip, Spinner } from "@nextui-org/react";

const MyButton = forwardRef((props, ref) => {
  const {
    domRef,
    children,
    classNames,
    drips,
    spinnerSize,
    spinner = <Spinner color="current" size={spinnerSize} />,
    spinnerPlacement,
    startIcon,
    endIcon,
    isLoading,
    disableRipple,
    getButtonProps,
  } = useButton({
    ref,
    ...props,
  });

  return (
    <button ref={domRef} className={classNames} {...getButtonProps()}>
      {startIcon}
      {isLoading && spinnerPlacement === "start" && spinner}
      {children}
      {isLoading && spinnerPlacement === "end" && spinner}
      {endIcon}
      {!disableRipple && <Drip drips={drips} />}
    </button>
  );
});

MyButton.displayName = "MyButton";

export default MyButton;`;

const AppTs = `import { forwardRef } from "react";

import { useButton, Drip, Spinner, ButtonProps as BaseButtonProps } from "@nextui-org/react";

export interface ButtonProps extends BaseButtonProps {}

const MyButton = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    domRef,
    children,
    classNames,
    drips,
    spinnerSize,
    spinner = <Spinner color="current" size={spinnerSize} />,
    spinnerPlacement,
    startIcon,
    endIcon,
    isLoading,
    disableRipple,
    getButtonProps,
  } = useButton({
    ref,
    ...props,
  });

  return (
    <button ref={domRef} className={classNames} {...getButtonProps()}>
      {startIcon}
      {isLoading && spinnerPlacement === "start" && spinner}
      {children}
      {isLoading && spinnerPlacement === "end" && spinner}
      {endIcon}
      {!disableRipple && <Drip drips={drips} />}
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
