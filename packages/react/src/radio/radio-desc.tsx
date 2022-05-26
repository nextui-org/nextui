import React from 'react';
import clsx from '../utils/clsx';
import { __DEV__ } from '../utils/assertion';
import { StyledRadioDescription } from './radio.styles';
import type { ReactRef } from '../utils/refs';
import type { CSS } from '../theme/stitches.config';
import type { RadioDescriptionVariantsProps } from './radio.styles';

interface Props {
  className?: string;
  children?: React.ReactNode;
}

export type RadioDescProps = Props &
  RadioDescriptionVariantsProps & { css?: CSS };

export const RadioDesc = React.forwardRef<HTMLDivElement, RadioDescProps>(
  (props: RadioDescProps, ref: ReactRef<HTMLDivElement>) => {
    const { className, css, children, ...otherProps } = props;

    return (
      <StyledRadioDescription
        ref={ref}
        className={clsx('nextui-radio-desc', className)}
        css={css as any}
        {...otherProps}
      >
        {children}
      </StyledRadioDescription>
    );
  }
);

if (__DEV__) {
  RadioDesc.displayName = 'NextUI.RadioDesc';
}

RadioDesc.toString = () => '.nextui-radio-desc';

const MemoRadioDesc = React.memo(RadioDesc);

export default MemoRadioDesc;
