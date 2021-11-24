import React from 'react';
import StyledAvatarGroup from './avatar-group.styles';
import type { VariantProps } from '../theme/stitches.config';
import clsx from '../utils/clsx';

interface Props {
  count?: number;
  className?: string;
}

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props | 'css'>;

type AvatarGroupVariants = VariantProps<typeof StyledAvatarGroup>;

export type AvatarGroupProps = Props & NativeAttrs & AvatarGroupVariants;

const AvatarGroup: React.FC<React.PropsWithChildren<AvatarGroupProps>> = ({
  count,
  className,
  children,
  ...props
}) => {
  return (
    <StyledAvatarGroup
      className={clsx('nextui-avatar-group', className)}
      {...props}
    >
      {children}
      {count && <span className="nextui-avatar-group-count">+{count}</span>}
    </StyledAvatarGroup>
  );
};

export default AvatarGroup;
