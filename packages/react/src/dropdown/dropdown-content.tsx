import React, {
  ReactNode,
  RefAttributes,
  PropsWithoutRef,
  HTMLAttributes
} from 'react';
import { useDOMRef } from '../utils/dom';
import withDefaults from '../utils/with-defaults';
import { StyledDropdownContent } from './dropdown.styles';

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const defaultProps = {};

export type DropdownContentProps = Props & typeof defaultProps;

const DropdownContent = React.forwardRef(
  (
    { children }: DropdownContentProps,
    ref: React.Ref<HTMLDivElement | null>
  ) => {
    const domRef = useDOMRef(ref);
    return (
      <StyledDropdownContent ref={domRef}>{children}</StyledDropdownContent>
    );
  }
);

DropdownContent.displayName = 'NextUI - DropdownContent';

type DropdownContentComponent<T, P = {}> = React.ForwardRefExoticComponent<
  PropsWithoutRef<P> & RefAttributes<T>
> & {};

DropdownContent.toString = () => '.nextui-DropdownContent';

export default withDefaults(
  DropdownContent,
  defaultProps
) as DropdownContentComponent<HTMLDivElement, DropdownContentProps>;
