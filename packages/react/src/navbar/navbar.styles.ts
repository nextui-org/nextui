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
  d: "flex",
  bg: "transparent",
  justifyContent: "flex-start",
  alignItems: "center",
  textDecoration: "none",
  fontSize: "$base",
  whiteSpace: "nowrap",
  marginRight: "$$navbarContentItemSpace",
});

export const StyledNavbarItem = styled(StyledBaseNavbarItem, {
  fontSize: "inherit",
});

export const StyledNavbarContent = styled(StyledBaseNavbarList, {
  $$navbarContentItemSpace: "$space$8",
  d: "flex",
  size: "100%",
  flexWrap: "nowrap",
  alignItems: "center",
  variants: {
    placement: {
      start: {
        justifyContent: "flex-start",
        [`& ${StyledNavbarItem}`]: {
          mr: "$$navbarContentItemSpace",
        },
      },
      center: {
        justifyContent: "center",
        [`& ${StyledNavbarItem}`]: {
          mx: "$$navbarContentItemSpace",
        },
      },
      around: {
        justifyContent: "space-around",
      },
      between: {
        justifyContent: "space-between",
      },
      end: {
        justifyContent: "flex-end",
        [`& ${StyledNavbarItem}`]: {
          ml: "$$navbarContentItemSpace",
        },
      },
    },
  },
  defaultVariants: {
    placement: "center",
  },
});

export const StyledNavbarContainer = styled("div", {
  size: "100%",
  display: "flex",
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
  $$navbarTextColor: "$colors$text",
  $$navbarHeight: "76px",
  $$navbarBorderColor: "$colors$border",
  $$navbarBorderRadius: "$radii$lg",
  $$navbarPadding: "$space$10",
  $$navbarFloatingMargin: "$space$10",
  $$navbarContainerMaxWidth: "$breakpoints$lg",
  $$navbarShadow: "$shadows$md",
  // styles
  width: "100%",
  dflex: "center",
  position: "relative",
  height: "$$navbarHeight",
  minHeight: "$$navbarHeight",
  variants: {
    variant: {
      static: {},
      fixed: {},
      sticky: {},
      floating: {
        [`& ${StyledNavbarContainer}`]: {
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
    applyBackgroundContrast: {
      true: {
        $$navbarBackgroundColor: "$colors$backgroundContrast",
      },
    },
    isBordered: {
      true: {
        [`& ${StyledNavbarContainer}`]: {
          borderBottom: "$$navbarBorderWeight solid $$navbarBorderColor",
        },
      },
    },
    isInverted: {
      true: {},
    },
    isCompact: {
      true: {
        $$navbarHeight: "54px",
      },
    },
    enableShadow: {
      true: {
        boxShadow: "$$navbarShadow",
        clipPath: "inset(0px 0px calc($$navbarHeight*-1) 0px)",
      },
    },
    disableBlur: {
      true: {},
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
     * @enableShadow true
     */
    {
      variant: "floating",
      enableShadow: true,
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
    isInverted: false,
    enableShadow: true,
    disableBlur: false,
  },
});

export type NavbarVariantsProps = VariantProps<typeof StyledNavbar>;
export type NavbarContentVariantsProps = VariantProps<typeof StyledNavbarContent>;
export type NavbarItemVariantsProps = VariantProps<typeof StyledNavbarItem>;
