import React from 'react';
import withDefaults from '../utils/with-defaults';
import { CSS } from '../theme/stitches.config';
import {
  StyledImageSkeleton,
  ImageSkeletonVariantsProps
} from './image.styles';
import { __DEV__ } from '../utils/assertion';

interface Props {
  opacity: number;
  as?: keyof JSX.IntrinsicElements;
  css?: CSS;
}

const defaultProps = {
  opacity: 0.5
};

export type ImageSkeletonProps = Props &
  typeof defaultProps &
  ImageSkeletonVariantsProps;

const ImageSkeleton: React.FC<ImageSkeletonProps> = React.memo(
  ({ opacity, css, ...props }) => {
    return (
      <StyledImageSkeleton
        css={{ ...(css as any), opacity }}
        className="nextui-image-skeleton"
        {...props}
      />
    );
  }
);

if (__DEV__) {
  ImageSkeleton.displayName = 'NextUI - ImageSkeleton';
}

export default withDefaults(ImageSkeleton, defaultProps);
