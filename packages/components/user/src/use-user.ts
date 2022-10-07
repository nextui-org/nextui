import type {AvatarProps} from "@nextui-org/avatar";

import {ReactNode, useMemo} from "react";
import {useFocusRing} from "@react-aria/focus";
import {HTMLNextUIProps} from "@nextui-org/system";
import {IFocusRingAria} from "@nextui-org/dom-utils";

export interface UseUserProps extends HTMLNextUIProps<"div", AvatarProps> {
  /**
   * The user name.
   */
  name: ReactNode | string;
  /**
   * The user information, like email, phone, etc.
   */
  description?: ReactNode | string;
}

export function useUser(props: UseUserProps) {
  const {as, className, css, name, description, ...otherProps} = props;

  const {isFocusVisible, focusProps}: IFocusRingAria<UseUserProps> = useFocusRing();

  const userCss = useMemo(() => {
    if (as === "button") {
      return {
        // reset button styles
        p: 0,
        m: 0,
        borderRadius: "$xs",
        background: "none",
        appearance: "none",
        outline: "none",
        border: "none",
        cursor: "pointer",
      };
    }

    return {};
  }, [as]);

  return {
    as,
    userCss,
    className,
    css,
    name,
    description,
    isFocusVisible,
    focusProps,
    ...otherProps,
  };
}

export type UseUserReturn = ReturnType<typeof useUser>;
