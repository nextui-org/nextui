import {Listbox} from "@nextui-org/listbox";
import {Popover, PopoverContent, PopoverTrigger} from "@nextui-org/popover";
import {ScrollShadow} from "@nextui-org/scroll-shadow";
import {ChevronDownIcon} from "@nextui-org/shared-icons";
import {forwardRef} from "@nextui-org/system";
import {FocusScope} from "@react-aria/focus";
import {cloneElement, ForwardedRef, ReactElement, Ref, useMemo} from "react";

import {HiddenSelect} from "./hidden-select";
import {UseSelectProps, useSelect} from "./use-select";

interface Props<T> extends Omit<UseSelectProps<T>, "isLabelPlaceholder"> {}

function Select<T extends object>(props: Props<T>, ref: ForwardedRef<HTMLSelectElement>) {
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
    getHelperWrapperProps,
    getListboxWrapperProps,
    getDescriptionProps,
    getErrorMessageProps,
    getIconProps,
  } = useSelect<T>({...props, ref});

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
            <ScrollShadow {...getListboxWrapperProps()}>
              <Listbox {...getListboxProps()} />
            </ScrollShadow>
          </FocusScope>
        </PopoverContent>
      </Popover>
      {helperWrapper}
    </div>
  );
}

export type SelectProps<T = object> = Props<T> & {ref?: Ref<HTMLElement>};

// forwardRef doesn't support generic parameters, so cast the result to the correct type
export default forwardRef(Select) as <T = object>(props: SelectProps<T>) => ReactElement;

Select.displayName = "NextUI.Select";
