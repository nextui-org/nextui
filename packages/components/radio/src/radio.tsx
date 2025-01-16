import {forwardRef} from "@heroui/system";

import {UseRadioProps, useRadio} from "./use-radio";

export interface RadioProps extends UseRadioProps {}

const Radio = forwardRef<"input", RadioProps>((props, ref) => {
  const {
    Component,
    children,
    description,
    getBaseProps,
    getWrapperProps,
    getInputProps,
    getLabelProps,
    getLabelWrapperProps,
    getControlProps,
    getDescriptionProps,
  } = useRadio({...props, ref});

  return (
    <Component {...getBaseProps()}>
      <input {...getInputProps()} />
      <span {...getWrapperProps()}>
        <span {...getControlProps()} />
      </span>
      <div {...getLabelWrapperProps()}>
        {children && <span {...getLabelProps()}>{children}</span>}
        {description && <span {...getDescriptionProps()}>{description}</span>}
      </div>
    </Component>
  );
});

Radio.displayName = "HeroUI.Radio";

export default Radio;
