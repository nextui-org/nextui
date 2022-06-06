import React, { RefAttributes, PropsWithoutRef } from 'react';
import { DOMProps, AriaLabelingProps } from '@react-types/shared';
import { AriaMenuProps } from '@react-types/menu';
import { useMenu } from '@react-aria/menu';
import { useTreeState } from '@react-stately/tree';
import { mergeProps } from '@react-aria/utils';
import { useDOMRef, useSyncRef } from '../utils/dom';
import { CSS } from '../theme/stitches.config';
import { useDropdownContext } from './dropdown-context';
import DropdownSection from './dropdown-section';
import DropdownItem from './dropdown-item';
import { StyledDropdownMenu } from './dropdown.styles';
import type { SimpleColors, DropdownVariants } from '../utils/prop-types';
import clsx from '../utils/clsx';
import { __DEV__ } from '../utils/assertion';

interface Props<T> extends AriaMenuProps<T>, DOMProps, AriaLabelingProps {
  as?: keyof JSX.IntrinsicElements;
  /**
   * The color of the dropdown items on (focused, hovered)
   * @default 'default'
   */
  color?: SimpleColors;
  /**
   * The dropdowm item variation
   * @default 'flat'
   */
  variant?: DropdownVariants;
  /**
   * The text color of the dropdown items on (focused, hovered)
   * @default 'default'
   */
  textColor?: SimpleColors;
}

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props<object>>;

export type DropdownMenuProps<T = object> = Props<T> &
  NativeAttrs & { css?: CSS };

const DropdownMenu = React.forwardRef(
  (props: DropdownMenuProps, ref: React.Ref<HTMLUListElement | null>) => {
    const {
      css = {},
      as,
      color = 'default',
      textColor = 'default',
      variant = 'flat',
      ...otherProps
    } = props;

    const context = useDropdownContext();
    const completeProps = {
      ...mergeProps(context, otherProps)
    };
    const domRef = useDOMRef(ref);

    const state = useTreeState(completeProps);
    const { menuProps } = useMenu(completeProps, state, domRef);

    useSyncRef(context, domRef);

    return (
      <StyledDropdownMenu
        ref={domRef}
        as={as}
        css={{ ...(css as any) }}
        className={clsx('nextui-dropdown-menu', props.className)}
        {...menuProps}
      >
        {[...state.collection].map((item) => {
          if (item.type === 'section') {
            return (
              <DropdownSection
                key={item.key}
                item={item}
                state={state}
                onAction={completeProps.onAction}
                color={color}
                textColor={textColor}
                variant={variant}
              />
            );
          }
          let dropdownItem = (
            <DropdownItem
              key={item.key}
              item={item}
              state={state}
              onAction={completeProps.onAction}
              color={color}
              textColor={textColor}
              variant={variant}
            />
          );
          if (item.wrapper) {
            dropdownItem = item.wrapper(dropdownItem);
          }
          return dropdownItem;
        })}
      </StyledDropdownMenu>
    );
  }
);

if (__DEV__) {
  DropdownMenu.displayName = 'NextUI.DropdownMenu';
}

type DropdownComponent<T, P = {}> = React.ForwardRefExoticComponent<
  PropsWithoutRef<P> & RefAttributes<T>
>;

DropdownMenu.toString = () => '.nextui-dropdown-menu';

export default DropdownMenu as DropdownComponent<
  HTMLUListElement,
  DropdownMenuProps
>;
