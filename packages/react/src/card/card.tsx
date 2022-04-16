import React, {
  useImperativeHandle,
  useRef,
  MouseEvent,
  PropsWithoutRef,
  RefAttributes
} from 'react';
import Image from '../image';
import Drip from '../utils/drip';
import useDrip from '../use-drip';
import useTheme from '../use-theme';
import { CSS } from '../theme/stitches.config';
import { hasChild, pickChild } from '../utils/collections';
import useKeyboard, { KeyCode } from '../use-keyboard';
import {
  StyledCard,
  StyledCardHeader as CardHeader,
  StyledCardFooter as CardFooter,
  StyledCardBody as CardBody,
  CardVariantsProps
} from './card.styles';
import withDefaults from '../utils/with-defaults';
import { __DEV__ } from '../utils/assertion';

interface Props {
  cover?: boolean;
  ripple?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  as?: keyof JSX.IntrinsicElements;
  preventDefault?: boolean;
}

const defaultProps = {
  animated: true,
  ripple: true,
  cover: false,
  preventDefault: false
};

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>;

export type CardProps = Props & NativeAttrs & CardVariantsProps & { css?: CSS };

const Card = React.forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<CardProps>
>(({ ...cardProps }, ref: React.Ref<HTMLDivElement | null>) => {
  const {
    children,
    cover,
    animated,
    ripple,
    clickable,
    onClick,
    preventDefault,
    ...props
  } = cardProps;

  const cardRef = useRef<HTMLDivElement>(null);
  useImperativeHandle(ref, () => cardRef.current);

  const { isDark } = useTheme();

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

  const hasContent = hasChild(withoutImageChildren, CardBody);

  const hasHeader = hasChild(children, CardHeader);

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
      disableGlobalEvent: true,
      preventDefault
    }
  );

  return (
    <StyledCard
      ref={cardRef}
      role={clickable ? 'button' : 'section'}
      cover={cover}
      animated={animated}
      clickable={clickable}
      tabIndex={clickable ? 0 : -1}
      onClick={clickHandler}
      isDark={isDark}
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
      {clickable && animated && ripple && <Drip {...dripBindings} />}
      {footerChildren}
    </StyledCard>
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

if (__DEV__) {
  Card.displayName = 'NextUI.Card';
}

Card.toString = () => '.nextui-card';

export default withDefaults(Card, defaultProps) as CardComponent<
  HTMLDivElement,
  CardProps
>;
