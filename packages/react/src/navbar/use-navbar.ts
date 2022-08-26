import type {CSS} from "../theme";
import type {NormalWeights} from "../utils/prop-types";

import {useMemo, useState} from "react";

import {addColorAlpha} from "../utils/color";
import {arrayToObject} from "../utils/object";
import {HTMLNextUIProps} from "../utils/system";
import useScrollPosition from "../use-scroll-position";
import {globalCss} from "../theme/stitches.config";
import useTheme from "../use-theme";

import {NavbarVariantsProps} from "./navbar.styles";

interface Props extends Omit<HTMLNextUIProps<"nav">, keyof NavbarVariantsProps> {
  children?: React.ReactNode | React.ReactNode[];
  /**
   * The parent element where the navbar is placed within.
   * This is used to determine the scroll position and whether the navbar should be hidden or not.
   * @default `window`
   */
  parentRef?: React.RefObject<HTMLElement>;
  /**
   * The height of the navbar.
   * @default "76px" and "54px" for "isCompact=true".
   */
  height?: number | string;
  /**
   * The border weight of the bordered navbar.
   *  @default light
   */
  borderWeight?: NormalWeights;
  /**
   * Whether the navbar should be bordered.
   * @default false
   */
  isBordered?: boolean;
  /**
   * Whether the navbar should hide on scroll or not.
   * @default false
   */
  shouldHideOnScroll?: boolean;
  /**
   * Whether the navbar parent scroll event should be listened to or not.
   * @default false
   */
  disableScrollHandler?: boolean;
  /**
   * The css object of the navbar container.
   */
  containerCss?: CSS;

  /**
   * The scroll event handler for the navbar. The event fires when the navbar parent element is scrolled.
   * it only works if `disableScrollHandler` is set to `false` or `shouldHideOnScroll` is set to `true`.
   */
  onScrollPositionChange?: (scrollPosition: number) => void;
}

export type UseNavbarProps = Props & NavbarVariantsProps;

/**
 * @internal
 */
export function useNavbar(props: UseNavbarProps = {}) {
  const {
    css,
    containerCss,
    parentRef,
    isBordered,
    variant = "static",
    height = "76px",
    borderWeight = "light",
    shouldHideOnScroll = false,
    disableScrollHandler = false,
    onScrollPositionChange,
    disableBlur: disableBlurProp = false,
    className,
    ...otherProps
  } = props;

  const [sticky, setSticky] = useState(false);
  const [isCollapseOpen, setIsCollapseOpen] = useState(false);

  const {theme} = useTheme();

  const borderWeightValue = useMemo(() => {
    if (!isBordered) {
      return "0px";
    }

    return `$borderWeights$${borderWeight}`;
  }, [isBordered, borderWeight]);

  const disableBlur = useMemo(
    () => disableBlurProp || isCollapseOpen,
    [disableBlurProp, isCollapseOpen],
  );

  const navbarHeight = useMemo(() => {
    if (typeof height === "number") {
      return `${height}px`;
    }

    return height;
  }, [height]);

  const navbarGlobalCss = globalCss({
    ":root": {
      $$navbarHeight: navbarHeight,
      $$navbarCompactHeight: "calc($$navbarHeight * 0.7)",
      $$navbarTextColor: "$colors$text",
      $$navbarBackgroundColor: "$colors$background",
      $$navbarBlurBackgroundColor: "$colors$backgroundAlpha",
      $$navbarItemMaxHeight: "calc($$navbarHeight * 0.5)",
      $$navbarCompactItemMaxHeight: "calc($$navbarHeight * 0.5)",
      $$navbarBorderColor: "$colors$border",
      $$navbarBorderRadius: "$radii$lg",
      $$navbarPadding: "$space$10",
      $$navbarFloatingMargin: "$space$10",
      $$navbarContainerMaxWidth: "$breakpoints$lg",
      $$navbarShadow: "$shadows$md",
      $$navbarBorderWeight: borderWeightValue,
      $$navbarBlur: "10px",
    },
  });

  navbarGlobalCss();

  useScrollPosition({
    elementRef: parentRef,
    enabled: shouldHideOnScroll || !disableScrollHandler,
    callback: ({prevPos, currPos}) => {
      onScrollPositionChange?.(currPos.y);
      if (shouldHideOnScroll) {
        setSticky((prevSticky) => {
          const next = currPos.y > prevPos.y;

          return next !== prevSticky ? next : prevSticky;
        });
      }
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
  }, [css, theme?.colors, variant, shouldHideOnScroll, sticky]);

  return {
    css,
    variant,
    sticky,
    isBordered,
    containerCss,
    navbarCss,
    parentRef,
    borderWeight,
    shouldHideOnScroll,
    disableBlur,
    isCollapseOpen,
    setIsCollapseOpen,
    className,
    otherProps,
  };
}

export type UseNavbarReturn = ReturnType<typeof useNavbar>;
