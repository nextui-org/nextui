import {forwardRef} from "@nextui-org/system";

import {UseSpinnerProps, useSpinner} from "./use-spinner";

export interface SpinnerProps extends UseSpinnerProps {}

const Spinner = forwardRef<SpinnerProps, "div">((props, ref) => {
  const {domRef, slots, classNames, label, getSpinnerProps} = useSpinner({ref, ...props});

  return (
    <div ref={domRef} {...getSpinnerProps()}>
      <i className={slots.circle1({class: classNames?.circle1})} />
      <i className={slots.circle2({class: classNames?.circle2})} />
      {label && <span className={slots.label()}>{label}</span>}
    </div>
  );
});

Spinner.displayName = "NextUI.Spinner";

export default Spinner;
