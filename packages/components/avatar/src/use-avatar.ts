import type {AriaLinkProps} from "@react-types/link";
import type {LinkVariantProps} from "@nextui-org/theme";

import {useLink as useAriaLink} from "@react-aria/link";
import {link, twMerge} from "@nextui-org/theme";
import {HTMLNextUIProps} from "@nextui-org/system";
import {useDOMRef} from "@nextui-org/dom-utils";
import {ReactRef} from "@nextui-org/shared-utils";
import {useMemo} from "react";

export interface Props extends HTMLNextUIProps<"a">, LinkVariantProps {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLAnchorElement | null>;
}

export type UseAvatarProps = Props & AriaLinkProps;

export function useAvatar(props: UseAvatarProps) {
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

  const {linkProps} = useAriaLink({...otherProps, elementType: `${as}`}, domRef);

  if (isExternal) {
    otherProps.rel = otherProps.rel ?? "noopener";
    otherProps.target = otherProps.target ?? "_blank";
  }

  const classes = useMemo(
    () =>
      twMerge(
        link({
          color,
          size,
          isUnderline,
          isBlock,
          isDisabled,
          disableAnimation,
        }),
        className,
      ),
    [color, size, isUnderline, isBlock, isDisabled, disableAnimation, className],
  );

  return {as, classes, domRef, linkProps, showAnchorIcon, isDisabled, ...otherProps};
}

export type UseLinkReturn = ReturnType<typeof useLink>;
