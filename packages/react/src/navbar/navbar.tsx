import React, {useMemo} from "react";

import {HTMLNextUIProps, forwardRef} from "../utils/system";
import {useDOMRef} from "../utils/dom";
import clsx from "../utils/clsx";
import {CSS} from "../theme/stitches.config";
import useTheme from "../use-theme";
import {addColorAlpha} from "../utils/color";
import {__DEV__} from "../utils/assertion";

import {StyledNavbar, StyledNavbarContainer, NavbarVariantsProps} from "./navbar.styles";
import NavbarBrand from "./navbar-brand";
import NavbarContent from "./navbar-content";
import NavbarItem from "./navbar-item";
import NavbarLink from "./navbar-link";

interface Props extends Omit<HTMLNextUIProps<"nav">, keyof NavbarVariantsProps> {
  children?: React.ReactNode | React.ReactNode[];
  containerCss?: CSS;
}

export type NavbarProps = Props & NavbarVariantsProps;

const Navbar = forwardRef<NavbarProps, "nav">((props, ref) => {
  const {theme, isDark} = useTheme();
  const domRef = useDOMRef(ref);

  const {children, variant = "static", className, css, containerCss, ...otherProps} = props;

  const navbarCss = useMemo(() => {
    if (variant === "floating") {
      // linear gradient behind the navbar
      return {
        bg: `linear-gradient(180deg, ${addColorAlpha(
          theme?.colors?.background?.value,
          0.95,
        )} 44%, ${addColorAlpha(theme?.colors?.background?.value, 0.46)} 73%, ${addColorAlpha(
          theme?.colors?.background?.value,
          0,
        )})`,
        ...css,
      };
    }

    return css;
  }, [css, isDark, theme?.colors, variant]);

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
