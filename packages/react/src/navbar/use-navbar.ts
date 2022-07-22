import type {CSS} from "../theme";

import {useMemo, useState} from "react";

import useTheme from "../use-theme";
import {addColorAlpha} from "../utils/color";
import {arrayToObject} from "../utils/object";
import {HTMLNextUIProps} from "../utils/system";
import useScrollPosition from "../use-scroll-position";

import {NavbarVariantsProps} from "./navbar.styles";

interface Props extends Omit<HTMLNextUIProps<"nav">, keyof NavbarVariantsProps> {
  children?: React.ReactNode | React.ReactNode[];
  /**
   * Whether the navbar should hide on scroll or not.
   * @default false
   */
  shouldHideOnScroll?: boolean;
  /**
   * The parent element where the navbar is placed within.
   * This is used to determine the scroll position and whether the navbar should be hidden or not.
   * @default `window`
   */
  parentRef?: React.RefObject<HTMLElement>;
  /**
   * The css object of the navbar container.
   */
  containerCss?: CSS;
}

export type UseNavbarProps = Props & NavbarVariantsProps;

/**
 * @internal
 */
export function useNavbar(props: UseNavbarProps = {}) {
  const {
    css,
    variant = "static",
    containerCss,
    parentRef,
    shouldHideOnScroll = false,
    className,
    ...otherProps
  } = props;

  const [sticky, setSticky] = useState(false);
  const [isListOpen, setIsListOpen] = useState(false);

  const {theme, isDark} = useTheme();

  useScrollPosition({
    elementRef: parentRef,
    enabled: shouldHideOnScroll,
    callback: ({prevPos, currPos}) => {
      setSticky((prevSticky) => {
        const next = currPos.y > prevPos.y;

        return next !== prevSticky ? next : prevSticky;
      });
    },
  });

  const navbarCss = useMemo(() => {
    const customCss = [];

    if (variant === "floating") {
      // linear gradient behind the navbar
      customCss.push({
        bg: `linear-gradient(180deg, ${addColorAlpha(
          theme?.colors?.background?.value,
          0.95,
        )} 44%, ${addColorAlpha(theme?.colors?.background?.value, 0.46)} 73%, ${addColorAlpha(
          theme?.colors?.background?.value,
          0,
        )})`,
      });
    }

    if (shouldHideOnScroll) {
      customCss.push({
        position: "sticky",
        top: 0,
        right: 0,
        left: 0,
        transform: sticky ? "translateY(-100%)" : "translateY(0)",
        transition: "transform 400ms ease",
      });
    }

    const customCssObject = arrayToObject(customCss);

    return {
      ...customCssObject,
      ...css,
    };
  }, [css, isDark, theme?.colors, variant, shouldHideOnScroll, sticky]);

  return {
    css,
    variant,
    sticky,
    containerCss,
    navbarCss,
    parentRef,
    shouldHideOnScroll,
    isListOpen,
    setIsListOpen,
    className,
    otherProps,
  };
}

export type UseNavbarReturn = ReturnType<typeof useNavbar>;
