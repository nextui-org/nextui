import React, { Fragment, Key } from 'react';
import { TreeState } from '@react-stately/tree';
import { Node } from '@react-types/shared';
import { useMenuSection } from '@react-aria/menu';
import DropdownItem from './dropdown-item';
import withDefaults from '../utils/with-defaults';
import Divider from '../divider';

interface Props<T> {
  item: Node<T>;
  state: TreeState<T>;
  onAction?: (key: Key) => void;
}

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props<object>>;

const defaultProps = {};

export type DropdownSectionProps<T> = Props<T> &
  NativeAttrs &
  typeof defaultProps;

const DropdownSection = <T extends object>({
  item,
  state,
  onAction
}: DropdownSectionProps<T>) => {
  const { itemProps, headingProps, groupProps } = useMenuSection({
    heading: item.rendered,
    'aria-label': item['aria-label']
  });

  return (
    <Fragment>
      {item.key !== state.collection.getFirstKey() && <Divider as="li" />}
      <li {...itemProps}>
        {item.rendered && (
          <span
            {...headingProps}
            style={{
              fontWeight: 'bold',
              fontSize: '1.1em',
              padding: '2px 5px'
            }}
          >
            {item.rendered}
          </span>
        )}
        <ul
          {...groupProps}
          style={{
            padding: 0,
            listStyle: 'none'
          }}
        >
          {[...item.childNodes].map((node) => {
            let item = (
              <DropdownItem
                key={node.key}
                item={node}
                state={state}
                onAction={onAction}
              />
            );

            if (node.wrapper) {
              item = node.wrapper(item);
            }
            return item;
          })}
        </ul>
      </li>
    </Fragment>
  );
};

DropdownSection.displayName = 'NextUI - DropdownSection';

DropdownSection.toString = () => '.nextui-dropdown-section';

export default withDefaults(DropdownSection, defaultProps);
