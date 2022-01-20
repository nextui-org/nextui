import { Grid, styled } from '@nextui-org/react';
import { lightTheme } from '@theme/shared';
import { StyledCardBlur } from '@primitives';

export const FeatureItem = styled(Grid, StyledCardBlur, {
  transition: '$default',
  minWidth: '100%',
  '& .icon-wrapper': {
    dflex: 'center',
    background: 'rgb(42,22,60)',
    br: '$pill',
    p: '$4'
  },
  [`.${lightTheme} &`]: {
    '& .icon-wrapper': {
      background: '$pink100'
    }
  },
  variants: {
    clickable: {
      true: {
        cursor: 'pointer',
        '&:hover': {
          opacity: 0.8
        }
      }
    }
  }
});
