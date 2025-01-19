import {forwardRef} from "@heroui/system-rsc";

import {UseSpinnerProps, useSpinner} from "./use-spinner";

export interface SpinnerProps extends UseSpinnerProps {}

const Spinner = forwardRef<"div", SpinnerProps>((props, ref) => {
  const {slots, classNames, label, getSpinnerProps} = useSpinner({...props});

  if (props.variant === "dots" || props.variant === "dots-blink") {
    return (
      <div ref={ref} {...getSpinnerProps()}>
        <div className={slots.wrapper({class: classNames?.wrapper})}>
          <i className={slots.dots({class: classNames?.dots})} />
          <i className={slots.dots({class: classNames?.dots})} />
          <i className={slots.dots({class: classNames?.dots})} />
        </div>
        {label && <span className={slots.label({class: classNames?.label})}>{label}</span>}
      </div>
    );
  }

  if (props.variant === "spinner-bars") {
    return (
      <div ref={ref} {...getSpinnerProps()}>
        <div className={slots.wrapper({class: classNames?.wrapper})}>
          {[...new Array(12)].map((_, index) => (
            <i
              key={`spinner-bar-${index}`}
              className={slots.spinnerBars({class: classNames?.spinnerBars})}
            />
          ))}
        </div>
        {label && <span className={slots.label({class: classNames?.label})}>{label}</span>}
      </div>
    );
  }

  return (
    <div ref={ref} {...getSpinnerProps()}>
      <div className={slots.wrapper({class: classNames?.wrapper})}>
        <i className={slots.circle1({class: classNames?.circle1})} />
        <i className={slots.circle2({class: classNames?.circle2})} />
      </div>
      {label && <span className={slots.label({class: classNames?.label})}>{label}</span>}
    </div>
  );
});

Spinner.displayName = "HeroUI.Spinner";

export default Spinner;
