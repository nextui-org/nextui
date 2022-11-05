import type {ReactRef} from "../utils/refs";
import type {CSS} from "../theme/stitches.config";
import type {UseRadioGroupProps} from "./use-radio-group";

import React from "react";

import clsx from "../utils/clsx";
import {useDOMRef} from "../utils/dom";
import {__DEV__} from "../utils/assertion";

import {useRadioGroup} from "./use-radio-group";
import {RadioGroupProvider} from "./radio-context";
import {StyledRadioGroup, StyledRadioGroupContainer, StyledRadioGroupLabel} from "./radio.styles";

interface Props extends UseRadioGroupProps {
  className?: string;
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
}

export type RadioGroupProps = Props & {css?: CSS};

export const RadioGroup = React.forwardRef(
  (props: RadioGroupProps, ref: ReactRef<HTMLDivElement>) => {
    const {as, css, className, children, label, ...otherProps} = props;

    const context = useRadioGroup({...otherProps, label});

    const domRef = useDOMRef(ref);

    return (
      <StyledRadioGroup
        ref={domRef}
        as={as}
        className={clsx("nextui-radio-group", className)}
        css={css as any}
        size={context.size}
        {...context.radioGroupProps}
      >
        {label && (
          <StyledRadioGroupLabel className="nextui-radio-group-label" {...context.labelProps}>
            {label}
          </StyledRadioGroupLabel>
        )}
        <StyledRadioGroupContainer
          className="nextui-radio-group-items"
          isRow={context.orientation === "horizontal"}
          role="presentation"
        >
          <RadioGroupProvider value={context}>{children}</RadioGroupProvider>
        </StyledRadioGroupContainer>
      </StyledRadioGroup>
    );
  },
);

if (__DEV__) {
  RadioGroup.displayName = "NextUI.RadioGroup";
}

RadioGroup.toString = () => ".nextui-radio-group";

export default RadioGroup;
