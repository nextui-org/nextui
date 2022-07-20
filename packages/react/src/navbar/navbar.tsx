import React, {useMemo, useState} from "react";

import {HTMLNextUIProps, forwardRef} from "../utils/system";
import {useDOMRef} from "../utils/dom";
import clsx from "../utils/clsx";
import {CSS} from "../theme/stitches.config";
import useTheme from "../use-theme";
import {addColorAlpha} from "../utils/color";
import {__DEV__} from "../utils/assertion";
import useScrollPosition from "../use-scroll-position";

import {StyledNavbar, StyledNavbarContainer, NavbarVariantsProps} from "./navbar.styles";
import NavbarBrand from "./navbar-brand";
import NavbarContent from "./navbar-content";
import NavbarItem from "./navbar-item";
import NavbarLink from "./navbar-link";

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

export type NavbarProps = Props & NavbarVariantsProps;

const Navbar = forwardRef<NavbarProps, "nav">((props, ref) => {
  const {
    children,
    variant = "static",
    className,
    css,
    containerCss,
    parentRef,
    shouldHideOnScroll = false,
    ...otherProps
  } = props;

  const [sticky, setSticky] = useState(false);

  const {theme, isDark} = useTheme();
  const domRef = useDOMRef(ref);

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

    const customCssObject = customCss.reduce((acc, css) => {
      return {...acc, ...css};
    }, {});

    return {
      ...customCssObject,
      ...css,
    };
  }, [css, isDark, theme?.colors, variant, shouldHideOnScroll, sticky]);

  return (
    <StyledNavbar
      ref={domRef}
      className={clsx("nextui-navbar", className)}
      css={navbarCss}
      variant={variant}
      {...otherProps}
    >
      <StyledNavbarContainer className="nextui-navbar-container" css={containerCss}>
        {children}
      </StyledNavbarContainer>
    </StyledNavbar>
  );
});

if (__DEV__) {
  Navbar.displayName = "NextUI.Navbar";
}

Navbar.toString = () => ".nextui-navbar";

type NavbarComponent<P = {}> = React.FC<P> & {
  Brand: typeof NavbarBrand;
  Content: typeof NavbarContent;
  Item: typeof NavbarItem;
  Link: typeof NavbarLink;
};

export default Navbar as NavbarComponent<NavbarProps>;
