import type {VariantProps} from "tailwind-variants";

import {tv} from "../utils/tv";

/**
 * BreadcrumbsItem wrapper **Tailwind Variants** component
 *
 *
 * @example
 */
const breadcrumbsItem = tv({
  slots: {
    base: [],
  },
  variants: {},
});

/**
 * Breadcrumbs wrapper **Tailwind Variants** component
 *
 * const { base, section, heading } = menuSection({...})
 *
 * @example
 */
const breadcrumbs = tv({
  slots: {
    base: "",
  },
  variants: {},
});

export type BreadcrumbsVariantProps = VariantProps<typeof breadcrumbs>;
export type BreadcrumbsItemVariantProps = VariantProps<typeof breadcrumbsItem>;
export type BreadcrumbsItemSlots = keyof ReturnType<typeof breadcrumbsItem>;

export {breadcrumbs, breadcrumbsItem};
