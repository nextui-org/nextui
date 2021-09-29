import React, { useMemo } from 'react';
import useTheme from '../use-theme';
import { CardColors } from '../utils/prop-types';
import { getStyles } from './styles';
import CardFooter from './card-footer';
import CardContent from './card-content';
import Image from '../image';
import { hasChild, pickChild } from '../utils/collections';

interface Props {
  hoverable?: boolean;
  shadow?: boolean;
  bordered?: boolean;
  animated?: boolean;
  className?: string;
  width?: string;
  color?: CardColors;
}

const defaultProps = {
  color: 'default' as CardColors,
  bordered: false,
  hoverable: false,
  animated: false,
  shadow: false,
  width: '100%',
  className: '',
};

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>;
export type CardProps = Props & typeof defaultProps & NativeAttrs;

const Card: React.FC<React.PropsWithChildren<CardProps>> = ({
  children,
  hoverable,
  bordered,
  className,
  shadow,
  animated,
  color: cardColor,
  width,
  ...props
}) => {
  const theme = useTheme();
  const hoverShadow = useMemo(() => {
    if (shadow) return theme.expressiveness.shadowMedium;
    return hoverable ? theme.expressiveness.shadowSmall : 'none';
  }, [hoverable, shadow, theme.expressiveness]);
  const { color, bgColor, border } = useMemo(
    () => getStyles(cardColor, theme.palette, shadow, bordered),
    [cardColor, theme.palette, shadow, bordered]
  );

  const [withoutFooterChildren, footerChildren] = pickChild(
    children,
    CardFooter
  );
  const [withoutImageChildren, imageChildren] = pickChild(
    withoutFooterChildren,
    Image
  );
  const hasContent = hasChild(withoutImageChildren, CardContent);

  const background =
    cardColor === 'gradient'
      ? `background-image: ${bgColor}`
      : `background-color: ${bgColor}`;

  return (
    <div
      className={`card ${animated ? 'animated' : ''} ${className}`}
      {...props}
    >
      {imageChildren}
      {hasContent ? (
        withoutImageChildren
      ) : (
        <CardContent>{withoutImageChildren}</CardContent>
      )}
      {footerChildren}
      <style jsx>{`
        .card {
          background: ${theme.palette.background};
          margin: 0;
          padding: 0;
          width: ${width};
          transition: all 0.25s ease;
          border-radius: ${theme.layout.radius};
          box-shadow: ${shadow ? theme.expressiveness.shadowSmall : 'none'};
          box-sizing: border-box;
          color: ${color};
          ${background};
          border: ${border?.weight} solid ${border?.color};
        }
        .card:hover {
          box-shadow: ${hoverShadow};
        }
        .card :global(img) {
          width: 100%;
        }
        .card.animated :global(img) {
          transition: all 0.25s ease;
        }
        .card.animated:hover :global(img) {
          transform: scale(1.15);
        }
        .card :global(.image) {
          border-bottom-left-radius: 0;
          border-bottom-right-radius: 0;
        }
      `}</style>
    </div>
  );
};

type MemoCardComponent<P = {}> = React.NamedExoticComponent<P> & {
  Footer: typeof CardFooter;
  Actions: typeof CardFooter;
  Content: typeof CardContent;
  Body: typeof CardContent;
};
type ComponentProps = Partial<typeof defaultProps> &
  Omit<Props, keyof typeof defaultProps> &
  NativeAttrs;

Card.defaultProps = defaultProps;

export default React.memo(Card) as MemoCardComponent<ComponentProps>;
