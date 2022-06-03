import React, { useMemo } from 'react';
import Image from '../image';
import type { ImageProps } from '../image';
import type { ReactRef } from '../utils/refs';
import { useDOMRef } from '../utils/dom';
import { __DEV__ } from '../utils/assertion';

interface CardImageProps extends ImageProps {
  cover?: boolean;
}

const CardImage = React.forwardRef(
  (props: CardImageProps, ref: ReactRef<HTMLImageElement>) => {
    const { cover, css, objectFit, ...otherProps } = props;

    const domRef = useDOMRef(ref);

    const getObjectFit = useMemo(() => {
      if (objectFit) {
        return objectFit;
      }
      if (cover) {
        return 'cover';
      }
      return 'scale-down';
    }, [cover, objectFit]);

    return (
      <Image
        ref={domRef}
        objectFit={getObjectFit}
        css={css as any}
        {...otherProps}
      />
    );
  }
);

if (__DEV__) {
  CardImage.displayName = 'NextUI.CardImage';
}

CardImage.toString = () => '.nextui-cardImage';

export default CardImage;
