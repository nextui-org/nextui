import {forwardRef} from "@nextui-org/system";
import {__DEV__} from "@nextui-org/shared-utils";
import {VisuallyHidden} from "@react-aria/visually-hidden";

import {UseRadioProps, useRadio} from "./use-radio";

export interface RadioProps extends Omit<UseRadioProps, "ref"> {}

const Radio = forwardRef<RadioProps, "label">((props, ref) => {
  const {
    Component,
    children,
    slots,
    styles,
    description,
    getBaseProps,
    getWrapperProps,
    getInputProps,
    getLabelProps,
    getControlProps,
  } = useRadio({ref, ...props});

  return (
    <Component {...getBaseProps()}>
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <span {...getWrapperProps()}>
        <span {...getControlProps()} />
      </span>
      <div className={slots.labelWrapper({class: styles?.labelWrapper})}>
        {children && <span {...getLabelProps()}>{children}</span>}
        {description && (
          <span className={slots.description({class: styles?.description})}>{description}</span>
        )}
      </div>
    </Component>
  );
});

if (__DEV__) {
  Radio.displayName = "NextUI.Radio";
}

export default Radio;
