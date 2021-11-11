import React, {
  useMemo,
  useImperativeHandle,
  useRef,
  MouseEvent,
  PropsWithoutRef,
  RefAttributes
} from 'react';
import useTheme from '../use-theme';
import { NormalColors, NormalWeights, SimpleColors } from '../utils/prop-types';
import { getStyles } from './styles';
import CardHeader from './card-header';
import CardFooter from './card-footer';
import CardBody from './card-body';
import Image from '../image';
import clsx from '../utils/clsx';
import Drip from '../utils/drip';
import useDrip from '../use-drip';
import { hasChild, pickChild } from '../utils/collections';
import { getNormalWeight } from '../utils/dimensions';
import { CardConfig, CardContext } from './card-context';
import { getFocusStyles } from '../utils/styles';
import useKeyboard, { KeyCode } from '../use-keyboard';
import { __DEV__ } from '../utils/assertion';

interface Props {
  shadow?: boolean;
  bordered?: boolean;
  animated?: boolean;
  hoverable?: boolean;
  clickable?: boolean;
  cover?: boolean;
  className?: string;
  width?: string;
  height?: string;
  color?: NormalColors | string;
  textColor?: SimpleColors | string;
  borderWeight?: NormalWeights;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const defaultProps = {
  color: 'default' as NormalColors | string,
  textColor: 'default' as SimpleColors | string,
  bordered: false,
  cover: false,
  animated: true,
  clickable: false,
  hoverable: false,
  shadow: true,
  borderWeight: 'normal' as NormalWeights,
  width: '100%',
  height: 'auto',
  className: ''
};

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>;
export type CardProps = Props & typeof defaultProps & NativeAttrs;

const Card = React.forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<CardProps>
>(({ ...cardProps }, ref: React.Ref<HTMLDivElement | null>) => {
  const {
    children,
    bordered,
    cover,
    className,
    shadow,
    animated,
    clickable,
    hoverable,
    color: cardColor,
    borderWeight: borderWeightProp,
    width,
    height,
    textColor,
    onClick,
    ...props
  } = cardProps;
  const theme = useTheme();

  const { color, bgColor, dripColor, borderColor } = useMemo(
    () => getStyles(cardColor, textColor, shadow, bordered, theme),
    [cardColor, theme, textColor, shadow, bordered]
  );

  const cardRef = useRef<HTMLDivElement>(null);
  useImperativeHandle(ref, () => cardRef.current);

  const { onClick: onDripClickHandler, ...dripBindings } = useDrip(
    false,
    cardRef
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

  const { className: focusClassName, styles: focusStyles } =
    getFocusStyles(theme);

  const hasContent = hasChild(withoutImageChildren, CardBody);

  const hasHeader = hasChild(children, CardHeader);

  const borderWeight = useMemo(
    () => (bordered ? getNormalWeight(borderWeightProp) : '0px'),
    [bordered, borderWeightProp]
  );

  const cardConfig: CardConfig = useMemo(
    () => ({
      background: bgColor,
      noPadding: cover ? true : undefined
    }),
    []
  );

  const clickHandler = (event: MouseEvent<HTMLDivElement>) => {
    if (animated && cardRef.current) {
      onDripClickHandler(event);
    }
    onClick && onClick(event);
  };

  const { bindings } = useKeyboard(
    (event: any) => {
      if (!clickable) {
        return;
      }
      clickHandler(event);
    },
    [KeyCode.Enter, KeyCode.Space],
    {
      disableGlobalEvent: true
    }
  );

  return (
    <CardContext.Provider value={cardConfig}>
      <div
        role={clickable ? 'button' : ''}
        ref={cardRef}
        tabIndex={clickable ? 0 : -1}
        className={clsx(
          'card',
          { animated, cover, clickable, hoverable },
          clickable && focusClassName,
          className
        )}
        onClick={clickHandler}
        {...props}
        {...bindings}
      >
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
        ) : !cover ? (
          <CardBody>{withoutImageChildren}</CardBody>
        ) : null}
        {clickable && animated && <Drip color={dripColor} {...dripBindings} />}
        {footerChildren}
        <style jsx>{`
          .card {
            margin: 0;
            padding: 0;
            position: relative;
            display: flex;
            overflow: hidden;
            flex-direction: column;
            background: ${bgColor};
            width: 100%;
            max-width: ${width};
            height: ${height};
            border-radius: ${theme.layout.radius};
            box-shadow: ${shadow && !bordered
              ? theme.expressiveness.shadowMedium
              : 'none'};
            box-sizing: border-box;
            color: ${color};
            border: ${borderWeight} solid ${borderColor};
          }
          .card.animated {
            transition: all 0.25s ease;
          }
          .card.clickable.animated:active {
            transform: scale(0.97);
          }
          .card.hoverable.clickable.animated:active {
            transform: scale(0.99);
          }
          .card.clickable {
            cursor: pointer;
          }
          .card :global(.image) {
            width: 100%;
          }
          .card.hoverable.animated:hover {
            transform: translateY(-2px);
            box-shadow: ${shadow ? theme.expressiveness.shadowLarge : ''};
          }
          .card.cover :global(img) {
            object-fit: cover;
          }
          .card:not(.cover) :global(.image) {
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
          }
        `}</style>
        {focusStyles}
      </div>
    </CardContext.Provider>
  );
});

type CardComponent<T, P = {}> = React.ForwardRefExoticComponent<
  PropsWithoutRef<P> & RefAttributes<T>
> & {
  Header: typeof CardHeader;
  Body: typeof CardBody;
  Footer: typeof CardFooter;
  Image: typeof Image;
};

type ComponentProps = Partial<typeof defaultProps> &
  Omit<Props, keyof typeof defaultProps> &
  NativeAttrs;

if (__DEV__) {
  Card.displayName = 'NextUI - Card';
}

Card.defaultProps = defaultProps;

export default Card as CardComponent<HTMLDivElement, ComponentProps>;
