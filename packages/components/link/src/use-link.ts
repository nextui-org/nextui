import type {AriaLinkProps} from "@react-types/link";

import {useMemo} from "react";
import {useFocusRing} from "@react-aria/focus";
import {HTMLNextUIProps, CSS, getTokenValue} from "@nextui-org/system";
import {isNormalColor} from "@nextui-org/shared-utils";
import {useIsMounted} from "@nextui-org/use-is-mounted";
export interface Props extends HTMLNextUIProps<"a"> {
  /**
   * The link's color.
   * @default "$colors$link"
   */
  color?: CSS["color"];
  /**
   * Whether the link should have a underline. text-decoration: underline.
   * @default false
   */
  underline?: boolean;
  /**
   * Whether the link should be displayed as a separate block.
   */
  block?: boolean;
  /**
   * Whether the link opacity && box-shadow should be animated.
   * @default false
   */
  animated?: boolean;
  /**
   * Whether the link should show an icon.
   * @default false
   */
  isExternal?: boolean;
}

export type UseLinkProps = Props & AriaLinkProps;

export function useLink(props: UseLinkProps) {
  const {
    isExternal = false,
    color = "$link",
    block = false,
    animated = true,
    autoFocus,
    ...otherProps
  } = props;

  const {isFocusVisible, focusProps} = useFocusRing({autoFocus});

  const [, isMounted] = useIsMounted({rerender: true});

  const linkCss = useMemo(() => {
    const isNormal = isNormalColor(color as string);

    const linkColor = isNormal ? `$${color}` : color;
    const backgroundColor = isNormal
      ? `${linkColor}Light`
      : isMounted
      ? getTokenValue("colors", color as string, 0.2)
      : "transparent";

    if (block) {
      return {
        color: linkColor,
        padding: "$2 $4",
        borderRadius: "$base",
        "&:hover": {
          backgroundColor,
        },
      };
    }

    return {color: linkColor};
  }, [color, block, isMounted]);

  return {linkCss, focusProps, isExternal, animated, isFocusVisible, ...otherProps};
}

export type UseLinkReturn = ReturnType<typeof useLink>;
