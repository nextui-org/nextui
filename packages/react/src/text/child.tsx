import React, { useMemo, ReactNode } from 'react';
import withDefaults from '../utils/with-defaults';
import { CSS } from '../theme/stitches.config';
import { SimpleColors, TextTransforms } from '../utils/prop-types';
import { isNormalColor } from '../utils/color';
import { ReactRef } from '../utils/refs';
import { useDOMRef } from '../utils/dom';
import { __DEV__ } from '../utils/assertion';
import { StyledText, TextVariantsProps } from './text.styles';

type As = keyof JSX.IntrinsicElements | React.ComponentType<any>;

export interface Props {
  tag: keyof JSX.IntrinsicElements;
  children?: ReactNode;
  color?: SimpleColors | string;
  size?: string | number;
  margin?: string | number;
  transform?: TextTransforms;
  css?: CSS;
  as?: As;
}

const defaultProps = {
  color: 'default' as SimpleColors | string
};

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>;

export type TextChildProps = Props &
  typeof defaultProps &
  NativeAttrs &
  TextVariantsProps;

export const TextChild = React.forwardRef(
  (props: TextChildProps, ref: ReactRef<HTMLElement>) => {
    const {
      children,
      tag,
      color: userColor,
      transform,
      margin: marginProp,
      size,
      css,
      ...otherProps
    } = props;

    const domRef = useDOMRef(ref);

    const color = useMemo(() => {
      if (isNormalColor(userColor)) {
        switch (userColor) {
          case 'default':
            return '$text';
          default:
            return `$${userColor}`;
        }
      }
      return userColor;
    }, [userColor]);

    const fontSize = useMemo<string>(() => {
      if (!size) return 'inherit';
      if (typeof size === 'number') return `${size}px`;
      return size;
    }, [size]);

    const margin = useMemo<string>(() => {
      if (!marginProp) return 'inherit';
      if (typeof marginProp === 'number') return `${size}px`;
      return marginProp;
    }, [marginProp]);

    return (
      <StyledText
        ref={domRef}
        as={tag}
        css={{
          color,
          fontSize: size ? fontSize : '',
          margin,
          tt: transform,
          ...css
        }}
        {...otherProps}
      >
        {children}
      </StyledText>
    );
  }
);

if (__DEV__) {
  TextChild.displayName = 'NextUI.TextChild';
}

TextChild.toString = () => '.nextui-text-child';

const MemoTextChild = React.memo(TextChild);

export default withDefaults(MemoTextChild, defaultProps);
