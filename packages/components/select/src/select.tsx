import {Listbox} from "@nextui-org/listbox";
import {Popover, PopoverContent, PopoverTrigger} from "@nextui-org/popover";
import {ScrollShadow} from "@nextui-org/scroll-shadow";
import {ChevronDownIcon} from "@nextui-org/shared-icons";
import {Spinner} from "@nextui-org/spinner";
import {forwardRef} from "@nextui-org/system";
import {FocusScope} from "@react-aria/focus";
import {VisuallyHidden} from "@react-aria/visually-hidden";
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
    isLoading,
    selectorIcon = <ChevronDownIcon />,
    description,
    errorMessage,
    startContent,
    endContent,
    placeholder,
    renderValue,
    getBaseProps,
    getLabelProps,
    getTriggerProps,
    getValueProps,
    getListboxProps,
    getPopoverProps,
    getSpinnerProps,
    shouldLabelBeOutside,
    getInnerWrapperProps,
    getHiddenSelectProps,
    getHelperWrapperProps,
    getListboxWrapperProps,
    getDescriptionProps,
    getErrorMessageProps,
    getSelectorIconProps,
  } = useSelect<T>({...props, ref});

  const labelContent = label ? <label {...getLabelProps()}>{label}</label> : null;

  const clonedIcon = cloneElement(selectorIcon as ReactElement, getSelectorIconProps());

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

  const renderSelectedItem = useMemo(() => {
    if (!state.selectedItems) return placeholder;

    if (renderValue && typeof renderValue === "function") {
      const mappedItems = [...state.selectedItems].map((item) => ({
        key: item.key,
        data: item.value,
        type: item.type,
        props: item.props,
        textValue: item.textValue,
        rendered: item.rendered,
        "aria-label": item["aria-label"],
      }));

      return renderValue(mappedItems);
    }

    return state.selectedItems.map((item) => item.textValue).join(", ");
  }, [state.selectedItems, renderValue]);

  const renderIndicator = useMemo(() => {
    if (isLoading) {
      return <Spinner {...getSpinnerProps()} />;
    }

    return clonedIcon;
  }, [isLoading, clonedIcon, getSpinnerProps]);

  return (
    <div {...getBaseProps()}>
      <HiddenSelect {...getHiddenSelectProps()} />
      {shouldLabelBeOutside ? labelContent : null}
      <Popover {...getPopoverProps()}>
        <PopoverTrigger>
          <Component {...getTriggerProps()}>
            {!shouldLabelBeOutside ? labelContent : null}
            <div {...getInnerWrapperProps()}>
              {startContent}
              <span {...getValueProps()}>
                {renderSelectedItem}
                <VisuallyHidden>,</VisuallyHidden>
              </span>
              {endContent}
            </div>
            {renderIndicator}
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
