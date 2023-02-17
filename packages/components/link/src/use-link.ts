import type {AriaLinkProps} from "@react-types/link";
import type {LinkVariantProps} from "@nextui-org/theme";

import {link} from "@nextui-org/theme";
import {useLink as useAriaLink} from "@react-aria/link";
import {HTMLNextUIProps} from "@nextui-org/system";
import {useDOMRef} from "@nextui-org/dom-utils";
import {ReactRef} from "@nextui-org/shared-utils";
import {useMemo} from "react";

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

export function useLink(props: UseLinkProps) {
  const {
    ref,
    as = "a",
    color,
    size,
    isUnderline,
    isBlock,
    disableAnimation,
    isExternal = false,
    showAnchorIcon = false,
    isDisabled = false,
    className,
    ...otherProps
  } = props;

  const domRef = useDOMRef(ref);
  const Component = as || "a";

  const {linkProps} = useAriaLink({...otherProps, elementType: `${as}`}, domRef);

  if (isExternal) {
    otherProps.rel = otherProps.rel ?? "noopener";
    otherProps.target = otherProps.target ?? "_blank";
  }

  if (as !== "a") {
    otherProps.role = "link";
  }

  const styles = useMemo(
    () =>
      link({
        color,
        size,
        isUnderline,
        isBlock,
        isDisabled,
        disableAnimation,
        className,
      }),
    [color, size, isUnderline, isBlock, isDisabled, disableAnimation, className],
  );

  return {Component, as, styles, domRef, linkProps, showAnchorIcon, ...otherProps};
}

export type UseLinkReturn = ReturnType<typeof useLink>;
