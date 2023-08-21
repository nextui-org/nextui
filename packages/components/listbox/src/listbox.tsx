import {forwardRef} from "@nextui-org/system";

import {UseListboxProps, useListbox} from "./use-listbox";
import ListboxSection from "./listbox-section";
import ListboxItem from "./listbox-item";

export interface ListboxProps extends UseListboxProps {}

const Listbox = forwardRef<"ul", ListboxProps>((props, ref) => {
  const {Component, state, getBaseProps, color, disableAnimation, variant, itemClasses} =
    useListbox({...props, ref});

  return (
    <Component {...getBaseProps()}>
      {[...state.collection].map((item) => {
        const itemProps = {
          color,
          disableAnimation,
          item,
          state,
          variant,
          ...item.props,
        };

        if (item.type === "section") {
          return <ListboxSection key={item.key} {...itemProps} itemClasses={itemClasses} />;
        }
        let listboxItem = <ListboxItem key={item.key} {...itemProps} classNames={itemClasses} />;

        if (item.wrapper) {
          listboxItem = item.wrapper(listboxItem);
        }

        return listboxItem;
      })}
    </Component>
  );
});

Listbox.displayName = "NextUI.Listbox";

export default Listbox;
