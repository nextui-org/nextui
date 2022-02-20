import {
  styled,
  VariantProps,
  cssFocusVisible
} from '../theme/stitches.config';

export const StyledTableRowGroup = styled('thead', {});

export const StyledTableHeaderRow = styled('tr', {
  ov: 'visible'
});

export const StyledTableColumnHeader = styled(
  'th',
  {
    height: '$14',
    cursor: 'default',
    bg: '$accents1',
    color: '$accents6',
    fontSize: '$tiny',
    textAlign: 'left',
    '&:first-child': {
      pl: '$8',
      br: '$md 0 0 $md'
    },
    '&:last-child': {
      pr: '$8',
      br: '0 $md $md 0'
    },
    variants: {
      align: {
        start: {
          textAlign: 'left'
        },
        center: {
          textAlign: 'center'
        },
        end: {
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

export const StyledTableHeaderCell = styled(
  StyledTableColumnHeader,
  cssFocusVisible
);

export const StyledTableFooter = styled('tfoot', {
  height: '$14',
  variants: {
    align: {
      start: {
        textAlign: 'left'
      },
      center: {
        textAlign: 'center'
      },
      end: {
        textAlign: 'right'
      }
    }
  },
  defaultVariants: {
    align: 'right'
  }
});

export const StyledTableCell = styled(
  'td',
  {
    position: 'relative',
    userSelect: 'none',
    py: '$5',
    zIndex: '$2',
    transition:
      'background 0.25s ease 0s, box-shadow 0.25s ease 0s, opacity 0.25s ease 0s',
    ov: 'hidden',
    '&:first-child': {
      pl: '$8'
    },
    '&:last-child': {
      pr: '$8'
    },
    '&:before': {
      zIndex: '-$1',
      transition: '$default',
      content: '""',
      position: 'absolute',
      size: '100%',
      top: 0,
      left: 0,
      opacity: 0
    },
    variants: {
      align: {
        start: {
          textAlign: 'left'
        },
        center: {
          textAlign: 'center'
        },
        end: {
          textAlign: 'right'
        }
      }
    }
  },
  cssFocusVisible
);

export const StyledTableRow = styled(
  'tr',
  {
    ov: 'visible',
    variants: {
      isSelected: {
        true: {
          color: '$$tableRowTextColor',
          [`& ${StyledTableCell}:before`]: {
            opacity: 1,
            bg: '$$tableRowSelectedColor'
          }
        }
      }
    }
  },
  cssFocusVisible
);

export const StyledTable = styled('table', {
  borderCollapse: 'separate',
  borderSpacing: 0,
  width: '100%',
  br: '$xl',
  p: '$md $sm',
  '@motion': {
    [`& ${StyledTableCell}`]: {
      transition: 'none'
    },
    [`& ${StyledTableCell}:before`]: {
      transition: 'none'
    }
  },
  variants: {
    animated: {
      false: {
        [`& ${StyledTableCell}`]: {
          transition: 'none'
        },
        [`& ${StyledTableCell}:before`]: {
          transition: 'none'
        }
      }
    },
    selectedColor: {
      primary: {
        $$tableRowSelectedColor: '$colors$primaryLight',
        $$tableRowTextColor: '$colors$primary'
      },
      secondary: {
        $$tableRowSelectedColor: '$colors$secondaryLight',
        $$tableRowTextColor: '$colors$secondary'
      },
      success: {
        $$tableRowSelectedColor: '$colors$successLight',
        $$tableRowTextColor: '$colors$success'
      },
      warning: {
        $$tableRowSelectedColor: '$colors$warningLight',
        $$tableRowTextColor: '$colors$warning'
      },
      error: {
        $$tableRowSelectedColor: '$colors$errorLight',
        $$tableRowTextColor: '$colors$error'
      }
    },
    striped: {
      true: {
        [`& ${StyledTableRow}[aria-selected=false]:nth-child(even)`]: {
          [`& ${StyledTableCell}`]: {
            bg: '$accents1'
          }
        },
        [`& ${StyledTableRow}:nth-child(even)`]: {
          [`& ${StyledTableCell}:first-child`]: {
            br: '$lg 0 0 $lg'
          },
          [`& ${StyledTableCell}:last-child`]: {
            br: '0 $lg $lg 0'
          }
        }
      }
    },
    sticked: {
      true: {
        p: 0,
        [`& ${StyledTableColumnHeader}:first-child`]: {
          br: '$lg 0 0 0'
        },
        [`& ${StyledTableColumnHeader}:last-child`]: {
          br: '0 $lg 0 0'
        }
      }
    },
    bordered: {
      true: {
        ov: 'hidden',
        borderStyle: 'solid',
        borderColor: '$border'
      },
      false: {
        bw: 0
      }
    },
    borderWeight: {
      light: {
        bw: '$light'
      },
      normal: {
        bw: '$normal'
      },
      bold: {
        bw: '$bold'
      },
      extrabold: {
        bw: '$extrabold'
      },
      black: {
        bw: '$black'
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
    headerLined: {
      true: {
        [`& ${StyledTableColumnHeader}`]: {
          position: 'relative',
          bg: 'transparent',
          '&:after': {
            content: '',
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: 'calc($$tableLineWeight * 1.5)',
            bg: '$accents2'
          },
          '&:first-child': {
            ml: '$12',
            br: '0',
            '&:after': {
              left: '$space$md'
            }
          },
          '&:last-child': {
            br: '0',
            '&:after': {
              right: '$space$md'
            }
          }
        }
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
            left: 0,
            right: 0,
            height: '$$tableLineWeight',
            bg: '$border'
          },
          [`& ${StyledTableCell}:first-child`]: {
            '&:after': {
              left: '$space$md'
            }
          },
          [`& ${StyledTableCell}:last-child`]: {
            '&:after': {
              right: '$space$md'
            }
          }
        },
        [`& ${StyledTableRow}[aria-selected=true]:not(last-child)`]: {
          [`& ${StyledTableCell}:after`]: {
            bg: '$$tableRowTextColor',
            opacity: 0.3
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
        bs: '$md'
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
          cursor: 'pointer'
        },
        [`& ${StyledTableRow}[aria-selected=false]`]: {
          '&:hover': {
            [`& ${StyledTableCell}:before`]: {
              opacity: 1,
              bg: '$accents1'
            }
          }
        },
        [`& ${StyledTableRow}[aria-selected=true]`]: {
          '&:hover': {
            [`& ${StyledTableCell}:before`]: {
              opacity: 0.8
            }
          }
        }
      },
      false: {
        [`& ${StyledTableCell}`]: {
          userSelect: 'all'
        }
      }
    },
    isMultiple: {
      true: {}
    },
    compact: {
      true: {
        [`& ${StyledTableCell}`]: {
          py: '$1'
        },
        [`& ${StyledTableColumnHeader}`]: {
          height: '$12',
          '&:first-child': {
            br: '$sm 0 0 $sm'
          },
          '&:last-child': {
            br: '0 $sm $sm 0'
          }
        }
      }
    }
  },
  compoundVariants: [
    // isMultiple && hoverable
    {
      isMultiple: true,
      hoverable: true,
      css: {
        [`& ${StyledTableRow}:not(:first-child):not(:last-child)`]: {
          [`& ${StyledTableCell}:first-child`]: {
            br: 0
          },
          [`& ${StyledTableCell}:last-child`]: {
            br: 0
          }
        },
        [`& ${StyledTableRow}:first-child`]: {
          [`& ${StyledTableCell}:first-child`]: {
            br: '$md 0 0 0'
          },
          [`& ${StyledTableCell}:last-child`]: {
            br: '0 $md 0 0'
          }
        },
        [`& ${StyledTableRow}:last-child`]: {
          [`& ${StyledTableCell}:first-child`]: {
            br: '0 0 0 $md'
          },
          [`& ${StyledTableCell}:last-child`]: {
            br: '0 0 $md 0'
          }
        }
      }
    },
    // isMultiple && hoverable && sticked
    {
      isMultiple: true,
      hoverable: true,
      sticked: true,
      css: {
        [`& ${StyledTableRow}:first-child`]: {
          [`& ${StyledTableCell}:first-child`]: {
            br: '0'
          },
          [`& ${StyledTableCell}:last-child`]: {
            br: '0'
          }
        }
      }
    },
    // compact && shadow
    {
      compact: true,
      shadow: true,
      css: {
        p: '$md $sm'
      }
    },
    // compact && sticked
    {
      compact: true,
      sticked: true,
      css: {
        p: 0
      }
    }
  ],
  defaultVariants: {
    shadow: true,
    selectedColor: 'primary',
    borderWeight: 'normal',
    lineWeight: 'light'
  }
});

export type TableVariantsProps = VariantProps<typeof StyledTable>;
export type TableCellVariantsProps = VariantProps<typeof StyledTableCell>;
export type TableColumnHeaderVariantsProps = VariantProps<
  typeof StyledTableColumnHeader
>;
export type TableFooterVatiantsProps = VariantProps<typeof StyledTableFooter>;
