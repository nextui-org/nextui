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
  ref?: ReactRef<HTMLImageElement | null>;

  title: string;
  description: ReactNode;

  // whether the alert can be closed by user
  isCloseable: boolean;

  // content to be displayed on the left side of inner wrapper
  startContent?: ReactNode;

  // content to be displayed on the right side of inner wrapper
  endContent?: ReactNode;

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
  const {title, description, isCloseable, startContent, endContent, ref, classNames} = props;

  const [visible, setVisible] = useState(true);
  const handleHide = () => {
    setVisible(() => false);
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

  return {
    title,
    description,
    isCloseable,
    startContent,
    endContent,
    visible,
    handleHide,
    domRef,
    getBaseProps,
    getMainWrapperProps,
    getDescriptionProps,
    getTitleProps,
  };
}
