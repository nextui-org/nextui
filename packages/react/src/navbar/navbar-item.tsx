import React, {useMemo, useEffect} from "react";
import {useHover} from "@react-aria/interactions";
import {mergeProps} from "@react-aria/utils";
import {useId} from "@react-aria/utils";

import {HTMLNextUIProps, forwardRef} from "../utils/system";
import {useDOMRef} from "../utils/dom";
import {arrayToObject} from "../utils/object";
import clsx from "../utils/clsx";
import {__DEV__} from "../utils/assertion";

import {useNavbarContentContext} from "./navbar-content-context";
import {StyledNavbarItem, NavbarItemVariantsProps} from "./navbar.styles";

export interface Props
  extends Omit<HTMLNextUIProps<"li">, keyof NavbarItemVariantsProps | "color"> {
  children?: React.ReactNode | React.ReactNode[];
  isDisabled?: boolean;
}

export type NavbarItemProps = Props & NavbarItemVariantsProps;

const NavbarItem = forwardRef<NavbarItemProps, "li">((props, ref) => {
  const {
    id,
    css,
    children,
    variant,
    activeColor,
    isActive,
    underlineHeight,
    onMouseOver,
    onMouseLeave,
    isDisabled,
    className,
    ...otherProps
  } = props;

  const contentProps = useNavbarContentContext();
  const domRef = useDOMRef(ref);

  const itemVariant = variant || contentProps?.variant;
  const stringVariant = itemVariant?.toString();
  const isHighlightVariant = stringVariant.includes?.("highlight");
  const isHighlightSolidVariant = stringVariant.includes?.("highlight-solid");

  const {hoverProps, isHovered} = useHover({isDisabled});
  const itemId = useId(id);

  useEffect(() => {
    if (!domRef.current) {
      return;
    }
    if (contentProps && contentProps?.enableCursorHighlight && isActive && isHighlightVariant) {
      contentProps.updateActiveItem(domRef?.current);
    }
  }, [domRef, isHighlightVariant, isActive]);

  const isActiveAndHighlighted = useMemo(() => {
    if (!contentProps) {
      return false;
    }

    return contentProps.highlightedItem?.id === itemId;
  }, [itemId, contentProps]);

  const shouldUseActiveTextColor = useMemo(() => {
    if (
      !isActiveAndHighlighted &&
      contentProps?.enableCursorHighlight &&
      isHighlightSolidVariant &&
      itemId === contentProps?.activeItem?.id
    ) {
      return true;
    }

    return false;
  }, [contentProps, itemId, isActiveAndHighlighted, isHighlightSolidVariant]);

  const itemCss = useMemo(() => {
    const customCss = [];
    const isStringChildren = typeof children === "string";
    const isHighlightSolidVariant = stringVariant.includes?.("highlight-solid");

    if (!contentProps) {
      customCss.push({
        $$navbarContentItemGap: "$space$8",
      });
    }

    if (isHighlightVariant) {
      customCss.push({
        dflex: "center",
        height: "$$navbarItemMaxHeight",
      });

      if (isStringChildren) {
        customCss.push({
          px: "calc($$navbarContentItemHorizontalPadding * 0.5)",
        });
      } else {
        customCss.push({
          "*:first-child": {
            size: "100%",
            px: "calc($$navbarContentItemHorizontalPadding * 0.5)",
          },
        });
      }
    }

    if (
      isHighlightVariant &&
      stringVariant.includes?.("rounded") &&
      !contentProps.enableCursorHighlight
    ) {
      customCss.push({
        "&:before": {
          borderRadius: "$pill",
        },
      });
    }

    if (contentProps.enableCursorHighlight) {
      customCss.push({
        "&:before": {
          display: "none",
        },
      });
    }

    if (isActive && !isHighlightVariant) {
      customCss.push({
        $$navbarItemFontWeight: "$fontWeights$semibold",
      });
    }

    if (isHovered && contentProps.enableCursorHighlight) {
      if (isHighlightVariant) {
        customCss.push({
          color: "$$navbarItemHighlightTextColor",
        });
      }
      if (isHighlightSolidVariant) {
        customCss.push({
          color: "$$navbarItemHighlightSolidTextColor",
        });
      }
    }

    if (shouldUseActiveTextColor) {
      customCss.push({
        color: "$$navbarItemActiveColor",
      });
    }

    const customCssObject = arrayToObject(customCss);

    return {
      ...customCssObject,
      ...css,
    };
  }, [
    children,
    css,
    contentProps,
    stringVariant,
    shouldUseActiveTextColor,
    isActive,
    isHovered,
    isHighlightVariant,
  ]);

  const handleOnMouseLeave = (event: React.MouseEvent<HTMLLIElement>) => {
    if (
      !contentProps?.resetHighlight ||
      !contentProps.enableCursorHighlight ||
      !isHighlightVariant
    ) {
      onMouseLeave?.(event);

      return;
    }

    contentProps.resetHighlight();
    onMouseLeave?.(event);
  };

  const handleOnMouseOver = (event: React.MouseEvent<HTMLLIElement>) => {
    if (!contentProps?.repositionHighlight) {
      onMouseOver?.(event);

      return;
    }

    contentProps.repositionHighlight(event, domRef?.current);
    onMouseOver?.(event);
  };

  return (
    <StyledNavbarItem
      ref={domRef}
      activeColor={activeColor || contentProps?.activeColor}
      className={clsx("nextui-navbar-item", className)}
      css={itemCss}
      id={itemId}
      isActive={isActive}
      underlineHeight={underlineHeight || contentProps?.underlineHeight}
      variant={itemVariant}
      onMouseLeave={handleOnMouseLeave}
      onMouseOver={handleOnMouseOver}
      {...mergeProps(hoverProps, otherProps)}
    >
      {children}
    </StyledNavbarItem>
  );
});

if (__DEV__) {
  NavbarItem.displayName = "NextUI.NavbarItem";
}

NavbarItem.toString = () => ".nextui-navbar-item";

export default NavbarItem;
