import {forwardRef} from "@nextui-org/system";
import {VisuallyHidden} from "@react-aria/visually-hidden";

import {UseRadioProps, useRadio} from "./use-radio";

export interface RadioProps extends UseRadioProps {}

const Radio = forwardRef<"label", RadioProps>((props, ref) => {
  const {
    Component,
    children,
    slots,
    classNames,
    description,
    getBaseProps,
    getWrapperProps,
    getInputProps,
    getLabelProps,
    getLabelWrapperProps,
    getControlProps,
  } = useRadio({...props, ref});

  return (
    <Component {...getBaseProps()}>
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <span {...getWrapperProps()}>
        <span {...getControlProps()} />
      </span>
      <div {...getLabelWrapperProps()}>
        {children && <span {...getLabelProps()}>{children}</span>}
        {description && (
          <span className={slots.description({class: classNames?.description})}>{description}</span>
        )}
      </div>
    </Component>
  );
});

Radio.displayName = "NextUI.Radio";

export default Radio;
