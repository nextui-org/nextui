import type {AriaLinkProps} from "@react-types/link";
import type {LinkVariantProps} from "@nextui-org/theme";

import {useLink as useAriaLink} from "@react-aria/link";
import {HTMLNextUIProps} from "@nextui-org/system";
import {useDOMRef} from "@nextui-org/dom-utils";
import {ReactRef} from "@nextui-org/shared-utils";

export interface Props extends HTMLNextUIProps<"a">, LinkVariantProps {
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
   * Whether the link is disabled.
   * @default false
   */
  isDisabled?: boolean;
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
    isExternal = false,
    showAnchorIcon = false,
    isDisabled = false,
    ...otherProps
  } = props;

  const domRef = useDOMRef(ref);

  const {linkProps} = useAriaLink({...otherProps, elementType: `${as}`}, domRef);

  if (isExternal) {
    otherProps.rel = otherProps.rel ?? "noopener";
    otherProps.target = otherProps.target ?? "_blank";
  }

  return {as, domRef, linkProps, showAnchorIcon, isDisabled, ...otherProps};
}

export type UseLinkReturn = ReturnType<typeof useLink>;
