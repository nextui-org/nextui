import {forwardRef} from "@nextui-org/system";

// import {StyledLoadingContainer, StyledLoading, StyledLoadingLabel} from "./loading.styles";
import {UseSpinnerProps, useSpinner} from "./use-spinner";

export interface SpinnerProps extends Omit<UseSpinnerProps, "ref"> {}

const Spinner = forwardRef<SpinnerProps, "div">((props, ref) => {
  const {domRef, slots, styles, label, getSpinnerProps} = useSpinner({ref, ...props});

  return (
    <div ref={domRef} {...getSpinnerProps()}>
      <i className={slots.circle1({class: styles?.circle1})} />
      <i className={slots.circle2({class: styles?.circle2})} />
      {label && <span className={slots.label()}>{label}</span>}
    </div>
  );
});

Spinner.displayName = "NextUI.Loading";

export default Spinner;
