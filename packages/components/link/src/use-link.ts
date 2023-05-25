import type {AriaLinkProps} from "@react-types/link";
import type {LinkVariantProps} from "@nextui-org/theme";

import {link} from "@nextui-org/theme";
import {useLink as useAriaLink} from "@react-aria/link";
import {HTMLNextUIProps, mapPropsVariants, PropGetter} from "@nextui-org/system";
import {useDOMRef} from "@nextui-org/dom-utils";
import {useFocusRing} from "@react-aria/focus";
import {dataAttr, ReactRef} from "@nextui-org/shared-utils";
import {useMemo} from "react";
import {mergeProps} from "@react-aria/utils";

interface Props extends HTMLNextUIProps<"a">, LinkVariantProps {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLAnchorElement | null>;
  /**
   * Whether the link is external.
   * @default false
   */
  isExternal?: boolean;
  /**
   * Whether to show the icon when the link is external.
   * @default false
   */
  showAnchorIcon?: boolean;
  /**
   * The icon to display right after the link.
   * @default <LinkIcon />
   */
  anchorIcon?: React.ReactNode;
}

export type UseLinkProps = Props & AriaLinkProps;

export function useLink(originalProps: UseLinkProps) {
  const [props, variantProps] = mapPropsVariants(originalProps, link.variantKeys);

  const {
    ref,
    as,
    children,
    anchorIcon,
    isExternal = false,
    showAnchorIcon = false,
    autoFocus = false,
    className,
    ...otherProps
  } = props;

  const Component = as || "a";

  const domRef = useDOMRef(ref);

  const {linkProps} = useAriaLink({...otherProps, elementType: `${as}`}, domRef);

  const {isFocused, isFocusVisible, focusProps} = useFocusRing({
    autoFocus,
  });

  if (isExternal) {
    otherProps.rel = otherProps.rel ?? "noopener noreferrer";
    otherProps.target = otherProps.target ?? "_blank";
  }

  /**  
   *  if (as !== "a") {
   *    otherProps.role = "link";
   *  }
   *  This logic handled by @react-aria/link.
   *  See: https://github.com/adobe/react-spectrum/blob/5a3315f560071087cacf846bd2a86d8f47692446/packages/%40react-aria/link/src/useLink.ts#L55
   */

  const classNames = useMemo(
    () =>
      link({
        ...variantProps,
        className,
      }),
    [...Object.values(variantProps), className],
  );

  const getLinkProps: PropGetter = (props = {}) => {
    return {
      ref: domRef,
      className: classNames,
      "data-focused": dataAttr(isFocused),
      "data-focus-visible": dataAttr(isFocusVisible),
      ...mergeProps(focusProps, linkProps, otherProps, props),
    };
  };

  return {Component, children, anchorIcon, showAnchorIcon, getLinkProps};
}

export type UseLinkReturn = ReturnType<typeof useLink>;
