import {
  styled,
  VariantProps,
  cssFocusVisible
} from '../theme/stitches.config';

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
    transition: '$default',
    position: 'relative',
    '@motion': {
      transition: 'none'
    },
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
      },
      animated: {
        false: {
          transition: 'none'
        }
      },
      allowsSorting: {
        true: {
          cursor: 'pointer',
          '&:hover': {
            color: '$accents7',
            bg: '$accents2'
          }
        }
      }
    },
    defaultVariants: {
      align: 'left',
      animated: true
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

export const StyledBaseTableCell = styled('td', {});

export const StyledTableCell = styled(
  StyledBaseTableCell,
  {
    position: 'relative',
    userSelect: 'none',
    py: '$5',
    zIndex: '$2',
    transition:
      'background 0.25s ease 0s, box-shadow 0.25s ease 0s, opacity 0.25s ease 0s',
    ov: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
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
    '@xsMax': {
      fontSize: '$xs'
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
      isDisabled: {
        true: {
          color: '$accents3',
          pointerEvents: 'none',
          cursor: 'not-allowed'
        }
      },
      isSelected: {
        true: {
          color: '$$tableRowTextColor',
          [`& ${StyledTableCell}:before`]: {
            opacity: 1,
            bg: '$$tableRowColor'
          }
        }
      }
    }
  },
  cssFocusVisible
);

export const StyledTableRowGroup = styled('thead', {
  variants: {
    isFixed: {
      true: {
        display: 'table',
        width: '100%',
        tableLayout: 'fixed'
      }
    },
    isInfinityScroll: {
      true: {
        display: 'block',
        height: '100%',
        overflow: 'auto',
        [`& ${StyledTableRow}`]: {
          display: 'table',
          width: '100%',
          tableLayout: 'fixed'
        }
      }
    }
  },
  defaultVariants: {
    isInfinityScroll: false
  }
});

export const StyledTableLoadingRow = styled('tr', {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 'calc(100% - $space$14)',
  variants: {
    isAtEnd: {
      true: {
        height: '$space$18'
      }
    },
    isAbsolute: {
      true: {
        position: 'absolute',
        left: '0',
        top: '$10'
      }
    }
  }
});

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
  '@xsMax': {
    overflowX: 'auto'
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
    color: {
      primary: {
        $$tableRowColor: '$colors$primaryLight',
        $$tableRowTextColor: '$colors$primary'
      },
      secondary: {
        $$tableRowColor: '$colors$secondaryLight',
        $$tableRowTextColor: '$colors$secondary'
      },
      success: {
        $$tableRowColor: '$colors$successLight',
        $$tableRowTextColor: '$colors$success'
      },
      warning: {
        $$tableRowColor: '$colors$warningLight',
        $$tableRowTextColor: '$colors$warning'
      },
      error: {
        $$tableRowColor: '$colors$errorLight',
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
    hasPagination: {
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
    },
    // sticked && !isMultiple && hoverable && !hasPagination
    {
      sticked: true,
      isMultiple: false,
      hoverable: true,
      hasPagination: false,
      css: {
        [`& ${StyledTableRow}:not(:last-child)`]: {
          [`& ${StyledTableCell}`]: {
            br: '0'
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
    // sticked && !isMultiple && hoverable && hasPagination
    {
      sticked: true,
      isMultiple: false,
      hoverable: true,
      hasPagination: true,
      css: {
        [`& ${StyledTableRow}`]: {
          [`& ${StyledTableCell}`]: {
            br: '0'
          }
        }
      }
    },
    // sticked && hasPagination
    {
      sticked: true,
      hasPagination: true,
      css: {
        pb: '$5'
      }
    },
    // sticked && hasPagination && isMultiple && hoverable
    {
      sticked: true,
      hasPagination: true,
      isMultiple: true,
      hoverable: true,
      css: {
        [`& ${StyledTableRow}:last-child`]: {
          [`& ${StyledTableCell}:first-child`]: {
            br: '0'
          },
          [`& ${StyledTableCell}:last-child`]: {
            br: '0'
          }
        }
      }
    }
  ],
  defaultVariants: {
    shadow: true,
    sticked: false,
    color: 'primary',
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
export type TableRowGroupVariants = VariantProps<typeof StyledTableRowGroup>;
