const App = `import React, {forwardRef} from "react";
import {useAlert} from "@nextui-org/react";

const styles = {
  base: [
    "bg-slate-100",
    "border",
    "shadow",
    "hover:bg-slate-200",
    "focus-within:!bg-slate-100",
    "dark:bg-slate-900",
    "dark:hover:bg-slate-800",
    "dark:border-slate-800",
    "dark:focus-within:!bg-slate-900",
    "cursor:pointer"
  ],
  title: [
    "text-base",
    "text-slate-500",
    "font-bold"
  ],
  description: [
    "text-base",
    "text-slate-500",
  ],
}

const MyAlert = forwardRef((props, ref) => {
  const {
  title,
  description,
  isClosable,
  domRef,
  handleClose,
  getBaseProps,
  getMainWrapperProps,
  getDescriptionProps,
  getTitleProps,
  getCloseButtonProps,
  color,
  isVisible,
  onClose,
  } = useAlert({
      ...props,
      ref,
      // this is just for the example, the props bellow should be passed by the parent component
      title:"Email Sent!!",
      description:"You will get a reply soon",
      // custom styles
      classNames: {
        ...styles,
      },
    });

  const mainWrapper = useMemo(() => {
    return (
      <div {...getMainWrapperProps()}>
        {title && <div {...getTitleProps()}>{title}</div>}
        <div {...getDescriptionProps()}>{description}</div>
      </div>
    );
  }, [title, description, getMainWrapperProps, getTitleProps, getDescriptionProps]);

  const baseWrapper = useMemo(() => {
    return isVisible ? (
      <div ref={domRef} {...getBaseProps()}>
        <AlertIcon color={color} />
        {mainWrapper}
        {(isClosable || onClose) && (
          <button onClick={handleClose} {...getCloseButtonProps()}>
            <AlertCloseIcon color={color} />
          </button>
        )}
      </div>
    ) : null;
  }, [
    mainWrapper,
    isClosable,
    getCloseButtonProps,
    isVisible,
    domRef,
    getBaseProps,
    handleClose,
    color,
  ]);

  return <>{baseWrapper}</>;
});

MyAlert.displayName = "MyAlert";

export default MyAlert;`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
