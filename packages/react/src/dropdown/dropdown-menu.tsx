import React, { RefAttributes, PropsWithoutRef } from 'react';
import { DOMProps, AriaLabelingProps } from '@react-types/shared';
import { AriaMenuProps } from '@react-types/menu';
import { useMenu } from '@react-aria/menu';
import { useTreeState } from '@react-stately/tree';
import { mergeProps } from '@react-aria/utils';
import { useDOMRef, useSyncRef } from '../utils/dom';
import { useDropdownContext } from './dropdown-context';
import DropdownSection from './dropdown-section';
import DropdownItem from './dropdown-item';
import clsx from '../utils/clsx';
import { __DEV__ } from '../utils/assertion';

interface Props<T> extends AriaMenuProps<T>, DOMProps, AriaLabelingProps {}

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props<object>>;

export type DropdownMenuProps<T = object> = Props<T> & NativeAttrs;

const DropdownMenu = React.forwardRef(
  (props: DropdownMenuProps, ref: React.Ref<HTMLUListElement | null>) => {
    const context = useDropdownContext();
    const completeProps = {
      ...mergeProps(context, props)
    };
    const domRef = useDOMRef(ref);

    const state = useTreeState(completeProps);
    const { menuProps: dropdownProps } = useMenu(completeProps, state, domRef);

    useSyncRef(context, domRef);

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
        className={clsx('nextui-dropdown-menu', props.className)}
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
