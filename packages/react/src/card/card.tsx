import React, { PropsWithoutRef, RefAttributes } from 'react';
import { mergeProps } from '@react-aria/utils';
import Drip from '../utils/drip';
import { CSS } from '../theme/stitches.config';
import { useCard } from './use-card';
import type { UseCardProps } from './use-card';
import CardImage from './card-image';
import {
  StyledCard,
  StyledCardHeader as CardHeader,
  StyledCardFooter as CardFooter,
  StyledCardBody as CardBody
} from './card.styles';
import { CardProvider } from './card-context';
import { __DEV__ } from '../utils/assertion';

interface Props extends UseCardProps {
  as?: keyof JSX.IntrinsicElements;
}

export type CardProps = Props & { css?: CSS };

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ ...cardProps }, ref: React.Ref<HTMLDivElement | null>) => {
    const { as, css, ...otherProps } = cardProps;

    const context = useCard({ ...otherProps, ref });

    console.log({ isFocusVisible: context.isFocusVisible });

    return (
      <StyledCard
        ref={context.cardRef}
        as={as}
        css={css as any}
        role={context.isPressable ? 'button' : 'section'}
        borderWeight={context.borderWeight}
        isImageCover={context.isImageCover}
        disableAnimation={context.disableAnimation}
        disableShadow={context.disableShadow}
        shouldShowOutline={context.isFocusVisible && !context.disableShadow}
        isPressable={context.isPressable}
        isPressed={context.isPressed}
        isHoverable={context.isHoverable}
        isBordered={context.isBordered}
        isHovered={context.isHovered}
        tabIndex={context.isPressable ? 0 : -1}
        onClick={context.onClick}
        isFocusVisible={context.isFocusVisible}
        {...mergeProps(context.pressProps, context.focusProps, otherProps)}
      >
        <CardProvider value={context}>
          {context.hasHeader ? (
            <>
              {context.headerChildren}
              {context.imageChildren}
            </>
          ) : (
            context.imageChildren
          )}
        </CardProvider>
        {context.hasContent ? (
          context.withoutImageChildren
        ) : !context.isImageCover ? (
          <CardBody>{context.withoutImageChildren}</CardBody>
        ) : null}
        {context.isPressable &&
          !context.disableAnimation &&
          !context.disableRipple && <Drip {...context.dripBindings} />}
        {context.footerChildren}
      </StyledCard>
    );
  }
);

type CardComponent<T, P = {}> = React.ForwardRefExoticComponent<
  PropsWithoutRef<P> & RefAttributes<T>
> & {
  Header: typeof CardHeader;
  Body: typeof CardBody;
  Footer: typeof CardFooter;
  Image: typeof CardImage;
};

if (__DEV__) {
  Card.displayName = 'NextUI.Card';
}

Card.toString = () => '.nextui-card';

export default Card as CardComponent<HTMLDivElement, CardProps>;
