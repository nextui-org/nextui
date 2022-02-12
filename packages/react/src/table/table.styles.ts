import {
  styled,
  VariantProps,
  cssFocusVisible
} from '../theme/stitches.config';

export const StyledTableRowGroup = styled('thead', {});

export const StyledTableHeaderRow = styled('tr', {});

export const StyledTableColumnHeader = styled(
  'th',
  {
    cursor: 'default',
    bg: '$accents1',
    color: '$accents6',
    fontSize: '$tiny',
    variants: {
      align: {
        left: {
          textAlign: 'left'
        },
        center: {
          textAlign: 'center'
        },
        right: {
          textAlign: 'right'
        }
      }
    },
    defaultVariants: {
      align: 'left'
    }
  },
  cssFocusVisible
);

export const StyledTableHeaderCell = styled('th', {}, cssFocusVisible);

export const StyledTableHead = styled('thead', {
  height: '$14'
});

export const StyledTableRow = styled(
  'tr',
  {
    $$tableRowTextColor: '$colors$white',
    variants: {
      isSelected: {
        true: {
          bg: '$$tableRowSelectedColor',
          color: '$$tableRowTextColor'
        }
      }
    }
  },
  cssFocusVisible
);

export const StyledTableColumn = styled('th', {
  textAlign: 'left',
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

export const StyledTableCell = styled(
  'td',
  {
    py: '$5',
    '&:first-child': {
      pl: '$8'
    },
    '&:last-child': {
      pr: '$8'
    },
    variants: {
      align: {
        left: {
          textAlign: 'left'
        },
        center: {
          textAlign: 'center'
        },
        right: {
          textAlign: 'right'
        }
      }
    }
  },
  cssFocusVisible
);

export const StyledTableBody = styled('tbody', {
  [`& ${StyledTableRow}:first-child`]: {
    [`& ${StyledTableCell}`]: {
      pt: '$10'
    }
  }
});

export const StyledTableFoot = styled('tfoot', {});

export const StyledTableCaption = styled('caption', {
  captionSide: 'top',
  textAlign: 'left',
  color: '$accents6',
  fontWeight: '$semibold',
  fontSize: '$sm',
  margin: '$4'
});

export const StyledTable = styled('table', {
  borderCollapse: 'separate',
  borderSpacing: 0,
  width: '100%',
  [`& ${StyledTableCell}`]: {
    transition: 'background 0.25s ease'
  },
  '@motion': {
    [`& ${StyledTableCell}`]: {
      transition: 'none'
    }
  },
  variants: {
    selectedColor: {
      primary: {
        $$tableRowSelectedColor: '$colors$primaryLight'
      },
      secondary: {
        $$tableRowSelectedColor: '$colors$secondaryLight'
      },
      success: {
        $$tableRowSelectedColor: '$colors$successLight'
      },
      warning: {
        $$tableRowSelectedColor: '$colors$warningLight'
      },
      error: {
        $$tableRowSelectedColor: '$colors$errorLight'
      }
    },
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
    lineWeight: {
      light: {
        $$tableLineWeight: '$borderWeights$light'
      },
      normal: {
        $$tableLineWeight: '$borderWeights$normal'
      },
      bold: {
        $$tableLineWeight: '$borderWeights$bold'
      },
      extrabold: {
        $$tableLineWeight: '$borderWeights$extrabold'
      },
      black: {
        $$tableLineWeight: '$borderWeights$black'
      }
    },
    lined: {
      true: {
        [`& ${StyledTableRow}:not(:last-child)`]: {
          position: 'relative',
          [`& ${StyledTableCell}:after`]: {
            content: '',
            position: 'absolute',
            bottom: 0,
            left: '$space$md',
            right: '$space$md',
            height: '$$tableLineWeight',
            bg: '$border'
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
    },
    hoverable: {
      true: {
        [`& ${StyledTableCell}:first-child`]: {
          br: '$md 0 0 $md'
        },
        [`& ${StyledTableCell}:last-child`]: {
          br: '0 $md $md 0'
        },
        [`& ${StyledTableRow}`]: {
          '&:hover': {
            [`& ${StyledTableCell}`]: {
              bg: '$accents1'
            }
          }
        }
      }
    },
    compact: {
      true: {
        [`& ${StyledTableCell}`]: {
          py: '$1'
        }
      }
    }
  },
  defaultVariants: {
    shadow: true,
    selectedColor: 'primary',
    lineWeight: 'light'
  }
});

export type TableVariantsProps = VariantProps<typeof StyledTable>;
export type TableColumnHeaderVariants = VariantProps<
  typeof StyledTableColumnHeader
>;
