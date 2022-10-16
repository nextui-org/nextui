import {forwardRef} from "@nextui-org/system";
import {clsx, __DEV__} from "@nextui-org/shared-utils";
import {mergeProps} from "@react-aria/utils";

import {StyledCollapseItem, StyledCollapseItemButton} from "./collapse.styles";
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
      <h2 className="collapse-item-heading">
        <StyledCollapseItemButton
          {...mergeProps(buttonProps, focusProps)}
          ref={domRef}
          className="collapse-item-button"
          disabled={isDisabled}
          isFocusVisible={isFocusVisible}
        >
          {item.props.title}
          <span
            aria-hidden="true"
            aria-label="collapse item indicator"
            className="collapse-item-indicator"
            role="img"
          >
            {isOpen ? "🔽" : "▶️"}️
          </span>
        </StyledCollapseItemButton>
      </h2>
      <div {...regionProps} className="collapse-item-content">
        {item.props.children}
      </div>
    </StyledCollapseItem>
  );
});

if (__DEV__) {
  CollapseItem.displayName = "NextUI.CollapseItem";
}

CollapseItem.toString = () => ".nextui-collapse-item";

export default CollapseItem;
