import {chain} from "@react-aria/utils";
import {useControlledState} from "@react-stately/utils";
import {useCallbackRef} from "@nextui-org/use-callback-ref";
import {useCallback, useId} from "react";

export interface UseDisclosureProps {
  isOpen?: boolean;
  defaultOpen?: boolean;
  onClose?(): void;
  onOpen?(): void;
  onChange?(isOpen: boolean | undefined): void;
  id?: string;
}

export function useDisclosure(props: UseDisclosureProps = {}) {
  const {
    id: idProp,
    defaultOpen,
    isOpen: isOpenProp,
    onClose: onCloseProp,
    onOpen: onOpenProp,
    onChange = () => {},
  } = props;

  const onOpenPropCallbackRef = useCallbackRef(onOpenProp);
  const onClosePropCallbackRef = useCallbackRef(onCloseProp);
  const [isOpen, setIsOpen] = useControlledState(isOpenProp, defaultOpen || false, onChange);

  const reactId = useId();
  const id = idProp || reactId;
  const isControlled = isOpenProp !== undefined;

  const onClose = useCallback(() => {
    if (!isControlled) {
      setIsOpen(false);
    }
    onClosePropCallbackRef?.();
  }, [isControlled, onClosePropCallbackRef]);

  const onOpen = useCallback(() => {
    if (!isControlled) {
      setIsOpen(true);
    }
    onOpenPropCallbackRef?.();
  }, [isControlled, onOpenPropCallbackRef]);

  const onOpenChange = useCallback(() => {
    const action = isOpen ? onClose : onOpen;

    action();
  }, [isOpen, onOpen, onClose]);

  return {
    isOpen: !!isOpen,
    onOpen,
    onClose,
    onOpenChange,
    isControlled,
    getButtonProps: (props: any = {}) => ({
      ...props,
      "aria-expanded": isOpen,
      "aria-controls": id,
      onClick: chain(props.onClick, onOpenChange),
    }),
    getDisclosureProps: (props: any = {}) => ({
      ...props,
      hidden: !isOpen,
      id,
    }),
  };
}

export type UseDisclosureReturn = ReturnType<typeof useDisclosure>;
