import React, { Fragment, Key } from 'react';
import type { TreeState } from '@react-stately/tree';
import type { Node } from '@react-types/shared';
import { mergeProps } from '@react-aria/utils';
import { useMenuSection } from '@react-aria/menu';
import DropdownItem from './dropdown-item';
import type { CSS } from '../theme/stitches.config';
import type { SimpleColors, DropdownVariants } from '../utils/prop-types';
import Divider from '../divider';
import clsx from '../utils/clsx';
import {
  StyledDropdownSection,
  StyledDropdownSectionWrapper,
  StyledDropdownSectionTitle
} from './dropdown.styles';
import type { IMenuSectionAria } from './dropdown-types';
import { __DEV__ } from '../utils/assertion';

interface Props<T> {
  item: Node<T>;
  state: TreeState<T>;
  color?: SimpleColors;
  variant?: DropdownVariants;
  textColor?: SimpleColors;
  /**
   * Shows a divider between sections
   * @default true
   */
  withDivider?: boolean;
  as?: keyof JSX.IntrinsicElements;
  css?: CSS;
  className?: string;
  onAction?: (key: Key) => void;
}

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props<object>>;

export type DropdownSectionProps<T> = Props<T> & NativeAttrs;

const DropdownSection = <T extends object>(props: DropdownSectionProps<T>) => {
  const {
    item,
    state,
    css,
    as,
    color,
    textColor,
    variant,
    withDivider = true,
    className,
    onAction
  } = props;

  const { itemProps, headingProps, groupProps }: IMenuSectionAria =
    useMenuSection({
      heading: item.rendered,
      'aria-label': item['aria-label']
    });

  return (
    <Fragment>
      {item.key !== state.collection.getFirstKey() && withDivider && (
        <Divider
          as="li"
          className="nextui-dropdown-section-divider"
          css={{ my: '$2' }}
        />
      )}
      <StyledDropdownSectionWrapper
        {...itemProps}
        className="nextui-dropdown-section-wrapper"
      >
        {item.rendered && (
          <StyledDropdownSectionTitle
            {...headingProps}
            className="nextui-dropdown-section-title"
          >
            {item.rendered}
          </StyledDropdownSectionTitle>
        )}
        <StyledDropdownSection
          {...groupProps}
          as={item.props?.as || as}
          css={{ ...mergeProps(css, item.props?.css) }}
          className={clsx('nextui-dropdown-section', className)}
        >
          {[...item.childNodes].map((node) => {
            let item = (
              <DropdownItem
                key={node.key}
                item={node}
                state={state}
                onAction={onAction}
                color={color}
                textColor={textColor}
                variant={variant}
              />
            );

            if (node.wrapper) {
              item = node.wrapper(item);
            }
            return item;
          })}
        </StyledDropdownSection>
      </StyledDropdownSectionWrapper>
    </Fragment>
  );
};

if (__DEV__) {
  DropdownSection.displayName = 'NextUI - DropdownSection';
}

DropdownSection.toString = () => '.nextui-dropdown-section';

export default DropdownSection;
