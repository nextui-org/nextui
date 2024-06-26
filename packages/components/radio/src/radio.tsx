import {forwardRef} from "@nextui-org/system";
import {VisuallyHidden} from "@react-aria/visually-hidden";

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
      <VisuallyHidden elementType="span">
        <input {...getInputProps()} />
      </VisuallyHidden>
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

Radio.displayName = "NextUI.Radio";

export default Radio;
