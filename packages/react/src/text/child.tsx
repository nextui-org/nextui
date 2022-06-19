import React, { useMemo, ReactNode } from 'react';
import { CSS, FontSizes, baseTheme } from '../theme/stitches.config';
import { SimpleColors, TextTransforms } from '../utils/prop-types';
import { isNormalColor } from '../utils/color';
import { ReactRef } from '../utils/refs';
import { useDOMRef } from '../utils/dom';
import { StyledText, TextVariantsProps } from './text.styles';
import { __DEV__ } from '../utils/assertion';

type As = keyof JSX.IntrinsicElements | React.ComponentType<any>;
type FontSize = number | string | keyof FontSizes;

export interface Props {
  tag: keyof JSX.IntrinsicElements;
  children?: ReactNode;
  color?: SimpleColors | string;
  size?: FontSize;
  transform?: TextTransforms;
  css?: CSS;
  as?: As;
}

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>;

export type TextChildProps = Props & NativeAttrs & TextVariantsProps;

export const TextChild = React.forwardRef(
  (props: TextChildProps, ref: ReactRef<HTMLElement>) => {
    const {
      children,
      tag,
      color: userColor = 'default',
      transform,
      size,
      css,
      ...otherProps
    } = props;

    const domRef = useDOMRef(ref);

    const fontSize = useMemo<FontSize>(() => {
      if (!size) return 'inherit';
      if (typeof size === 'number') return `${size}px`;
      if (baseTheme.theme.fontSizes?.[size as keyof FontSizes]) {
        return `$${size}`;
      }
      return size;
    }, [size]);

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

    return (
      <StyledText
        ref={domRef}
        as={tag}
        css={{
          color,
          fontSize: size ? fontSize : '',
          tt: transform,
          ...(css as any)
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

export default React.memo(TextChild);
