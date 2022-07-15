import {styled, VariantProps} from "../theme/stitches.config";

export const StyledBaseNavbarItem = styled("li", {
  mb: 0,
  display: "flex",
  alignItems: "center",
  listStyleType: "none",
  lineHeight: "inherit",
});

export const StyledBaseNavbarList = styled("ul", {
  m: 0,
  listStyle: "none",
  lineHeight: "$xs",
  li: {
    mb: 0,
  },
});

export const StyledNavbarBrand = styled("span", {
  display: "flex",
  flexWrap: "nowrap",
  flexDirection: "row",
  justifyContent: "flex-start",
  bg: "transparent",
  alignItems: "center",
  textDecoration: "none",
  fontSize: "$base",
  whiteSpace: "nowrap",
  boxSizing: "border-box",
});

export const StyledNavbarItem = styled(StyledBaseNavbarItem, {
  fontSize: "inherit",
});

export const StyledNavbarContent = styled(StyledBaseNavbarList, {
  $$navbarContentItemGap: "$space$8",
  d: "flex",
  height: "100%",
  flexWrap: "nowrap",
  alignItems: "center",
  gap: "$$navbarContentItemGap",
});

export const StyledNavbarContainer = styled("div", {
  width: "100%",
  height: "$$navbarHeight",
  minHeight: "$$navbarHeight",
  display: "flex",
  flexWrap: "nowrap",
  justifyContent: "space-between",
  alignItems: "center",
  position: "relative",
  boxSizing: "border-box",
  px: "$$navbarPadding",
  bg: "$$navbarBackgroundColor",
  color: "$$navbarTextColor",
  maxW: "$$navbarContainerMaxWidth",
  "@xsMax": {
    $$navbarPadding: "$space$6",
    $$navbarFloatingMargin: "$space$6",
  },
});

export const StyledNavbar = styled("nav", {
  // variables
  $$navbarBackgroundColor: "$colors$background",
  $$navbarBlurBackgroundColor: "$colors$backgroundAlpha",
  $$navbarTextColor: "$colors$text",
  $$navbarHeight: "76px",
  $$navbarBorderColor: "$colors$border",
  $$navbarBorderRadius: "$radii$lg",
  $$navbarPadding: "$space$10",
  $$navbarFloatingMargin: "$space$10",
  $$navbarContainerMaxWidth: "$breakpoints$lg",
  $$navbarShadow: "$shadows$md",
  $$navbarBlur: "10px",
  // styles
  width: "100%",
  dflex: "center",
  position: "relative",
  height: "auto",
  variants: {
    variant: {
      static: {
        position: "static",
      },
      sticky: {
        top: 0,
        right: 0,
        left: 0,
        position: "sticky",
        zIndex: "$2",
      },
      floating: {
        top: 0,
        right: 0,
        left: 0,
        position: "sticky",
        zIndex: "$2",
        "@safari": {
          top: "-5px",
        },
        [`& ${StyledNavbarContainer}`]: {
          mt: "calc($$navbarFloatingMargin * 0.5)",
          mx: "$$navbarFloatingMargin",
          borderRadius: "$$navbarBorderRadius",
        },
      },
    },
    maxWidth: {
      xs: {
        $$navbarContainerMaxWidth: "$breakpoints$xs",
      },
      sm: {
        $$navbarContainerMaxWidth: "$breakpoints$sm",
      },
      md: {
        $$navbarContainerMaxWidth: "$breakpoints$md",
      },
      lg: {
        $$navbarContainerMaxWidth: "$breakpoints$lg",
      },
      xl: {
        $$navbarContainerMaxWidth: "$breakpoints$xl",
      },
      fluid: {
        $$navbarContainerMaxWidth: "100%",
      },
    },
    isBordered: {
      true: {
        [`& ${StyledNavbarContainer}`]: {
          borderBottom: "$$navbarBorderWeight solid $$navbarBorderColor",
        },
      },
    },
    isCompact: {
      true: {
        $$navbarHeight: "54px",
        $$navbarBorderRadius: "$radii$md",
      },
    },
    disableShadow: {
      false: {
        boxShadow: "$$navbarShadow",
        clipPath: "inset(0px 0px calc($$navbarHeight*-1) 0px)",
      },
    },
    disableBlur: {
      false: {
        "@supports ((-webkit-backdrop-filter: none) or (backdrop-filter: none))": {
          [`& ${StyledNavbarContainer}`]: {
            bg: "$$navbarBlurBackgroundColor",
            backdropFilter: "saturate(180%) blur($$navbarBlur)",
          },
        },
      },
    },
    borderWeight: {
      light: {
        $$navbarBorderWeight: "$borderWeights$light",
      },
      normal: {
        $$navbarBorderWeight: "$borderWeights$normal",
      },
      bold: {
        $$navbarBorderWeight: "$borderWeights$bold",
      },
      extrabold: {
        $$navbarBorderWeight: "$borderWeights$extrabold",
      },
      black: {
        $$navbarBorderWeight: "$borderWeights$black",
      },
    },
  },
  compoundVariants: [
    /**
     * @isBordered true
     * @variant floating
     */
    {
      isBordered: true,
      variant: "floating",
      css: {
        [`& ${StyledNavbarContainer}`]: {
          border: "$$navbarBorderWeight solid $$navbarBorderColor",
        },
      },
    },
    /**
     * @variant floating
     * @disableShadow true
     */
    {
      variant: "floating",
      disableShadow: false,
      css: {
        boxShadow: "none",
        clipPath: "none",
        [`& ${StyledNavbarContainer}`]: {
          boxShadow: "$$navbarShadow",
        },
      },
    },
  ],
  defaultVariants: {
    variant: "static",
    borderWeight: "light",
    maxWidth: "lg",
    isBordered: false,
    disableShadow: false,
    disableBlur: false,
  },
});

export type NavbarVariantsProps = VariantProps<typeof StyledNavbar>;
export type NavbarContentVariantsProps = VariantProps<typeof StyledNavbarContent>;
export type NavbarItemVariantsProps = VariantProps<typeof StyledNavbarItem>;
