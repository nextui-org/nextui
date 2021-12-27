import React from 'react';
import { CSS } from '../theme/stitches.config';
import StyledAvatarGroup, {
  StyledAvatarGroupCount,
  AvatarGroupVariants
} from './avatar-group.styles';

interface Props {
  count?: number;
  as?: keyof JSX.IntrinsicElements;
}

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>;

export type AvatarGroupProps = Props &
  NativeAttrs &
  AvatarGroupVariants & { css?: CSS };

const AvatarGroup: React.FC<React.PropsWithChildren<AvatarGroupProps>> = ({
  count,
  children,
  ...props
}) => {
  return (
    <StyledAvatarGroup {...props}>
      {children}
      {count && (
        <StyledAvatarGroupCount className="nextui-avatar-group-count">
          +{count}
        </StyledAvatarGroupCount>
      )}
    </StyledAvatarGroup>
  );
};

AvatarGroup.toString = () => '.nextui-avatar-group';

export default AvatarGroup;
