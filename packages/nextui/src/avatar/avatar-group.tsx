import React from 'react';
import StyledAvatarGroup, {
  StyledAvatarGroupCount,
  AvatarGroupVariants
} from './avatar-group.styles';

interface Props {
  count?: number;
}

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props | 'css'>;

export type AvatarGroupProps = Props & NativeAttrs & AvatarGroupVariants;

const AvatarGroup: React.FC<React.PropsWithChildren<AvatarGroupProps>> = ({
  count,
  children,
  ...props
}) => {
  return (
    <StyledAvatarGroup {...props}>
      {children}
      {count && <StyledAvatarGroupCount>+{count}</StyledAvatarGroupCount>}
    </StyledAvatarGroup>
  );
};

export default AvatarGroup;
