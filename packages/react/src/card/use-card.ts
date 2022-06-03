import React from 'react';
import type { ReactNode } from 'react';
import { useFocusRing } from '@react-aria/focus';
import type {
  PressEvents,
  PressEvent,
  FocusableProps
} from '@react-types/shared';
import type { FocusRingAria } from '@react-aria/focus';
import { usePress } from '@react-aria/interactions';
import { useHover } from '@react-aria/interactions';
import {
  StyledCardHeader as CardHeader,
  StyledCardFooter as CardFooter,
  StyledCardBody as CardBody
} from './card.styles';
import Image from '../image';
import type { ReactRef } from './../utils/refs';
import type { NormalColors, NormalWeights } from './../utils/prop-types';
import { hasChild, pickChild } from '../utils/collections';
import useDrip from '../use-drip';
import { useDOMRef } from '../utils/dom';

interface Props extends PressEvents, FocusableProps {
  children: ReactNode | ReactNode[];
  ref: ReactRef<HTMLDivElement | null>;
  color?: NormalColors;
  borderWeight?: NormalWeights;
  isImageCover?: boolean;
  isPressable?: boolean;
  isHoverable?: boolean;
  isBordered?: boolean;
  disableShadow?: boolean;
  disableRipple?: boolean;
  disableAnimation?: boolean;
}

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>;

export type UseCardProps = Props & NativeAttrs;

interface IFocusRingAria extends FocusRingAria {
  focusProps: Omit<React.HTMLAttributes<HTMLElement>, 'css'>;
}

/**
 * @internal
 */
export const useCard = (props: UseCardProps) => {
  const {
    ref,
    children,
    color = 'default',
    disableAnimation = false,
    disableRipple = false,
    isImageCover = false,
    disableShadow = false,
    isHoverable = false,
    borderWeight = 'normal',
    isPressable = false,
    onClick,
    onPress,
    autoFocus,
    ...otherProps
  } = props;

  const cardRef = useDOMRef(ref);

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

  const handleDrip = (e: React.MouseEvent<HTMLButtonElement> | PressEvent) => {
    if (!disableAnimation && !disableRipple && cardRef.current) {
      onDripClickHandler(e);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isPressable) {
      return;
    }
    handleDrip(e);
    onClick?.(e);
  };

  const handlePress = (e: PressEvent) => {
    if (e.pointerType === 'keyboard' || e.pointerType === 'virtual') {
      handleDrip(e);
      // TODO: take this out and deprecate onClick function for next release (only use the @react-aria/button impl)
      onClick?.(e as any);
    }
    onPress?.(e);
  };

  const { isPressed, pressProps } = usePress({
    isDisabled: !isPressable,
    onPress: handlePress,
    ...otherProps
  });

  const { hoverProps, isHovered } = useHover({
    isDisabled: !isHoverable,
    ...otherProps
  });

  const { isFocusVisible, focusProps }: IFocusRingAria = useFocusRing({
    autoFocus
  });

  return {
    cardRef,
    color,
    borderWeight,
    isPressable,
    isHoverable,
    isHovered,
    isPressed,
    isImageCover,
    hasHeader,
    hasContent,
    disableShadow,
    disableAnimation,
    disableRipple,
    headerChildren,
    footerChildren,
    imageChildren,
    withoutImageChildren,
    pressProps,
    hoverProps,
    dripBindings,
    focusProps,
    onDripClickHandler,
    isFocusVisible,
    onClick: handleClick,
    ...otherProps
  };
};

export type UseCardReturn = ReturnType<typeof useCard>;
