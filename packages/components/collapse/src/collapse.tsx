import {mergeProps} from "@react-aria/utils";
import {forwardRef} from "@nextui-org/system";
import {clsx, __DEV__} from "@nextui-org/shared-utils";

import CollapseItemBase from "./base/collapse-item-base";
import CollapseItem from "./collapse-item";
import {StyledCollapse} from "./collapse.styles";
import {UseCollapseProps, useCollapse} from "./use-collapse";

export interface CollapseProps<T extends object = {}> extends Omit<UseCollapseProps<T>, "ref"> {}

type CompoundCollapse = {
  Item: typeof CollapseItemBase;
};

const Collapse = forwardRef<CollapseProps, "div", CompoundCollapse>((props, ref) => {
  const {className, domRef, state, focusedKey, setFocusedKey, collapseProps, ...otherProps} =
    useCollapse({ref, ...props});

  return (
    <StyledCollapse
      ref={domRef}
      className={clsx("nextui-collapse", className)}
      {...mergeProps(collapseProps, otherProps)}
    >
      {[...state.collection].map((item) => (
        <CollapseItem
          key={item.key}
          focusedKey={focusedKey}
          item={item}
          state={state}
          onFocusChange={(isFocused) => isFocused && setFocusedKey(item.key)}
        />
      ))}
    </StyledCollapse>
  );
});

Collapse.Item = CollapseItemBase;

if (__DEV__) {
  Collapse.displayName = "NextUI.Collapse";
}

Collapse.toString = () => ".nextui-collapse";

export default Collapse;
