import {forwardRef} from "@nextui-org/system";

import {UseProgressProps, useProgress} from "./use-progress";

export interface ProgressProps extends Omit<UseProgressProps, "ref"> {}

const Progress = forwardRef<ProgressProps, "div">((props, ref) => {
  const {
    Component,
    slots,
    classNames,
    label,
    percentage,
    showValueLabel,
    getProgressBarProps,
    getLabelProps,
  } = useProgress({ref, ...props});

  const progressBarProps = getProgressBarProps();
  const shouldShowLabelWrapper = label || showValueLabel;

  return (
    <Component {...progressBarProps}>
      {shouldShowLabelWrapper ? (
        <div className={slots.labelWrapper({class: classNames?.labelWrapper})}>
          {label && <span {...getLabelProps()}>{label}</span>}
          {showValueLabel && (
            <span className={slots.value({class: classNames?.value})}>
              {progressBarProps["aria-valuetext"]}
            </span>
          )}
        </div>
      ) : null}
      <div className={slots.track({class: classNames?.track})}>
        <div
          className={slots.indicator({class: classNames?.indicator})}
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
