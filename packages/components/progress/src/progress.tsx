import {forwardRef} from "@nextui-org/system";

import {UseProgressProps, useProgress} from "./use-progress";

export interface ProgressProps extends Omit<UseProgressProps, "ref"> {}

const Progress = forwardRef<ProgressProps, "div">((props, ref) => {
  const {
    Component,
    slots,
    styles,
    label,
    percentage,
    showValueLabel,
    getProgressBarProps,
    getLabelProps,
  } = useProgress({ref, ...props});

  const progressBarProps = getProgressBarProps();

  return (
    <Component {...progressBarProps}>
      <div className={slots.labelWrapper({class: styles?.labelWrapper})}>
        {label && <span {...getLabelProps()}>{label}</span>}
        {showValueLabel && (
          <span className={slots.value({class: styles?.value})}>
            {progressBarProps["aria-valuetext"]}
          </span>
        )}
      </div>
      <div className={slots.track({class: styles?.track})}>
        <div
          className={slots.filler({class: styles?.filler})}
          style={{
            transform: `translateX(-${100 - (percentage || 0)}%)`,
          }}
        />
      </div>
    </Component>
  );
});

Progress.displayName = "NextUI.Progress";

export default Progress;
