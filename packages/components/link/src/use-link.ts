import type {AriaLinkProps} from "@react-types/link";
import type {StyledLinkProps} from "@nextui-org/theme";

import {useLink as useAriaLink} from "@react-aria/link";
import {HTMLNextUIProps} from "@nextui-org/system";
import {useDOMRef} from "@nextui-org/dom-utils";
import {ReactRef} from "@nextui-org/shared-utils";

export interface Props extends HTMLNextUIProps<"a">, StyledLinkProps {
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
   * The icon to display when the link is external.
   * @default <LinkIcon />
   */
  externalIcon?: React.ReactNode;
}

export type UseLinkProps = Props & AriaLinkProps;

export function useLink(props: UseLinkProps) {
  const {ref, as = "a", isExternal = false, ...otherProps} = props;

  const domRef = useDOMRef(ref);

  const {linkProps} = useAriaLink({...otherProps, elementType: `${as}`}, domRef);

  if (isExternal) {
    otherProps.rel = otherProps.rel ?? "noopener";
    otherProps.target = otherProps.target ?? "_blank";
  }

  return {as, domRef, linkProps, isExternal, ...otherProps};
}

export type UseLinkReturn = ReturnType<typeof useLink>;
