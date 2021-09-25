import React from 'react';
import withDefaults from '../../utils/with-defaults';
import useTheme from '../../hooks/use-theme';
import { __DEV__ } from '../../utils/assertion';

interface Props {
  opacity: number;
}

const defaultProps = {
  opacity: 0.5,
};

export type ImageSkeletonProps = Props & typeof defaultProps;

const ImageSkeleton: React.FC<ImageSkeletonProps> = React.memo(
  ({ opacity, ...props }) => {
    const theme = useTheme();
    return (
      <div className="skeleton" {...props}>
        <style jsx>{`
          .skeleton {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            width: 100%;
            height: 100%;
            background-image: linear-gradient(
              270deg,
              ${theme.palette.accents_1},
              ${theme.palette.accents_2},
              ${theme.palette.accents_2},
              ${theme.palette.accents_1}
            );
            background-size: 400% 100%;
            animation: loading 3s ease-in-out infinite;
            opacity: ${opacity};
            transition: opacity 300ms ease-out;
          }

          @keyframes loading {
            0% {
              background-position: 200% 0;
            }
            to {
              background-position: -200% 0;
            }
          }
        `}</style>
      </div>
    );
  }
);

if (__DEV__) {
  ImageSkeleton.displayName = 'ImageSkeleton';
}

export default withDefaults(ImageSkeleton, defaultProps);
