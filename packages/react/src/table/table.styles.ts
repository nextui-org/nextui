import {styled, VariantProps} from "../theme/stitches.config";
import {cssFocusVisible} from "../theme/shared-css";

export const StyledTableHeaderRow = styled("tr", {
  ov: "visible",
});

export const StyledTableColumnHeader = styled(
  "th",
  {
    height: '$14',
    cursor: 'default',
    bg: '$accents0',
    color: '$accents7',
    fontSize: '$xs',
    textAlign: 'left',
    position: 'relative',
    '@motion': {
      transition: 'none'
    },
    '&:first-child': {
      pl: '$8',
      btlr: '$md',
      bblr: '$md',
    },
    '&:last-child': {
      pr: '$8',
      btrr: '$md',
      bbrr: '$md'
    },
    variants: {
      align: {
        start: {
          textAlign: "left",
        },
        center: {
          textAlign: "center",
        },
        end: {
          textAlign: "right",
        },
      },
      animated: {
        false: {
          transition: "none",
        },
      },
      allowsSorting: {
        true: {
          transition: "background 0.25s ease 0s, color 0.25s ease 0s",
          cursor: "pointer",
          "@motion": {
            transition: "none",
          },
          "&:hover": {
            color: "$accents8",
            bg: "$accents1",
          },
        },
      },
    },
    defaultVariants: {
      align: "left",
      animated: true,
    },
    compoundVariants: [
      // !animated & allowsSorting
      {
        animated: false,
        allowsSorting: true,
        css: {
          transition: "none",
        },
      },
    ],
  },
  cssFocusVisible,
);

export const StyledTableHeaderCell = styled(StyledTableColumnHeader, cssFocusVisible);

export const StyledTableFooter = styled("tfoot", {
  height: "$14",
  variants: {
    align: {
      start: {
        textAlign: "left",
      },
      center: {
        textAlign: "center",
      },
      end: {
        textAlign: "right",
      },
    },
  },
  defaultVariants: {
    align: "right",
  },
});

export const StyledBaseTableCell = styled("td", {});

export const StyledTableCell = styled(
  StyledBaseTableCell,
  {
    position: "relative",
    userSelect: "none",
    py: "$5",
    pr: "$5",
    zIndex: "$2",
    ov: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    "&:first-child": {
      pl: "$8",
    },
    "&:last-child": {
      pr: "$8",
    },
    "&:before": {
      zIndex: "-$1",
      transition: "background 0.25s ease 0s, opacity 0.25s ease 0s",
      content: '""',
      position: "absolute",
      size: "100%",
      top: 0,
      left: 0,
      opacity: 0,
      transform: "translateZ(0)",
      backfaceVisibility: "hidden",
    },
    variants: {
      align: {
        start: {
          textAlign: "left",
        },
        center: {
          textAlign: "center",
        },
        end: {
          textAlign: "right",
        },
      },
    },
  },
  cssFocusVisible,
);

export const StyledTableRow = styled(
  "tr",
  {
    ov: "visible",
    color: "$text",
    variants: {
      isDisabled: {
        true: {
          color: "$accents3",
          pointerEvents: "none",
          cursor: "not-allowed",
        },
      },
      isSelected: {
        true: {
          color: "$$tableRowTextColor",
          [`& ${StyledTableCell}:before`]: {
            opacity: 1,
            bg: "$$tableRowColor",
          },
        },
      },
    },
  },
  cssFocusVisible,
);

export const StyledTableRowGroup = styled("thead", {
  variants: {
    isFixed: {
      true: {
        display: "table",
        width: "100%",
        tableLayout: "fixed",
      },
    },
    isInfinityScroll: {
      true: {
        display: "block",
        height: "100%",
        overflow: "auto",
        [`& ${StyledTableRow}`]: {
          display: "table",
          width: "100%",
          tableLayout: "fixed",
        },
      },
    },
  },
  defaultVariants: {
    isInfinityScroll: false,
  },
});

export const StyledTableLoadingRow = styled("tr", {
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "calc(100% - $space$14)",
  variants: {
    isAtEnd: {
      true: {
        height: "$space$18",
      },
    },
    isAbsolute: {
      true: {
        position: "absolute",
        left: "0",
        top: "$10",
      },
    },
  },
});

export const StyledTable = styled("table", {
  borderCollapse: "separate",
  borderSpacing: 0,
  width: "100%",
  p: "$md $sm",
  "@motion": {
    [`& ${StyledTableCell}:before`]: {
      transition: "none",
    },
  },
  variants: {
    animated: {
      false: {
        [`& ${StyledTableCell}:before`]: {
          transition: "none",
        },
      },
    },
    color: {
      primary: {
        $$tableRowColor: "$colors$primaryLight",
        $$tableRowTextColor: "$colors$primaryLightContrast",
      },
      secondary: {
        $$tableRowColor: "$colors$secondaryLight",
        $$tableRowTextColor: "$colors$secondaryLightContrast",
      },
      success: {
        $$tableRowColor: "$colors$successLight",
        $$tableRowTextColor: "$colors$successLightContrast",
      },
      warning: {
        $$tableRowColor: "$colors$warningLight",
        $$tableRowTextColor: "$colors$warningLightContrast",
      },
      error: {
        $$tableRowColor: "$colors$errorLight",
        $$tableRowTextColor: "$colors$errorLightContrast",
      },
    },
    striped: {
      true: {
        [`& ${StyledTableRow}[aria-selected=false]:nth-child(even)`]: {
          [`& ${StyledTableCell}`]: {
            bg: "$accents0",
          },
        },
        [`& ${StyledTableRow}:nth-child(even)`]: {
          [`& ${StyledTableCell}:first-child`]: {
            br: "$lg 0 0 $lg",
          },
          [`& ${StyledTableCell}:last-child`]: {
            br: "0 $lg $lg 0",
          },
        },
      },
    },
    sticked: {
      true: {
        p: 0,
        [`& ${StyledTableColumnHeader}:first-child`]: {
          br: "$lg 0 0 0",
        },
        [`& ${StyledTableColumnHeader}:last-child`]: {
          br: "0 $lg 0 0",
        },
      },
    },
    lineWeight: {
      light: {
        $$tableLineWeight: "$borderWeights$light",
      },
      normal: {
        $$tableLineWeight: "$borderWeights$normal",
      },
      bold: {
        $$tableLineWeight: "$borderWeights$bold",
      },
      extrabold: {
        $$tableLineWeight: "$borderWeights$extrabold",
      },
      black: {
        $$tableLineWeight: "$borderWeights$black",
      },
    },
    headerLined: {
      true: {
        [`& ${StyledTableColumnHeader}`]: {
          position: "relative",
          bg: "transparent",
          "&:after": {
            content: "",
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: "calc($$tableLineWeight * 1.5)",
            bg: "$accents1",
          },
          "&:first-child": {
            ml: "$12",
            br: "0",
            "&:after": {
              left: "$space$md",
            },
          },
          "&:last-child": {
            br: "0",
            "&:after": {
              right: "$space$md",
            },
          },
        },
      },
    },
    lined: {
      true: {
        [`& ${StyledTableRow}:not(:last-child)`]: {
          position: "relative",
          [`& ${StyledTableCell}:after`]: {
            content: "",
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "$$tableLineWeight",
            bg: "$border",
          },
          [`& ${StyledTableCell}:first-child`]: {
            "&:after": {
              left: "$space$md",
            },
          },
          [`& ${StyledTableCell}:last-child`]: {
            "&:after": {
              right: "$space$md",
            },
          },
        },
        [`& ${StyledTableRow}[aria-selected=true]:not(last-child)`]: {
          [`& ${StyledTableCell}:after`]: {
            bg: "$$tableRowTextColor",
            opacity: 0.3,
          },
        },
      },
    },
    fixed: {
      true: {
        tableLayout: "fixed",
      },
    },
    hoverable: {
      true: {
        [`& ${StyledTableCell}:first-child`]: {
          br: "$md 0 0 $md",
        },
        [`& ${StyledTableCell}:last-child`]: {
          br: "0 $md $md 0",
        },
        [`& ${StyledTableRow}`]: {
          cursor: "pointer",
        },
        [`& ${StyledTableRow}[aria-selected=false]`]: {
          "&:hover": {
            [`& ${StyledTableCell}:before`]: {
              opacity: 1,
              bg: "$accents0",
            },
          },
        },
        [`& ${StyledTableRow}[aria-selected=true]`]: {
          "&:hover": {
            [`& ${StyledTableCell}:before`]: {
              opacity: 0.8,
            },
          },
        },
      },
      false: {
        [`& ${StyledTableCell}`]: {
          userSelect: "all",
        },
      },
    },
    isMultiple: {
      true: {},
    },
    hasPagination: {
      true: {},
    },
    shadow: {
      true: {},
    },
    compact: {
      true: {
        [`& ${StyledTableCell}`]: {
          py: "$1",
        },
        [`& ${StyledTableColumnHeader}`]: {
          height: "$12",
          "&:first-child": {
            br: "$sm 0 0 $sm",
          },
          "&:last-child": {
            br: "0 $sm $sm 0",
          },
        },
      },
    },
  },
  compoundVariants: [
    // isMultiple && hoverable
    {
      isMultiple: true,
      hoverable: true,
      css: {
        [`& ${StyledTableRow}:not(:first-child):not(:last-child)`]: {
          [`& ${StyledTableCell}:first-child`]: {
            br: 0,
          },
          [`& ${StyledTableCell}:last-child`]: {
            br: 0,
          },
        },
        [`& ${StyledTableRow}:first-child`]: {
          [`& ${StyledTableCell}:first-child`]: {
            br: "$md 0 0 0",
          },
          [`& ${StyledTableCell}:last-child`]: {
            br: "0 $md 0 0",
          },
        },
        [`& ${StyledTableRow}:last-child`]: {
          [`& ${StyledTableCell}:first-child`]: {
            br: "0 0 0 $md",
          },
          [`& ${StyledTableCell}:last-child`]: {
            br: "0 0 $md 0",
          },
        },
      },
    },
    // isMultiple && hoverable && sticked
    {
      isMultiple: true,
      hoverable: true,
      sticked: true,
      css: {
        [`& ${StyledTableRow}:first-child`]: {
          [`& ${StyledTableCell}:first-child`]: {
            br: "0",
          },
          [`& ${StyledTableCell}:last-child`]: {
            br: "0",
          },
        },
      },
    },
    // compact && shadow
    {
      compact: true,
      shadow: true,
      css: {
        p: "$md $sm",
      },
    },
    // compact && sticked
    {
      compact: true,
      sticked: true,
      css: {
        p: 0,
      },
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
            br: "0",
          },
        },
        [`& ${StyledTableRow}:last-child`]: {
          [`& ${StyledTableCell}:first-child`]: {
            br: "0 0 0 $md",
          },
          [`& ${StyledTableCell}:last-child`]: {
            br: "0 0 $md 0",
          },
        },
      },
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
            br: "0",
          },
        },
      },
    },
    // sticked && hasPagination
    {
      sticked: true,
      hasPagination: true,
      css: {
        pb: "$5",
      },
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
            br: "0",
          },
          [`& ${StyledTableCell}:last-child`]: {
            br: "0",
          },
        },
      },
    },
  ],
  defaultVariants: {
    sticked: false,
    color: "primary",
    lineWeight: "light",
  },
});

export const StyledTableContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  br: "$xl",
  overflowX: "auto",
  overflowY: "hidden",
  variants: {
    shadow: {
      true: {
        bs: "$md",
      },
    },
    bordered: {
      true: {
        borderStyle: "solid",
        borderColor: "$border",
      },
      false: {
        bw: 0,
      },
    },
    borderWeight: {
      light: {
        bw: "$light",
      },
      normal: {
        bw: "$normal",
      },
      bold: {
        bw: "$bold",
      },
      extrabold: {
        bw: "$extrabold",
      },
      black: {
        bw: "$black",
      },
    },
  },
  defaultVariants: {
    shadow: true,
    borderWeight: "normal",
  },
});

export type TableVariantsProps = VariantProps<typeof StyledTable>;
export type TableContainerVariantsProps = VariantProps<typeof StyledTableContainer>;
export type TableCellVariantsProps = VariantProps<typeof StyledTableCell>;
export type TableColumnHeaderVariantsProps = VariantProps<typeof StyledTableColumnHeader>;
export type TableFooterVatiantsProps = VariantProps<typeof StyledTableFooter>;
export type TableRowGroupVariants = VariantProps<typeof StyledTableRowGroup>;
