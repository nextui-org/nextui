import {useMemo} from "react";
import {forwardRef, NextUI} from "@nextui-org/system";
import {Expand} from "@nextui-org/react-utils";
import {clsx, __DEV__} from "@nextui-org/shared-utils";
import {mergeProps} from "@react-aria/utils";

import {
  StyledCollapseItem,
  StyledCollapseItemHeading,
  StyledCollapseItemButton,
  StyledCollapseItemTitle,
  StyledCollapseItemIndicator,
} from "./collapse.styles";
import {UseCollapseItemProps, useCollapseItem} from "./use-collapse-item";

export interface CollapseItemProps<T extends object = {}>
  extends Omit<UseCollapseItemProps<T>, "ref"> {}

const CollapseItem = forwardRef<CollapseItemProps, "div">((props, ref) => {
  const {
    className,
    domRef,
    indicator,
    item,
    isOpen,
    isDisabled,
    isFocusVisible,
    buttonProps,
    regionProps,
    focusProps,
    ...otherProps
  } = useCollapseItem({
    ref,
    ...props,
  });

  const indicatorWrapper = useMemo(() => {
    return (
      <StyledCollapseItemIndicator
        aria-hidden="true"
        aria-label="collapse item indicator"
        className="nextui-collapse-item-indicator"
        isOpen={isOpen}
        role="img"
      >
        {indicator}
      </StyledCollapseItemIndicator>
    );
  }, [indicator]);

  const indicatorComponent = useMemo(() => {
    if (typeof item.props?.indicator === "function") {
      return item.props?.indicator({indicator, isOpen, isDisabled});
    }

    return indicatorWrapper;
  }, [item.props?.indicator, indicator, indicatorWrapper, isOpen, isDisabled]);

  return (
    <StyledCollapseItem
      className={clsx("nextui-collapse-item", className)}
      isDisabled={isDisabled}
      isOpen={isOpen}
      {...otherProps}
    >
      <StyledCollapseItemHeading className="nextui-collapse-item-heading">
        <StyledCollapseItemButton
          {...mergeProps(buttonProps, focusProps)}
          ref={domRef}
          className="nextui-collapse-item-button"
          disabled={isDisabled}
          isFocusVisible={isFocusVisible}
        >
          <StyledCollapseItemTitle className="nextui-collapse-item-title">
            {item.props?.title}
          </StyledCollapseItemTitle>
          {indicatorComponent}
        </StyledCollapseItemButton>
      </StyledCollapseItemHeading>
      <Expand isExpanded={isOpen}>
        <NextUI.Div {...regionProps} className="nextui-collapse-item-content">
          {item.props?.children}
        </NextUI.Div>
      </Expand>
    </StyledCollapseItem>
  );
});

if (__DEV__) {
  CollapseItem.displayName = "NextUI.CollapseItem";
}

CollapseItem.toString = () => ".nextui-collapse-item";

export default CollapseItem;
