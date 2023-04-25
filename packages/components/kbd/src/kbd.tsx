import {forwardRef} from "@nextui-org/system";
import {useMemo} from "react";

import {UseKbdProps, useKbd} from "./use-kbd";
import {kbdKeysLabelMap, kbdKeysMap} from "./utils";

export interface KbdProps extends Omit<UseKbdProps, "ref"> {}

const Kbd = forwardRef<KbdProps, "kbd">((props, ref) => {
  const {Component, children, slots, classNames, keysToRender, getKbdProps} = useKbd({
    ref,
    ...props,
  });

  const keysContent = useMemo(() => {
    return keysToRender.map((key) => (
      <abbr
        key={key}
        className={slots.abbr({class: classNames?.abbr})}
        title={kbdKeysLabelMap[key]}
      >
        {kbdKeysMap[key]}
      </abbr>
    ));
  }, [keysToRender]);

  return (
    <Component {...getKbdProps()}>
      {keysContent}
      {children && <span className={slots.content({class: classNames?.content})}>{children}</span>}
    </Component>
  );
});

Kbd.displayName = "NextUI.Kbd";

export default Kbd;
