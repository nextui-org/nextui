import React from 'react';
import clsx from '../utils/clsx';
import { useDOMRef } from '../utils/dom';
import { __DEV__ } from '../utils/assertion';
import { CheckboxGroupProvider } from './checkbox-context';
import { useCheckboxGroup, UseCheckboxGroupProps } from './use-checkboxGroup';
import {
  StyledCheckboxGroup,
  StyledCheckboxGroupLabel,
  StyledCheckboxGroupContainer
} from './checkbox.styles';
import type { CSS } from '../theme/stitches.config';

interface Props extends UseCheckboxGroupProps {
  css?: CSS;
  className?: string;
  children?: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
}

// type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>;

export type CheckboxGroupProps = Props;

const CheckboxGroup = React.forwardRef<HTMLDivElement, CheckboxGroupProps>(
  (
    props: CheckboxGroupProps,
    forwardedRef: React.Ref<HTMLDivElement | null>
  ) => {
    const { className, as, css, children, label, ...otherProps } = props;

    const { size, row, groupProps, groupState, getProviderValue } =
      useCheckboxGroup({ ...otherProps, label });

    const ref = useDOMRef(forwardedRef);

    return (
      <StyledCheckboxGroup
        className={clsx('nextui-checkbox-group', className)}
        as={as}
        ref={ref}
        css={css}
        size={size}
        {...groupProps}
      >
        {label && (
          <StyledCheckboxGroupLabel
            className="nextui-checkbox-group-label"
            disabled={groupState.isDisabled}
          >
            {label}
          </StyledCheckboxGroupLabel>
        )}
        <StyledCheckboxGroupContainer
          className="nextui-checkbox-group-items"
          role="presentation"
          row={row}
        >
          <CheckboxGroupProvider value={getProviderValue}>
            {children}
          </CheckboxGroupProvider>
        </StyledCheckboxGroupContainer>
      </StyledCheckboxGroup>
    );
  }
);

type CheckboxGroupComponent<T, P = {}> = React.ForwardRefExoticComponent<
  React.PropsWithoutRef<P> & React.RefAttributes<T>
>;

if (__DEV__) {
  CheckboxGroup.displayName = 'NextUI.CheckboxGroup';
}

CheckboxGroup.toString = () => '.nextui-checkbox-group';

export default CheckboxGroup as CheckboxGroupComponent<
  HTMLDivElement,
  CheckboxGroupProps
>;
