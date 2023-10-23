import {forwardRef} from "@nextui-org/system";
import {FreeSoloPopover} from "@nextui-org/popover";
import {ScrollShadow} from "@nextui-org/scroll-shadow";
import {ChevronDownIcon, CloseIcon} from "@nextui-org/shared-icons";
import {Listbox} from "@nextui-org/listbox";
import {Button} from "@nextui-org/button";
import {Input} from "@nextui-org/input";
import {ForwardedRef, ReactElement, Ref} from "react";

import {UseAutocompleteProps, useAutocomplete} from "./use-autocomplete";

interface Props<T> extends UseAutocompleteProps<T> {}

function Autocomplete<T extends object>(props: Props<T>, ref: ForwardedRef<HTMLInputElement>) {
  const {
    Component,
    state,
    triggerRef,
    getBaseProps,
    getSelectorButtonProps,
    getInputProps,
    getListBoxProps,
    getPopoverProps,
    getClearButtonProps,
    getListBoxWrapperProps,
    getEndContentWrapperProps,
  } = useAutocomplete({...props, ref});

  const popoverContent = state.isOpen ? (
    <FreeSoloPopover {...getPopoverProps()} state={state} triggerRef={triggerRef}>
      <ScrollShadow {...getListBoxWrapperProps()}>
        <Listbox {...getListBoxProps()} />
      </ScrollShadow>
    </FreeSoloPopover>
  ) : null;

  return (
    <Component {...getBaseProps()}>
      <Input
        {...getInputProps()}
        endContent={
          <div {...getEndContentWrapperProps()}>
            <Button {...getClearButtonProps()}>
              <CloseIcon />
            </Button>
            <Button {...getSelectorButtonProps()}>
              <ChevronDownIcon />
            </Button>
          </div>
        }
      />
      {popoverContent}
    </Component>
  );
}

export type AutocompleteProps<T = object> = Props<T> & {ref?: Ref<HTMLElement>};

// forwardRef doesn't support generic parameters, so cast the result to the correct type
export default forwardRef(Autocomplete) as <T = object>(
  props: AutocompleteProps<T>,
) => ReactElement;

Autocomplete.displayName = "NextUI.Autocomplete";
