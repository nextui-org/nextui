import React, {useMemo} from "react";
import {forwardRef} from "@nextui-org/system";
import {CloseIcon} from "@nextui-org/shared-icons";

import {useAlert, UseAlertProps} from "./use-alert";

export interface alertProps extends UseAlertProps {}

const Alert = forwardRef<"div", alertProps>((props, ref) => {
  const {
    title,
    description,
    startContent,
    endContent,
    visible,
    handleHide,
    domRef,
    getBaseProps,
    getHelperWrapperProps,
    getInnerWrapperProps,
    getDescriptionProps,
    getTitleProps,
  } = useAlert({...props, ref});

  const helperWrapper = useMemo(() => {
    return (
      <div {...getHelperWrapperProps()}>
        <div {...getTitleProps()}>{title}</div>
        <div {...getDescriptionProps()}>{description}</div>
      </div>
    );
  }, [title, description, getHelperWrapperProps, getTitleProps, getDescriptionProps]);

  const innerWrapper = useMemo(() => {
    return (
      <div {...getInnerWrapperProps()}>
        {startContent}
        {helperWrapper}
        {endContent}
      </div>
    );
  }, [startContent, endContent, helperWrapper]);

  const baseWrapper = useMemo(() => {
    return (
      visible && (
        <div ref={domRef} {...getBaseProps()}>
          {innerWrapper}
          <CloseIcon onClick={handleHide} />
        </div>
      )
    );
  }, [innerWrapper, domRef, getBaseProps, visible, handleHide]);

  return <>{baseWrapper}</>;
});

export default Alert;
