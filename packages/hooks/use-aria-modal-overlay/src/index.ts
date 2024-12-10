import {
  ariaHideOutside,
  AriaModalOverlayProps,
  ModalOverlayAria,
  useOverlay,
  usePreventScroll,
  useOverlayFocusContain,
} from "@react-aria/overlays";
import {mergeProps} from "@react-aria/utils";
import {OverlayTriggerState} from "@react-stately/overlays";
import {RefObject, useEffect} from "react";

export interface UseAriaModalOverlayProps extends AriaModalOverlayProps {}

/**
 * Provides the behavior and accessibility implementation for a modal component.
 * A modal is an overlay element which blocks interaction with elements outside it.
 *
 * This is a modified version from https://vscode.dev/github/adobe/react-spectrum/blob/main/packages/%40react-aria/overlays/src/useModalOverlay.ts#L46
 *
 * This implementation disables the prevent scroll when `shouldBlockScroll` prop is false.
 */
export function useAriaModalOverlay(
  props: UseAriaModalOverlayProps & {
    shouldBlockScroll?: boolean;
  } = {
    shouldBlockScroll: true,
  },
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

  usePreventScroll({
    isDisabled: !state.isOpen || !props.shouldBlockScroll,
  });

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
