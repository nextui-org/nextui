import {HTMLNextUIProps, mapPropsVariants, PropGetter} from "@nextui-org/system";
import {AlertSlots, SlotsToClasses} from "@nextui-org/theme";
import {ReactRef, useDOMRef} from "@nextui-org/react-utils";
import {AlertVariantProps} from "@nextui-org/theme/src/components/alert";
import {ReactNode, useCallback, useMemo} from "react";
import {alert} from "@nextui-org/theme";
import {useState} from "react";
import {objectToDeps} from "@nextui-org/shared-utils";

interface Props extends HTMLNextUIProps<"div"> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLDivElement | null>;

  /**
   * title of the alert message
   */
  title: string;

  /**
   * Main body of the alert message
   */
  description: ReactNode;

  /**
   *  whether the alert can be closed by user
   */
  isCloseable?: boolean;

  /**
   * function which is called when close button is clicked
   */
  onClose?: () => void;

  /**
   * Classname or List of classes to change the classNames of the element.
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   * <Alert classNames={{
   *    base:"base-classes", // image classes
   *    mainWrapper: "mainWrapper-classes"
   *    description: "description-classes"
   *    title: "title-classes"
   * }} />
   * ```
   */
  classNames?: SlotsToClasses<AlertSlots>;
}
export type UseAlertProps = Props & AlertVariantProps;

export function useAlert(originalProps: UseAlertProps) {
  const [props, variantProps] = mapPropsVariants(originalProps, alert.variantKeys);

  const [isVisible, setIsVisible] = useState(true);
  const handleClose = () => {
    setIsVisible(() => false);
  };

  const {title, description, onClose, isCloseable, ref, classNames} = {
    /**
     *  isCloseable is true by default if not provided in props
     */
    isCloseable: true,

    /**
     * By default, onClose simply closes the alert
     */
    onClose: handleClose,
    ...props,
  };

  const domRef = useDOMRef(ref);

  const slots = useMemo(() => alert({...variantProps}), [objectToDeps(variantProps)]);

  const getBaseProps = useCallback<PropGetter>(() => {
    return {
      className: slots.base({class: classNames?.base}),
    };
  }, [slots, classNames?.base]);

  const getMainWrapperProps = useCallback<PropGetter>(() => {
    return {
      className: slots.mainWrapper({class: classNames?.mainWrapper}),
    };
  }, [slots, classNames?.mainWrapper]);

  const getDescriptionProps = useCallback<PropGetter>(() => {
    return {
      className: slots.description({class: classNames?.description}),
    };
  }, [slots, classNames?.description]);

  const getTitleProps = useCallback<PropGetter>(() => {
    return {
      className: slots.title({class: classNames?.title}),
    };
  }, [slots, classNames?.title]);

  const getCloseButtonProps = useCallback<PropGetter>(() => {
    return {
      className: slots.closeButton({class: classNames?.closeButton}),
    };
  }, [slots, classNames?.closeButton]);

  return {
    title,
    description,
    isCloseable,
    isVisible,
    onClose,
    domRef,
    getBaseProps,
    getMainWrapperProps,
    getDescriptionProps,
    getTitleProps,
    color: variantProps["color"],
    getCloseButtonProps,
  };
}
