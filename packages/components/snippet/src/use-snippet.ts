import type {SnippetVariantProps, SnippetSlots, SlotsToClasses} from "@nextui-org/theme";

import {snippet} from "@nextui-org/theme";
import {HTMLNextUIProps, mapPropsVariants, PropGetter} from "@nextui-org/system";
import {useDOMRef} from "@nextui-org/dom-utils";
import {clsx, ReactRef} from "@nextui-org/shared-utils";
import {useClipboard} from "@nextui-org/use-clipboard";
import {useFocusRing} from "@react-aria/focus";
import {useMemo, useCallback} from "react";
import {TooltipProps} from "@nextui-org/tooltip";
export interface UseSnippetProps
  extends Omit<HTMLNextUIProps<"div">, "onCopy">,
    SnippetVariantProps {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLDivElement | null>;
  /**
   * The content of the snippet.
   * if `string[]` is passed, it will be rendered as a multi-line snippet.
   */
  children?: React.ReactNode | string | string[];
  /**
   * The symbol to show before the snippet.
   * @default "$"
   */
  symbol?: string | React.ReactNode;
  /**
   * The time in milliseconds to wait before resetting the clipboard.
   * @default 2000
   */
  timeout?: number;
  /*
   * Snippet copy icon.
   */
  copyIcon?: React.ReactNode;
  /*
   * Snippet copy icon. This icon will be shown when the text is copied.
   */
  checkIcon?: React.ReactNode;
  /**
   * Classname or List of classes to change the styles of the element.
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   * <Snippet styles={{
   *    base:"base-classes",
   *    pre: "pre-classes",
   *    copy: "copy-classes",
   * }} />
   * ```
   */
  styles?: SlotsToClasses<SnippetSlots>;
  /**
   * Whether the copy button should receive focus on render.
   * @default false
   */
  autoFocus?: boolean;
  /**
   * Whether to hide the tooltip.
   * @default false
   */
  disableTooltip?: boolean;
  /**
   * Whether to disable the copy functionality.
   * @default false
   */
  disableCopy?: boolean;
  /**
   * Whether to hide the copy button.
   * @default false
   */
  hideCopyButton?: boolean;
  /**
   * Whether to hide the symbol.
   * @default false
   */
  hideSymbol?: boolean;
  /**
   * Tooltip props.
   */
  tooltipProps?: TooltipProps;
  /**
   * Callback when the text is copied.
   */
  onCopy?: (value: string | string[]) => void;
}

export function useSnippet(originalProps: UseSnippetProps) {
  const [props, variantProps] = mapPropsVariants(originalProps, snippet.variantKeys);

  const {
    ref,
    as,
    children,
    symbol = "$",
    styles,
    timeout,
    copyIcon,
    checkIcon,
    disableCopy = false,
    disableTooltip = false,
    hideCopyButton = false,
    autoFocus = false,
    hideSymbol = false,
    onCopy: onCopyProp,
    tooltipProps = {
      offset: 15,
      content: "Copy to clipboard",
      size: originalProps?.size as TooltipProps["size"],
      variant: originalProps?.variant as TooltipProps["variant"],
      color: originalProps?.color as TooltipProps["color"],
      isDisabled: disableCopy,
    },
    className,
    ...otherProps
  } = props;

  const Component = as || "div";

  const domRef = useDOMRef(ref);

  const {copy, copied} = useClipboard({timeout});

  const isMultiLine = children && Array.isArray(children);

  const {isFocusVisible, focusProps} = useFocusRing({
    autoFocus,
  });

  const slots = useMemo(
    () =>
      snippet({
        ...variantProps,
        isFocusVisible,
      }),
    [...Object.values(variantProps), isFocusVisible],
  );

  const symbolBefore = useMemo(() => {
    if (!symbol || typeof symbol !== "string") return symbol;
    const str = symbol.trim();

    return str ? `${str} ` : "";
  }, [symbol]);

  const baseStyles = clsx(styles?.base, className);

  const getSnippetProps = useCallback<PropGetter>(
    () => ({
      className: slots.base({
        class: baseStyles,
      }),
      ...otherProps,
    }),
    [slots, baseStyles, isMultiLine, otherProps],
  );

  const onCopy = useCallback(() => {
    if (disableCopy) {
      return;
    }
    let value = "";

    if (typeof children === "string") {
      value = children;
    } else if (Array.isArray(children)) {
      value = children.join("\n");
    }

    copy(value);
    onCopyProp?.(value);
  }, [copy, disableCopy, onCopyProp, children]);

  return {
    Component,
    as,
    domRef,
    children,
    slots,
    styles,
    copied,
    onCopy,
    copyIcon,
    checkIcon,
    symbolBefore,
    isMultiLine,
    isFocusVisible,
    focusProps,
    hideCopyButton,
    disableCopy,
    disableTooltip,
    hideSymbol,
    tooltipProps,
    getSnippetProps,
  };
}

export type UseSnippetReturn = ReturnType<typeof useSnippet>;
