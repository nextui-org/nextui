import { styled } from '@nextui-org/react';
import { StyledCardBlur } from '@primitives';
import { lightTheme } from '@theme/shared';

export const StyledCommunityCard = styled('a', StyledCardBlur, {
  width: '100%',
  minHeight: '140px',
  transition: '$default',
  [`.${lightTheme} &`]: {
    '& .github-icon > path': {
      fill: '#343434'
    }
  },
  '&:hover': {
    opacity: 0.8
  }
});
