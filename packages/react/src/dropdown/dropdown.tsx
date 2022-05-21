import React, { RefAttributes, PropsWithoutRef, useContext } from 'react';

import { DOMProps, AriaLabelingProps } from '@react-types/shared';
import { AriaMenuProps } from '@react-types/menu';
import { useMenu } from '@react-aria/menu';
import { useTreeState } from '@react-stately/tree';
import {
  Item as DropdownBaseItem,
  Section as DropdownBaseSection
} from '@react-stately/collections';
import { mergeProps } from '@react-aria/utils';

import withDefaults from '../utils/with-defaults';
import { useDOMRef, useSyncRef } from '../utils/dom';
import Popover from '../popover';

import { DropdownContext } from './dropdown-context';
import DropdownSection from './dropdown-section';
import DropdownItem from './dropdown-item';
import clsx from '../utils/clsx';

interface Props<T> extends AriaMenuProps<T>, DOMProps, AriaLabelingProps {}

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props<object>>;

const defaultProps = {};

export type DropdownProps<T = object> = Props<T> &
  NativeAttrs &
  typeof defaultProps;

const Dropdown = React.forwardRef(
  (props: DropdownProps, ref: React.Ref<HTMLUListElement | null>) => {
    const contextProps = useContext(DropdownContext);
    const completeProps = {
      ...mergeProps(contextProps, props)
    };
    const domRef = useDOMRef(ref);

    const state = useTreeState(completeProps);
    const { menuProps: dropdownProps } = useMenu(completeProps, state, domRef);

    useSyncRef(contextProps, domRef);

    return (
      <ul
        {...dropdownProps}
        ref={domRef}
        style={{
          padding: 0,
          listStyle: 'none',
          border: '1px solid gray',
          minWidth: 250
        }}
        className={clsx('nextui-dropdown', props.className)}
      >
        {[...state.collection].map((item) => {
          if (item.type === 'section') {
            return (
              <DropdownSection
                key={item.key}
                item={item}
                state={state}
                onAction={completeProps.onAction}
              />
            );
          }
          let dropdownItem = (
            <DropdownItem
              key={item.key}
              item={item}
              state={state}
              onAction={completeProps.onAction}
            />
          );
          if (item.wrapper) {
            dropdownItem = item.wrapper(dropdownItem);
          }
          return dropdownItem;
        })}
      </ul>
    );
  }
);

Dropdown.displayName = 'NextUI - Dropdown';

type DropdownComponent<T, P = {}> = React.ForwardRefExoticComponent<
  PropsWithoutRef<P> & RefAttributes<T>
> & {
  Section: typeof DropdownBaseSection;
  Item: typeof DropdownBaseItem;
  Trigger: typeof Popover.Trigger;
  Content: typeof Popover.Content;
};

Dropdown.toString = () => '.nextui-dropdown';

export default withDefaults(Dropdown, defaultProps) as DropdownComponent<
  HTMLUListElement,
  DropdownProps
>;
