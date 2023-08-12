import {Listbox} from "@nextui-org/listbox";
import {Popover, PopoverContent, PopoverTrigger} from "@nextui-org/popover";
import {ScrollShadow} from "@nextui-org/scroll-shadow";
import {ChevronDownIcon} from "@nextui-org/shared-icons";
import {forwardRef} from "@nextui-org/system";
import {FocusScope} from "@react-aria/focus";
import {cloneElement, ReactElement, useMemo} from "react";

import {HiddenSelect} from "./hidden-select";
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
    labelPlacement,
    getBaseProps,
    getLabelProps,
    getTriggerProps,
    getValueProps,
    getListboxProps,
    getPopoverProps,
    shouldLabelBeOutside,
    getInnerWrapperProps,
    getHiddenSelectProps,
    getListboxWrapperProps,
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
      <HiddenSelect {...getHiddenSelectProps()} />
      {shouldLabelBeOutside ? labelContent : null}
      <Popover {...getPopoverProps()}>
        <PopoverTrigger>
          <Component {...getTriggerProps()}>
            {labelPlacement === "inside" ? labelContent : null}
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
            <ScrollShadow hideScrollBar {...getListboxWrapperProps()}>
              <Listbox {...getListboxProps()} />
            </ScrollShadow>
          </FocusScope>
        </PopoverContent>
      </Popover>
      {helperWrapper}
    </div>
  );
});

Select.displayName = "NextUI.Select";

export default Select;
