import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

const focusRing = [
  "data-[focus-visible=true]:outline-none",
  "data-[focus-visible=true]:ring-2",
  "data-[focus-visible=true]:ring-primary",
  "data-[focus-visible=true]:ring-offset-2",
  "data-[focus-visible=true]:ring-offset-background",
  "data-[focus-visible=true]:dark:ring-offset-background-dark",
];

/**
 * Table **Tailwind Variants** component
 *
 * @example
 * ```js
 * const {base, table, thead, tbody, tr, th, td, tfoot} = table({...})
 *
 * <div className={base()}>
 *   <table className={table()}>
 *    <thead className={thead()}>
 *      <tr className={tr()}>
 *        <th className={th()}>...</th>
 *        <th className={th()}>...</th>
 *      </tr>
 *    </thead>
 *    <tbody className={tbody()}>
 *      <tr className={tr()}>
 *        <td className={td()}>...</td>
 *        <td className={td()}>...</td>
 *      </tr>
 *      <tr className={tr()}>
 *        <td className={td()}>...</td>
 *        <td className={td()}>...</td>
 *     </tr>
 *   </tbody>
 *    <tfoot className={tfoot()}>
 *      <tr className={tr()}>
 *        <td className={td()}>...</td>
 *        <td className={td()}>...</td>
 *      </tr>
 *    </tfoot>
 *  </table>
 * </div>
 * ```
 */
const table = tv({
  slots: {
    base: "flex flex-col items-center p-4 gap-4 border border-neutral-100 overflow-auto",
    table: "",
    thead: "",
    tbody: "",
    tr: ["group", "outline-none", ...focusRing],
    th: [
      "group",
      "px-3",
      "h-10",
      "text-left",
      "align-middle",
      "bg-neutral-100",
      "text-neutral-500",
      "text-xs",
      "font-semibold",
      "first:rounded-l-lg",
      "last:rounded-r-lg",
      "outline-none",
      "data-[sortable=true]:transition-colors",
      "data-[sortable=true]:cursor-pointer",
      "data-[hover=true]:text-neutral-400",
      ...focusRing,
    ],
    td: [
      "py-2",
      "px-3",
      "relative",
      "align-middle",
      "whitespace-normal",
      "text-base",
      "font-normal",
      "outline-none",
      ...focusRing,
      // before content for selection
      "before:content-['']",
      "before:absolute",
      "before:-z-[1]",
      "before:inset-0",
      "before:opacity-0",
      "data-[selected=true]:before:opacity-100",
      // disabled
      "group-data-[disabled=true]:text-neutral-300",
    ],
    tfoot: "",
    sortIcon: [
      "ml-2",
      "mb-px",
      "opacity-0",
      "text-inherit",
      "inline-block",
      "transition-transform-opacity",
      "data-[visible=true]:opacity-100",
      "group-data-[hover=true]:opacity-100",
      "data-[direction=descending]:rotate-0",
      "data-[direction=ascending]:rotate-180",
    ],
    emptyWrapper: "text-neutral-300 align-middle text-center h-36",
  },
  variants: {
    color: {
      neutral: {
        td:
          "before:bg-neutral-200 dark:before:bg-neutral-100 data-[selected=true]:text-neutral-foreground",
      },
      primary: {
        td: "before:bg-primary-50 data-[selected=true]:text-primary",
      },
      secondary: {
        td: "before:bg-secondary-100 data-[selected=true]:text-secondary",
      },
      success: {
        td: "before:bg-success-50 data-[selected=true]:text-success",
      },
      warning: {
        td: "before:bg-warning-50 data-[selected=true]:text-warning",
      },
      danger: {
        td: "before:bg-danger-50 data-[selected=true]:text-danger",
      },
    },
    layout: {
      auto: {
        table: "table-auto",
      },
      fixed: {
        table: "table-fixed",
      },
    },
    radius: {
      none: {
        base: "rounded-none",
      },
      base: {
        base: "rounded",
      },
      sm: {
        base: "rounded-sm",
      },
      md: {
        base: "rounded-md",
      },
      lg: {
        base: "rounded-lg",
      },
      xl: {
        base: "rounded-xl",
      },
      "2xl": {
        base: "rounded-2xl",
      },
    },
    shadow: {
      none: {
        base: "shadow-none",
      },
      sm: {
        base: "shadow-sm",
      },
      md: {
        base: "shadow-md",
      },
      lg: {
        base: "shadow-lg",
      },
      xl: {
        base: "shadow-xl",
      },
      "2xl": {
        base: "shadow-2xl",
      },
      inner: {
        base: "shadow-inner",
      },
    },
    hideHeader: {
      true: {
        thead: "hidden",
      },
    },
    isStriped: {
      true: {
        td: [
          "group-data-[odd=true]:before:bg-neutral-100",
          "group-data-[odd=true]:before:opacity-100",
        ],
      },
    },
    isSelectable: {
      true: {
        tr: "cursor-default",
        td: ["group-data-[hover=true]:before:opacity-70"],
      },
    },
    isMultiSelectable: {
      true: {
        td: [
          // first
          "group-data-[first=true]:first:before:rounded-tl-lg",
          "group-data-[first=true]:last:before:rounded-tr-lg",
          // middle
          "group-data-[middle=true]:before:rounded-none",
          // last
          "group-data-[last=true]:first:before:rounded-bl-lg",
          "group-data-[last=true]:last:before:rounded-br-lg",
        ],
      },
      false: {
        td: ["first:before:rounded-l-lg", "last:before:rounded-r-lg"],
      },
    },
    fullWidth: {
      true: {
        base: "w-full",
        table: "w-full",
      },
    },
  },
  defaultVariants: {
    layout: "auto",
    shadow: "lg",
    radius: "xl",
    color: "neutral",
    hideHeader: false,
    isStriped: false,
    fullWidth: true,
  },
});

export type TableVariantProps = VariantProps<typeof table>;
export type TableSlots = keyof ReturnType<typeof table>;
export type TableReturnType = ReturnType<typeof table>;

export {table};
