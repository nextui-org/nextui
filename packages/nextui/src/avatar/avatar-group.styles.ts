import { styled, VariantProps } from '../theme/stitches.config';
import Avatar from './avatar.styles';

export const StyledAvatarGroupCount = styled('span', {
  fontSize: '$xs',
  display: 'inline-flex',
  alignItems: 'center',
  marginLeft: '$3',
  color: '$text'
});

const StyledAvatarGroup = styled('div', {
  dflex: 'center',
  height: 'auto',
  width: 'max-content',
  '@motion': {
    transition: 'none'
  },
  [`& ${Avatar}`]: {
    marginLeft: '-$space$5',
    transition: '$default',
    '.only-text-avatar': {
      boxShadow: '$xs'
    }
  },
  '.only-text-avatar': {
    boxShadow: '$xs'
  },
  variants: {
    animated: {
      true: {
        [`& ${Avatar}:hover`]: {
          transform: 'translate(-$space$5)'
        }
      }
    }
  },
  defaultVariants: {
    animated: true
  }
});

export type AvatarGroupVariants = VariantProps<typeof StyledAvatarGroup>;

export default StyledAvatarGroup;
