import {styled, VariantProps} from "../theme/stitches.config";
import {cssFocusVisible, cssHideShowIn} from "../theme/shared-css";

const itemColors = {
  default: {
    $$navbarItemActiveColor: "$colors$link",
    $$navbarItemHighlightBackgroundColor: "$colors$primaryLight",
    $$navbarItemHighlightTextColor: "$colors$primaryLightContrast",
    $$navbarItemHighlightSolidBackgroundColor: "$colors$primary",
    $$navbarItemHighlightSolidTextColor: "$colors$primarySolidContrast",
  },
  neutral: {
    $$navbarItemActiveColor: "$colors$neutral",
    $$navbarItemHighlightBackgroundColor: "$colors$neutralLight",
    $$navbarItemHighlightTextColor: "$colors$text",
    $$navbarItemHighlightSolidBackgroundColor: "$colors$neutral",
    $$navbarItemHighlightSolidTextColor: "$colors$neutralSolidContrast",
  },
  primary: {
    $$navbarItemActiveColor: "$colors$primary",
    $$navbarItemHighlightBackgroundColor: "$colors$primaryLight",
    $$navbarItemHighlightTextColor: "$colors$primaryLightContrast",
    $$navbarItemHighlightSolidBackgroundColor: "$colors$primary",
    $$navbarItemHighlightSolidTextColor: "$colors$primarySolidContrast",
  },
  secondary: {
    $$navbarItemActiveColor: "$colors$secondary",
    $$navbarItemHighlightBackgroundColor: "$colors$secondaryLight",
    $$navbarItemHighlightTextColor: "$colors$secondaryLightContrast",
    $$navbarItemHighlightSolidBackgroundColor: "$colors$secondary",
    $$navbarItemHighlightSolidTextColor: "$colors$secondarySolidContrast",
  },
  success: {
    $$navbarItemActiveColor: "$colors$success",
    $$navbarItemHighlightBackgroundColor: "$colors$successLight",
    $$navbarItemHighlightTextColor: "$colors$successLightContrast",
    $$navbarItemHighlightSolidBackgroundColor: "$colors$success",
    $$navbarItemHighlightSolidTextColor: "$colors$successSolidContrast",
  },
  warning: {
    $$navbarItemActiveColor: "$colors$warning",
    $$navbarItemHighlightBackgroundColor: "$colors$warningLight",
    $$navbarItemHighlightTextColor: "$colors$warningLightContrast",
    $$navbarItemHighlightSolidBackgroundColor: "$colors$warning",
    $$navbarItemHighlightSolidTextColor: "$colors$warningSolidContrast",
  },
  error: {
    $$navbarItemActiveColor: "$colors$error",
    $$navbarItemHighlightBackgroundColor: "$colors$errorLight",
    $$navbarItemHighlightTextColor: "$colors$errorLightContrast",
    $$navbarItemHighlightSolidBackgroundColor: "$colors$error",
    $$navbarItemHighlightSolidTextColor: "$colors$errorSolidContrast",
  },
};

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

export const StyledNavbarCollapseItem = styled(StyledBaseNavbarItem, {
  opacity: 0,
  pb: "20px",
  transformOrigin: "top",
  fontSize: "3rem",
  variants: {
    disableAnimation: {
      true: {
        transition: "none",
      },
    },
  },
});

export const StyledNavbarCollapseWrapper = styled(StyledBaseNavbarList, {
  py: "$8",
  px: "$$navbarPadding",
  overflowY: "scroll",
  maxHeight: "100%",
});

export const StyledNavbarCollapse = styled(
  "div",
  {
    $$navbarListColor: "$colors$text",
    $$navbarListBackgroundColor: "$colors$background",
    $$navbarListBlurBackgroundColor: "$colors$backgroundAlpha",
    $$navbarListBlur: "16px",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    background: "$$navbarListBackgroundColor",
    width: "100%",
    height: "0px",
    zIndex: "$4",
    boxSizing: "border-box",
    overflow: "hidden",
    variants: {
      isOpen: {
        true: {
          top: "$$navbarHeight",
          pb: "$$navbarHeight",
          height: "100vh",
        },
      },
      disableBlur: {
        false: {
          "@supports ((-webkit-backdrop-filter: none) or (backdrop-filter: none))": {
            bg: "$$navbarListBlurBackgroundColor",
            backdropFilter: "saturate(180%) blur($$navbarListBlur)",
            "@safari": {
              [`& ${StyledNavbarCollapseWrapper}`]: {
                bg: "$$navbarListBlurBackgroundColor",
                backdropFilter: "saturate(180%) blur($$navbarListBlur)",
              },
            },
          },
        },
      },
      disableAnimation: {
        true: {
          [`& ${StyledNavbarCollapseItem}`]: {
            transition: "none",
          },
        },
      },
    },
    defaultVariants: {
      disableBlur: "false",
    },
  },
  cssHideShowIn,
);

export const StyledNavbarToggleIconContainer = styled("div", {
  dflex: "center",
  flexDirection: "column",
  pointerEvents: "none",
  size: "22px",
  "& .line": {
    height: "1px",
    width: "100%",
    backgroundColor: "$$navbarTextColor",
    transition: "transform 0.3s ease",
    "&.top": {
      transform: "translateY(-4px) rotate(0deg)",
    },
    "&.bottom": {
      transform: "translateY(4px) rotate(0deg)",
    },
  },
  variants: {
    isExpanded: {
      true: {
        "& .line": {
          "&.top": {
            transform: "translateY(1px) rotate(45deg)",
          },
          "&.bottom": {
            transform: "translateY(0px) rotate(-45deg)",
          },
        },
      },
    },
  },
});

export const StyledNavbarToggle = styled(
  "button",
  {
    // reset button styles
    appearance: "none",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    p: "$2",
    transition: "box-shadow 0.25s ease 0s, opacity 0.25s ease 0s",
    variants: {
      isPressed: {
        true: {
          opacity: 0.7,
        },
      },
    },
  },
  cssHideShowIn,
  cssFocusVisible,
);

export const StyledNavbarBrand = styled(
  "span",
  {
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
  },
  cssHideShowIn,
);

export const StyledNavbarItem = styled(
  StyledBaseNavbarItem,
  {
    $$navbarItemFontSize: "inherit",
    $$navbarItemFontWeight: "$fontWeights$normal",
    fontSize: "$$navbarItemFontSize",
    fontWeight: "$$navbarItemFontWeight",
    position: "relative",
    "> *": {
      zIndex: "$2",
      fontSize: "inherit !important",
      fontWeight: "inherit !important",
    },
    "&:before": {
      opacity: 0,
      zIndex: "$1",
      content: '""',
      display: "block",
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      borderRadius: "$sm",
    },
    "&:after": {
      opacity: 0,
      zIndex: "$1",
      content: '""',
      display: "block",
      position: "absolute",
      left: "0",
      right: "0",
      bottom: "0",
      height: "$$navbarItemUnderlineHeight",
      borderRadius: "0px",
      background: "$$navbarItemActiveColor",
    },
    variants: {
      activeColor: itemColors,
      isActive: {
        true: {
          color: "$$navbarItemActiveColor",
          $$navbarItemFontWeight: "$fontWeights$semibold",
        },
      },
      variant: {
        default: {},
        underline: {
          color: "inherit",
          height: "100%",
        },
        "underline-rounded": {
          color: "inherit",
          height: "100%",
        },
        highlight: {},
        "highlight-solid": {},
        "highlight-rounded": {},
        "highlight-solid-rounded": {},
      },
      underlineHeight: {
        light: {
          $$navbarItemUnderlineHeight: "2px",
        },
        normal: {
          $$navbarItemUnderlineHeight: "4px",
        },
        bold: {
          $$navbarItemUnderlineHeight: "6px",
        },
        extrabold: {
          $$navbarItemUnderlineHeight: "8px",
        },
        black: {
          $$navbarItemUnderlineHeight: "10px",
        },
      },
      isDisabled: {
        true: {
          opacity: 0.5,
          cursor: "not-allowed",
        },
      },
    },
    compoundVariants: [
      /**
       * @isActive true
       * @variant underline
       */
      {
        isActive: true,
        variant: "underline",
        css: {
          color: "inherit",
          "&:after": {
            opacity: 1,
          },
        },
      },
      /**
       * @isActive true
       * @variant underline
       */
      {
        isActive: true,
        variant: "underline-rounded",
        css: {
          color: "inherit",
          "&:after": {
            opacity: 1,
            borderRadius: "calc($$navbarItemUnderlineHeight / 2)",
          },
        },
      },
      /**
       * @isActive true
       * @variant highlight
       */
      {
        isActive: true,
        variant: "highlight",
        css: {
          color: "$$navbarItemHighlightTextColor",
          "*:first-child": {
            color: "inherit",
          },
          "&:before": {
            opacity: 1,
            background: "$$navbarItemHighlightBackgroundColor",
          },
        },
      },
      /**
       * @isActive true
       * @variant highlight-solid
       */
      {
        isActive: true,
        variant: "highlight-solid",
        css: {
          color: "$$navbarItemHighlightSolidTextColor",
          "*:first-child": {
            color: "inherit",
          },
          "&:before": {
            opacity: 1,
            background: "$$navbarItemHighlightSolidBackgroundColor",
          },
        },
      },
      /**
       * @isActive true
       * @variant highlight-rounded
       */
      {
        isActive: true,
        variant: "highlight-rounded",
        css: {
          color: "$$navbarItemHighlightTextColor",
          "*:first-child": {
            color: "inherit",
          },
          "&:before": {
            opacity: 1,
            background: "$$navbarItemHighlightBackgroundColor",
          },
        },
      },
      /**
       * @isActive true
       * @variant highlight-solid
       */
      {
        isActive: true,
        variant: "highlight-solid-rounded",
        css: {
          color: "$$navbarItemHighlightSolidTextColor",
          "*:first-child": {
            color: "inherit",
          },
          "&:before": {
            opacity: 1,
            background: "$$navbarItemHighlightSolidBackgroundColor",
          },
        },
      },
    ],
    defaultVariants: {
      variant: "default",
      activeColor: "default",
      underlineHeight: "normal",
    },
  },
  cssHideShowIn,
);

// @internal
export const StyledCursorHighlight = styled(StyledBaseNavbarItem, {
  position: "absolute",
  top: "calc(50% - $$navbarItemMaxHeight * 0.5)",
  height: "$$navbarItemMaxHeight",
  background: "$neutralLight",
  borderRadius: "$sm",
  transition: "width 0.2s ease 0s, transform 0.2s ease 0s, opacity 0.2s ease 0s",
  variants: {
    color: itemColors,
    isHighlightVariant: {
      true: {
        background: "$$navbarItemHighlightBackgroundColor",
      },
    },
    isHighlightSolidVariant: {
      true: {
        background: "$$navbarItemHighlightSolidBackgroundColor",
      },
    },
    isRounded: {
      true: {
        borderRadius: "$pill",
      },
    },
  },
});

export const StyledNavbarContent = styled(
  StyledBaseNavbarList,
  {
    $$navbarContentItemGap: "$space$10",
    $$navbarContentItemHorizontalPadding: "$space$10",
    d: "flex",
    height: "100%",
    flexWrap: "nowrap",
    alignItems: "center",
    gap: "$$navbarContentItemGap",
    variants: {
      enableCursorHighlight: {
        true: {
          zIndex: "$2",
          position: "relative",
        },
      },
    },
  },
  cssHideShowIn,
);

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
  color: "inherit",
  px: "$$navbarPadding",
  bg: "$$navbarBackgroundColor",
  maxW: "$$navbarContainerMaxWidth",
  zIndex: "$5",
  "@xsMax": {
    $$navbarPadding: "$space$6",
    $$navbarFloatingMargin: "$space$6",
  },
});

export const StyledNavbar = styled("nav", {
  width: "100%",
  dflex: "center",
  position: "relative",
  height: "auto",
  color: "$$navbarTextColor",
  zIndex: "$2",
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
      },
      floating: {
        top: 0,
        right: 0,
        left: 0,
        position: "sticky",
        "@safari": {
          top: "-5px",
        },
        [`& ${StyledNavbarContainer}`]: {
          mt: "calc($$navbarFloatingMargin * 0.5)",
          mx: "$$navbarFloatingMargin",
          borderRadius: "$$navbarBorderRadius",
        },
        [`& ${StyledNavbarCollapseWrapper}`]: {
          px: "calc($$navbarFloatingMargin + $space$4)",
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
        $$navbarHeight: "$$navbarCompactHeight",
        $$navbarItemMaxHeight: "$$navbarCompactItemMaxHeight",
        $$navbarBorderRadius: "$radii$md",
      },
    },
    disableShadow: {
      false: {
        boxShadow: "$$navbarShadow",
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
        [`& ${StyledNavbarContainer}`]: {
          boxShadow: "$$navbarShadow",
        },
      },
    },
  ],
  defaultVariants: {
    variant: "static",
    maxWidth: "lg",
    isBordered: false,
    disableShadow: false,
    disableBlur: false,
  },
});

export type NavbarVariantsProps = VariantProps<typeof StyledNavbar>;
export type NavbarBrandVariantsProps = VariantProps<typeof StyledNavbarBrand>;
export type NavbarContentVariantsProps = VariantProps<typeof StyledNavbarContent>;
export type NavbarItemVariantsProps = VariantProps<typeof StyledNavbarItem>;
export type NavbarToggleVariantsProps = VariantProps<typeof StyledNavbarToggle>;
export type NavbarToggleIconContainerVariantsProps = VariantProps<
  typeof StyledNavbarToggleIconContainer
>;
export type NavbarCollapseVariantsProps = VariantProps<typeof StyledNavbarCollapse>;
export type NavbarCollapseItemVariantsProps = VariantProps<typeof StyledNavbarCollapseItem>;
