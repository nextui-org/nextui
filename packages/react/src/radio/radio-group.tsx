import React from 'react';
import clsx from '../utils/clsx';
import { useDOMRef } from '../utils/dom';
import { useRadioGroup } from './use-radio-group';
import { RadioGroupProvider } from './radio-context';
import {
  StyledRadioGroup,
  StyledRadioGroupContainer,
  StyledRadioGroupLabel
} from './radio.styles';
import type { ReactRef } from '../utils/refs';
import type { CSS } from '../theme/stitches.config';
import type { UseRadioGroupProps } from './use-radio-group';
import { __DEV__ } from '../utils/assertion';

interface Props extends UseRadioGroupProps {
  className?: string;
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
}

export type RadioGroupProps = Props & { css?: CSS };

export const RadioGroup = React.forwardRef(
  (props: RadioGroupProps, ref: ReactRef<HTMLDivElement>) => {
    const { as, css, className, children, label, ...otherProps } = props;

    const context = useRadioGroup({ ...otherProps, label });

    const domRef = useDOMRef(ref);

    return (
      <StyledRadioGroup
        ref={domRef}
        className={clsx('nextui-radio-group', className)}
        as={as}
        css={css}
        size={context.size}
        {...context.radioGroupProps}
      >
        {label && (
          <StyledRadioGroupLabel
            className="nextui-radio-group-label"
            {...context.labelProps}
          >
            {label}
          </StyledRadioGroupLabel>
        )}
        <StyledRadioGroupContainer
          className="nextui-radio-group-items"
          role="presentation"
          isRow={context.orientation === 'horizontal'}
        >
          <RadioGroupProvider value={context}>{children}</RadioGroupProvider>
        </StyledRadioGroupContainer>
      </StyledRadioGroup>
    );
  }
);

if (__DEV__) {
  RadioGroup.displayName = 'NextUI.RadioGroup';
}

RadioGroup.toString = () => '.nextui-radio-group';

export default RadioGroup;
