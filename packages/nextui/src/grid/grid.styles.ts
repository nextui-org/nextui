import { styled, VariantProps } from '../theme/stitches.config';

// export const StyledGrid = styled('div', {
//   margin: 0,
//   boxSizing: 'border-box',
//   padding: '$gridGapUnit'
// });

// .${preClass}-xs {
//     flex-grow: ${layout.xs.grow};
//     max-width: ${layout.xs.width};
//     flex-basis: ${layout.xs.basis};
//     ${layout.xs.display}
//   }
//   @media only screen and (max-width: ${theme.breakpoints.xs}) {
//     .${preClass}-xs {
//       flex-grow: ${layout.xs.grow};
//       max-width: ${layout.xs.width};
//       flex-basis: ${layout.xs.basis};
//       ${layout.xs.display}
//     }
//   }
//   @media only screen and (min-width: ${theme.breakpoints.sm}) {
//     .${preClass}-sm {
//       flex-grow: ${layout.sm.grow};
//       max-width: ${layout.sm.width};
//       flex-basis: ${layout.sm.basis};
//       ${layout.sm.display}
//     }
//   }
//   @media only screen and (min-width: ${theme.breakpoints.md}) {
//     .${preClass}-md {
//       flex-grow: ${layout.md.grow};
//       max-width: ${layout.md.width};
//       flex-basis: ${layout.md.basis};
//       ${layout.md.display}
//     }
//   }
//   @media only screen and (min-width: ${theme.breakpoints.lg}) {
//     .${preClass}-lg {
//       flex-grow: ${layout.lg.grow};
//       max-width: ${layout.lg.width};
//       flex-basis: ${layout.lg.basis};
//       ${layout.lg.display}
//     }
//   }
//   @media only screen and (min-width: ${theme.breakpoints.xl}) {
//     .${preClass}-xl {
//       flex-grow: ${layout.xl.grow};
//       max-width: ${layout.xl.width};
//       flex-basis: ${layout.xl.basis};
//       ${layout.xl.display}
//     }
//   }

export const StyledGridContainer = styled('div', {});

export const StyledGridItem = styled('div', {
  margin: 0,
  boxSizing: 'border-box',
  padding: '$$gridGapUnit'
});

export type GridContainerVariantProps = VariantProps<
  typeof StyledGridContainer
>;
export type GridItemVariantProps = VariantProps<typeof StyledGridItem>;
