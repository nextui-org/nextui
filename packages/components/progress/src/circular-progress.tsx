import {forwardRef} from "@nextui-org/system";

import {UseCircularProgressProps, useCircularProgress} from "./use-circular-progress";

export interface CircularProgressProps extends Omit<UseCircularProgressProps, "ref"> {}

const CircularProgress = forwardRef<CircularProgressProps, "div">((props, ref) => {
  const {
    Component,
    slots,
    classNames,
    label,
    showValueLabel,
    getProgressBarProps,
    getLabelProps,
    getSvgProps,
    getIndicatorProps,
    getTrackProps,
  } = useCircularProgress({ref, ...props});

  const progressBarProps = getProgressBarProps();

  return (
    <Component {...progressBarProps}>
      <div className={slots.svgWrapper({class: classNames?.svgWrapper})}>
        <svg {...getSvgProps()}>
          <circle {...getTrackProps()} />
          <circle {...getIndicatorProps()} />
        </svg>
        {showValueLabel && (
          <span className={slots.value({class: classNames?.value})}>
            {progressBarProps["aria-valuetext"]}
          </span>
        )}
      </div>
      {label && <span {...getLabelProps()}>{label}</span>}
    </Component>
  );
});

CircularProgress.displayName = "NextUI.CircularProgress";

export default CircularProgress;
