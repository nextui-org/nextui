import { styled, VariantProps } from '../theme/stitches.config';

export const StyledCode = styled('code', {});

export const StyledPre = styled('pre', {
  width: 'initial',
  mw: '100'
});

export type CodeVariantsProps = VariantProps<typeof StyledCode>;
