import {forwardRef} from "@nextui-org/system";
import {__DEV__} from "@nextui-org/shared-utils";
import {VisuallyHidden} from "@react-aria/visually-hidden";

import {UseCheckboxProps, useCheckbox} from "./use-checkbox";

export interface CheckboxProps extends Omit<UseCheckboxProps, "ref"> {}

const Checkbox = forwardRef<CheckboxProps, "label">((props, ref) => {
  const {
    Component,
    children,
    isChecked,
    disableAnimation,
    getBaseProps,
    getCheckboxProps,
    getInputProps,
    getIconProps,
    getLabelProps,
  } = useCheckbox({
    ref,
    ...props,
  });

  return (
    <Component {...getBaseProps()}>
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <span {...getCheckboxProps()}>
        <svg aria-hidden="true" {...getIconProps()} role="presentation" viewBox="0 0 18 18">
          <polyline
            fill="none"
            points="1 9 7 14 15 4"
            stroke="currentColor"
            strokeDasharray={22}
            strokeDashoffset={isChecked ? 44 : 66}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            style={
              !disableAnimation
                ? {
                    transition: "all 350ms",
                    transitionDelay: "200ms",
                  }
                : {}
            }
          />
        </svg>
      </span>
      {children && <span {...getLabelProps()}>{children}</span>}
    </Component>
  );
});

if (__DEV__) {
  Checkbox.displayName = "NextUI.Checkbox";
}

Checkbox.toString = () => ".nextui-checkbox";

export default Checkbox;
