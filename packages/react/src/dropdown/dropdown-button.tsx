import React, { useMemo, RefAttributes, PropsWithoutRef } from 'react';
import { Button, ButtonProps } from '../index';
import DropdownTrigger from './dropdown-trigger';
import { useDropdownContext } from './dropdown-context';
import DropdownIcon from './dropdown-icon';
import { useDOMRef } from '../utils/dom';
import { __DEV__ } from '../utils/assertion';
import clsx from '../utils/clsx';

export type DropdownButtonProps = ButtonProps;

const DropdownButton = React.forwardRef(
  (props: DropdownButtonProps, ref: React.Ref<HTMLButtonElement | null>) => {
    const {
      children,
      className,
      iconRight,
      iconRightCss,
      auto = true,
      animated,
      ...otherProps
    } = props;

    const { disableAnimation } = useDropdownContext();

    const buttonRef = useDOMRef(ref);

    const getIconRight = useMemo(() => {
      return (
        iconRight || (
          <DropdownIcon size={14} fill="var(--nextui-colors-white)" />
        )
      );
    }, [iconRight]);

    const isAnimated = useMemo(
      () => animated || !disableAnimation,
      [animated, disableAnimation]
    );

    return (
      <DropdownTrigger>
        <Button
          ref={buttonRef}
          auto={auto}
          className={clsx('nextui-dropdown-button', className)}
          iconRight={getIconRight}
          animated={isAnimated}
          iconRightCss={{
            mt: '$1',
            ...iconRightCss
          }}
          {...otherProps}
        >
          {children}
        </Button>
      </DropdownTrigger>
    );
  }
);

if (__DEV__) {
  DropdownButton.displayName = 'NextUI.DropdownButton';
}

type DropdownButtonComponent<T, P = {}> = React.ForwardRefExoticComponent<
  PropsWithoutRef<P> & RefAttributes<T>
> & {};

DropdownButton.toString = () => '.nextui-dropdown-button';

export default DropdownButton as DropdownButtonComponent<
  HTMLButtonElement,
  DropdownButtonProps
>;
