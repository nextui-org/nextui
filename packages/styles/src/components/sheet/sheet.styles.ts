import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const sheetVariants = tv({
  defaultVariants: {
    backdrop: "opaque",
    placement: "bottom",
  },
  slots: {
    backdrop: "sheet__backdrop",
    body: "sheet__body",
    closeTrigger: "sheet__close-trigger",
    content: "sheet__content",
    dialog: "sheet__dialog",
    footer: "sheet__footer",
    handle: "sheet__handle",
    handleBar: "sheet__handle-bar",
    header: "sheet__header",
    heading: "sheet__heading",
    overlay: "sheet__overlay",
  },
  variants: {
    backdrop: {
      blur: {
        backdrop: "sheet__backdrop--blur",
      },
      opaque: {
        backdrop: "sheet__backdrop--opaque",
      },
      transparent: {
        backdrop: "sheet__backdrop--transparent",
      },
    },
    placement: {
      bottom: {
        content: "sheet__content--bottom",
        dialog: "sheet__dialog--bottom",
      },
      left: {
        content: "sheet__content--left",
        dialog: "sheet__dialog--left",
      },
      right: {
        content: "sheet__content--right",
        dialog: "sheet__dialog--right",
      },
      top: {
        content: "sheet__content--top",
        dialog: "sheet__dialog--top",
      },
    },
  },
});

export type SheetVariants = VariantProps<typeof sheetVariants>;
