import {forwardRef} from "@nextui-org/system-rsc";

import {UseMotionBlurLoaderProps, useMotionBlurLoader} from "./use-motion-blur-loader";

export interface MotionBlurLoaderProps extends UseMotionBlurLoaderProps {}

const MotionBlurLoader = forwardRef<"div", MotionBlurLoaderProps>((props, ref) => {
  const {slots, classNames, label, getMotionBlurLoaderProps} = useMotionBlurLoader({...props});

  return (
    <div ref={ref} {...getMotionBlurLoaderProps()}>
      <div className={slots.wrapper({class: classNames?.wrapper})}>
        <i className={slots.circle1({class: classNames?.circle1})} />
        <i className={slots.circle2({class: classNames?.circle2})} />
        <i className={slots.circle3({class: classNames?.circle3})} />
      </div>
      {label && <span className={slots.label({class: classNames?.label})}>{label}</span>}
    </div>
  );
});

MotionBlurLoader.displayName = "NextUI.MotionBlurLoader";

export default MotionBlurLoader;
