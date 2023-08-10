import {Listbox} from "@nextui-org/listbox";
import {Popover, PopoverContent, PopoverTrigger} from "@nextui-org/popover";
import {ChevronDownIcon} from "@nextui-org/shared-icons";
import {forwardRef} from "@nextui-org/system";
import {FocusScope} from "@react-aria/focus";
import {HiddenSelect} from "@react-aria/select";
import {cloneElement, ReactElement, useMemo} from "react";

import {UseSelectProps, useSelect} from "./use-select";

export interface SelectProps extends Omit<UseSelectProps, "isLabelPlaceholder"> {}

const Select = forwardRef<"button", SelectProps>((props, ref) => {
  const {
    Component,
    state,
    label,
    hasHelper,
    icon = <ChevronDownIcon />,
    description,
    errorMessage,
    startContent,
    endContent,
    placeholder,
    getBaseProps,
    getLabelProps,
    getTriggerProps,
    getInnerWrapperProps,
    getInputProps,
    getValueProps,
    getListboxProps,
    getPopoverProps,
    getHelperWrapperProps,
    getDescriptionProps,
    getErrorMessageProps,
    getIconProps,
  } = useSelect({...props, ref});

  const labelContent = label ? <label {...getLabelProps()}>{label}</label> : null;

  const clonedIcon = cloneElement(icon as ReactElement, getIconProps());

  const helperWrapper = useMemo(() => {
    if (!hasHelper) return null;

    return (
      <div {...getHelperWrapperProps()}>
        {errorMessage ? (
          <div {...getErrorMessageProps()}>{errorMessage}</div>
        ) : description ? (
          <div {...getDescriptionProps()}>{description}</div>
        ) : null}
      </div>
    );
  }, [
    hasHelper,
    errorMessage,
    description,
    getHelperWrapperProps,
    getErrorMessageProps,
    getDescriptionProps,
  ]);

  return (
    <div {...getBaseProps()}>
      <HiddenSelect {...getInputProps()} />
      <Popover {...getPopoverProps()}>
        <PopoverTrigger>
          <Component {...getTriggerProps()}>
            {labelContent}
            <div {...getInnerWrapperProps()}>
              {startContent}
              <span {...getValueProps()}>
                {state.selectedItem ? state.selectedItem.rendered : placeholder}
              </span>
              {endContent}
            </div>
            {clonedIcon}
          </Component>
        </PopoverTrigger>
        <PopoverContent>
          <FocusScope contain restoreFocus>
            <Listbox {...getListboxProps()} />
          </FocusScope>
        </PopoverContent>
      </Popover>
      {helperWrapper}
    </div>
  );
});

Select.displayName = "NextUI.Select";

export default Select;
