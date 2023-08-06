import {forwardRef} from "react";

import {UseSelectProps, useSelect} from "./use-select";

export interface SelectProps extends UseSelectProps {}

const Select = forwardRef<HTMLElement, SelectProps>((props, ref) => {
  const {Component, domRef, children, styles, ...otherProps} = useSelect({...props, ref});

  return (
    <Component ref={domRef} className={styles} {...otherProps}>
      {children}
    </Component>
  );
});

Select.displayName = "NextUI.Select";

export default Select;
