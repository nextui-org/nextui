import { styled, VariantProps } from '../theme/stitches.config';

export const StyledTableHead = styled('thead', {
  height: '$14'
});

export const StyledTableRow = styled('tr', {});

export const StyledTableColumn = styled('th', {
  textAlign: 'left',
  tt: 'uppercase',
  bg: '$accents1',
  color: '$accents6',
  fontSize: '$tiny',
  '&:first-child': {
    pl: '$8',
    br: '$md 0 0 $md'
  },
  '&:last-child': {
    pr: '$8',
    br: '0 $md $md 0'
  }
});

export const StyledTableCell = styled('td', {
  py: '$5',
  '&:first-child': {
    pl: '$8'
  },
  '&:last-child': {
    pr: '$8'
  }
});

export const StyledTableBody = styled('tbody', {
  [`& ${StyledTableRow}:first-child`]: {
    [`& ${StyledTableCell}`]: {
      pt: '$10'
    }
  }
});

export const StyledTableFoot = styled('tfoot', {});

export const StyledTable = styled('table', {
  borderCollapse: 'separate',
  borderSpacing: 0,
  width: '100%',
  variants: {
    striped: {
      true: {
        [`& ${StyledTableRow}:nth-child(even)`]: {
          [`& ${StyledTableCell}`]: {
            bg: '$accents1'
          },
          [`& ${StyledTableCell}:first-child`]: {
            br: '$lg 0 0 $lg'
          },
          [`& ${StyledTableCell}:last-child`]: {
            br: '0 $lg $lg 0'
          }
        }
      }
    },
    fixed: {
      true: {
        tableLayout: 'fixed'
      }
    },
    shadow: {
      true: {
        bs: '$md',
        p: '$lg $md',
        br: '$lg'
      }
    }
  },
  defaultVariants: {
    shadow: true
  }
});

export type TableVariantsProps = VariantProps<typeof StyledTable>;
