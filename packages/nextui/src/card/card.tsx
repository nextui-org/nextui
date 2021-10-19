import React, { useMemo } from 'react';
import useTheme from '../use-theme';
import { CardColors, NormalWeights } from '../utils/prop-types';
import { getStyles } from './styles';
import CardHeader from './card-header';
import CardFooter from './card-footer';
import CardBody from './card-body';
import Image from '../image';
import clsx from '../utils/clsx';
import { hasChild, pickChild } from '../utils/collections';
import { getNormalWeight } from '../utils/dimensions';

interface Props {
  shadow?: boolean;
  bordered?: boolean;
  animated?: boolean;
  className?: string;
  width?: string;
  color?: CardColors;
  borderWeight?: NormalWeights;
}

const defaultProps = {
  color: 'default' as CardColors,
  bordered: false,
  animated: true,
  shadow: true,
  borderWeight: 'normal' as NormalWeights,
  width: '100%',
  className: ''
};

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>;
export type CardProps = Props & typeof defaultProps & NativeAttrs;

const Card: React.FC<React.PropsWithChildren<CardProps>> = ({
  children,
  bordered,
  className,
  shadow,
  animated,
  color: cardColor,
  borderWeight: borderWeightProp,
  width,
  ...props
}) => {
  const theme = useTheme();

  const { color, bgColor, borderColor } = useMemo(
    () => getStyles(cardColor, theme.palette, shadow),
    [cardColor, theme.palette, shadow]
  );

  const [withoutHeaderChildren, headerChildren] = pickChild(
    children,
    CardHeader
  );

  const [withoutFooterChildren, footerChildren] = pickChild(
    withoutHeaderChildren,
    CardFooter
  );

  const [withoutImageChildren, imageChildren] = pickChild(
    withoutFooterChildren,
    Image
  );

  const hasContent = hasChild(withoutImageChildren, CardBody);

  const hasHeader = hasChild(children, CardHeader);

  const borderWeight = useMemo(
    () => (bordered ? getNormalWeight(borderWeightProp) : '0px'),
    [bordered, borderWeightProp]
  );

  return (
    <div className={clsx('card', { animated }, className)} {...props}>
      {hasHeader ? (
        <>
          {headerChildren}
          {imageChildren}
        </>
      ) : (
        imageChildren
      )}
      {hasContent ? (
        withoutImageChildren
      ) : (
        <CardBody>{withoutImageChildren}</CardBody>
      )}
      {footerChildren}
      <style jsx>{`
        .card {
          background: ${bgColor};
          margin: 0;
          padding: 0;
          position: relative;
          width: ${width};
          transition: all 0.25s ease;
          border-radius: ${theme.layout.radius};
          box-shadow: ${shadow && !bordered
            ? theme.expressiveness.shadowMedium
            : 'none'};
          box-sizing: border-box;
          color: ${color};
          border: ${borderWeight} solid ${borderColor};
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
  Header: typeof CardHeader;
  Body: typeof CardBody;
  Footer: typeof CardFooter;
};

type ComponentProps = Partial<typeof defaultProps> &
  Omit<Props, keyof typeof defaultProps> &
  NativeAttrs;

Card.defaultProps = defaultProps;

export default React.memo(Card) as MemoCardComponent<ComponentProps>;
