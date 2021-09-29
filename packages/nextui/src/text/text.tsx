import React, { ReactNode, useMemo } from 'react';
import withDefaults from '../utils/with-defaults';
import { NormalColors } from '../utils/prop-types';
import TextChild from './child';

interface Props {
  h1?: boolean;
  h2?: boolean;
  h3?: boolean;
  h4?: boolean;
  h5?: boolean;
  h6?: boolean;
  p?: boolean;
  b?: boolean;
  small?: boolean;
  capitalize?: boolean;
  i?: boolean;
  span?: boolean;
  del?: boolean;
  em?: boolean;
  blockquote?: boolean;
  className?: string;
  size?: string | number;
  color?: NormalColors | string;
}

const defaultProps = {
  h1: false,
  h2: false,
  h3: false,
  h4: false,
  h5: false,
  h6: false,
  p: false,
  b: false,
  small: false,
  capitalize: false,
  i: false,
  span: false,
  del: false,
  em: false,
  blockquote: false,
  className: '',
  color: 'default' as NormalColors | string,
};

type ElementMap = { [key in keyof JSX.IntrinsicElements]?: boolean };

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>;
export type TextProps = Props & typeof defaultProps & NativeAttrs;

type TextRenderableElements = Array<keyof JSX.IntrinsicElements>;

const getModifierChild = (
  tags: TextRenderableElements,
  children: ReactNode,
  size?: string | number,
  capitalize?: boolean
) => {
  if (!tags.length) return children;
  const nextTag = tags.slice(1, tags.length);
  return (
    <TextChild tag={tags[0]} size={size} capitalize={capitalize}>
      {getModifierChild(nextTag, children, size)}
    </TextChild>
  );
};

const Text: React.FC<React.PropsWithChildren<TextProps>> = ({
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  b,
  small,
  i,
  span,
  del,
  em,
  blockquote,
  capitalize,
  size,
  children,
  className,
  ...props
}) => {
  const elements: ElementMap = { h1, h2, h3, h4, h5, h6, p, blockquote };
  const inlineElements: ElementMap = { span, small, b, em, i, del };
  const names = Object.keys(elements).filter(
    (name: keyof JSX.IntrinsicElements) => elements[name]
  ) as TextRenderableElements;
  const inlineNames = Object.keys(inlineElements).filter(
    (name: keyof JSX.IntrinsicElements) => inlineElements[name]
  ) as TextRenderableElements;
  /**
   *  Render element "p" only if no element is found.
   *  If there is only one modifier, just rendered one modifier element
   *  e.g.
   *    <Text /> => <p />
   *    <Text em /> => <em />
   *    <Text p em /> => <p><em>children</em></p>
   *
   */

  const tag = useMemo(() => {
    if (names[0]) return names[0];
    if (inlineNames[0]) return inlineNames[0];
    return 'p' as keyof JSX.IntrinsicElements;
  }, [names, inlineNames]);

  const renderableChildElements = inlineNames.filter(
    (name: keyof JSX.IntrinsicElements) => name !== tag
  ) as TextRenderableElements;

  const modifers = useMemo(() => {
    if (!renderableChildElements.length) return children;
    return getModifierChild(
      renderableChildElements,
      children,
      size,
      capitalize
    );
  }, [renderableChildElements, children, size, capitalize]);

  return (
    <TextChild
      className={className}
      capitalize={capitalize}
      tag={tag}
      size={size}
      {...props}
    >
      {modifers}
    </TextChild>
  );
};

const MemoText = React.memo(Text);

export default withDefaults(MemoText, defaultProps);
