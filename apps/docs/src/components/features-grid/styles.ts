import { Grid, styled } from '@nextui-org/react';

export const FeatureItem = styled(Grid, {
  background: '$accents1',
  boxShadow: '$sm',
  borderRadius: '$lg',
  display: 'flex',
  flexDirection: 'column',
  px: '$8',
  bf: 'saturate(180%) blur(14px)',
  bg: 'rgba(255, 255, 255, 0.05)',
  '& .icon-wrapper': {
    dflex: 'center',
    background: 'rgb(42,22,60)',
    br: '$pill',
    p: '$4'
  }
});
