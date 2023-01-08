import type {AriaLinkProps} from "@react-types/link";
import type {StyledLinkProps} from "@nextui-org/theme";

import {useFocusRing} from "@react-aria/focus";
import {HTMLNextUIProps} from "@nextui-org/system";
export interface Props extends HTMLNextUIProps<"a">, StyledLinkProps {
  isExternal?: boolean;
}

export type UseLinkProps = Props & AriaLinkProps;

export function useLink(props: UseLinkProps) {
  const {isExternal = false, autoFocus, ...otherProps} = props;

  const {isFocusVisible, focusProps} = useFocusRing({autoFocus});

  return {focusProps, isExternal, isFocusVisible, ...otherProps};
}

export type UseLinkReturn = ReturnType<typeof useLink>;
