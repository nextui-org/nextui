import {forwardRef} from "@nextui-org/system";
import {clsx, __DEV__, Expand} from "@nextui-org/shared-utils";
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
            {item.props.title}
          </StyledCollapseItemTitle>
          <StyledCollapseItemIndicator
            aria-hidden="true"
            aria-label="collapse item indicator"
            className="nextui-collapse-item-indicator"
            role="img"
          >
            {isOpen ? "🔽" : "▶️"}️
          </StyledCollapseItemIndicator>
        </StyledCollapseItemButton>
      </StyledCollapseItemHeading>
      <Expand isExpanded={isOpen}>
        <div {...regionProps} className="nextui-collapse-item-content">
          {item.props.children}
        </div>
      </Expand>
    </StyledCollapseItem>
  );
});

if (__DEV__) {
  CollapseItem.displayName = "NextUI.CollapseItem";
}

CollapseItem.toString = () => ".nextui-collapse-item";

export default CollapseItem;
