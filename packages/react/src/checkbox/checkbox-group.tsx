import React from 'react';
import clsx from '../utils/clsx';
import { useDOMRef } from '../utils/dom';
import { __DEV__ } from '../utils/assertion';
import { CheckboxGroupProvider } from './checkbox-context';
import { useCheckboxGroup, UseCheckboxGroupProps } from './use-checkbox-group';
import {
  StyledCheckboxGroup,
  StyledCheckboxGroupContainer
} from './checkbox.styles';

interface Props extends UseCheckboxGroupProps {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export type CheckboxGroupProps = Props;

const CheckboxGroup = React.forwardRef<HTMLDivElement, CheckboxGroupProps>(
  (props: CheckboxGroupProps, ref: React.Ref<HTMLDivElement | null>) => {
    const { children, className, as, label, ...otherProps } = props;

    const { css, ...context } = useCheckboxGroup({ ...otherProps, label });

    const domRef = useDOMRef(ref);

    return (
      <StyledCheckboxGroup
        ref={domRef}
        {...context.groupProps}
        className={clsx('nextui-checkbox-group', className)}
        size={context.size}
        isDisabled={context.groupState.isDisabled}
        as={as}
        css={css}
      >
        {label && (
          <label
            className="nextui-checkbox-group-label"
            {...context.labelProps}
          >
            {label}
          </label>
        )}
        <StyledCheckboxGroupContainer
          className="nextui-checkbox-group-items"
          role="presentation"
          isRow={context.isRow}
        >
          <CheckboxGroupProvider value={context}>
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
