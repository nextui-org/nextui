import React, { useMemo } from 'react';
import withDefaults from '../utils/with-defaults';
import { CSS } from '../theme/stitches.config';
import { SimpleColors, TextTransforms } from '../utils/prop-types';
import { isNormalColor } from '../utils/color';
import { StyledText, TextVariantsProps } from './text.styles';

export interface Props {
  tag: keyof JSX.IntrinsicElements;
  color?: SimpleColors | string;
  size?: string | number;
  margin?: string | number;
  transform?: TextTransforms;
  css?: CSS;
}

const defaultProps = {
  color: 'default' as SimpleColors | string
};

type NativeAttrs = Omit<React.DetailsHTMLAttributes<unknown>, keyof Props>;

export type TextChildProps = Props &
  typeof defaultProps &
  NativeAttrs &
  TextVariantsProps;

const TextChild: React.FC<React.PropsWithChildren<TextChildProps>> = ({
  children,
  tag,
  className,
  color: userColor,
  transform,
  margin: marginProp,
  size,
  css,
  ...props
}) => {
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
    <React.Fragment>
      <StyledText
        as={tag}
        css={{
          color,
          fontSize: size ? fontSize : '',
          margin,
          tt: transform,
          ...(css as any)
        }}
        {...props}
      >
        {children}
      </StyledText>
    </React.Fragment>
  );
};

TextChild.toString = () => '.nextui-text-child';

const MemoTextChild = React.memo(TextChild);

export default withDefaults(MemoTextChild, defaultProps);
