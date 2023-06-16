import {
  ariaHideOutside,
  AriaModalOverlayProps,
  ModalOverlayAria,
  useOverlay,
  useOverlayFocusContain,
} from "@react-aria/overlays";
import {mergeProps} from "@react-aria/utils";
import {OverlayTriggerState} from "@react-stately/overlays";
import {RefObject, useEffect} from "react";

export interface UseAriaModalOverlayProps extends AriaModalOverlayProps {}

export function useAriaModalOverlay(
  props: UseAriaModalOverlayProps = {},
  state: OverlayTriggerState,
  ref: RefObject<HTMLElement>,
): ModalOverlayAria {
  let {overlayProps, underlayProps} = useOverlay(
    {
      ...props,
      isOpen: state.isOpen,
      onClose: state.close,
    },
    ref,
  );

  useOverlayFocusContain();

  useEffect(() => {
    if (state.isOpen && ref.current) {
      return ariaHideOutside([ref.current]);
    }
  }, [state.isOpen, ref]);

  return {
    modalProps: mergeProps(overlayProps),
    underlayProps,
  };
}

export type UseAriaModalOverlayReturn = ReturnType<typeof useAriaModalOverlay>;
