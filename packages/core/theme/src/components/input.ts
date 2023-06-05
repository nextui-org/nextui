import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

/**
 * Input wrapper **Tailwind Variants** component
 *
 * @example
 * ```js
 * const {base, label, inputWrapper, input, clearButton, description, errorMessage} = input({...})
 *
 * <div className={base())}>
 *  <label className={label()}>Label</label>
 *  <div className={inputWrapper()}>
 *    <input className={input()}/>
 *    <button className={clearButton()}>Clear</button>
 *  </div>
 *  <span className={description()}>Description</span>
 *  <span className={errorMessage()}>Invalid input</span>
 * </div>
 * ```
 */
const input = tv({
  slots: {
    base: "group flex flex-col data-[has-elements=true]:gap-2",
    label: "block text-sm font-medium text-default-600",
    inputWrapper: "relative w-full inline-flex flex-row items-center shadow-sm px-3 gap-3",
    innerWrapper: "inline-flex h-full items-center w-full gap-1.5 box-border",
    input: "w-full h-full font-normal !bg-transparent outline-none placeholder:text-default-500",
    clearButton: [
      "z-10",
      "hidden",
      "absolute",
      "right-3",
      "appearance-none",
      "outline-none",
      "select-none",
      "opacity-0",
      "hover:!opacity-100",
      "cursor-pointer",
      "active:!opacity-70",
      "rounded-full",
      // focus ring
      "data-[focus-visible]:outline-none",
      "data-[focus-visible]:ring-2",
      "data-[focus-visible]:!ring-primary",
      "data-[focus-visible]:ring-offset-2",
      "data-[focus-visible]:ring-offset-background",
      "data-[focus-visible]:dark:ring-offset-background-dark",
    ],
    description: "text-xs text-default-400",
    errorMessage: "text-xs text-danger",
  },
  variants: {
    variant: {
      flat: {
        inputWrapper: [
          "bg-default-100",
          "data-[hover=true]:bg-default-200",
          "group-data-[focus=true]:bg-default-100",
        ],
      },
      faded: {
        inputWrapper: [
          "bg-default-100",
          "border-2",
          "border-default-200",
          "data-[hover=true]:border-default-400",
        ],
      },
      bordered: {
        inputWrapper: [
          "border-2",
          "border-default-200",
          "data-[hover=true]:border-default-400",
          "group-data-[focus=true]:border-foreground",
        ],
      },
      underlined: {
        inputWrapper: [
          "!px-1",
          "!pb-0",
          "!gap-0",
          "relative",
          "box-border",
          "border-b-2",
          "shadow-[0_1px_0px_0_rgba(0,0,0,0.05)]",
          "border-default-200",
          "!rounded-none",
          "hover:border-default-300",
          "after:content-['']",
          "after:w-0",
          "after:origin-center",
          "after:bg-foreground",
          "after:absolute",
          "after:left-1/2",
          "after:-translate-x-1/2",
          "after:-bottom-[2px]",
          "after:h-[2px]",
          "group-data-[focus=true]:after:w-full",
        ],
      },
    },
    color: {
      default: {},
      primary: {
        label: "text-primary",
      },
      secondary: {
        label: "text-secondary",
      },
      success: {
        label: "text-success",
      },
      warning: {
        label: "text-warning",
      },
      danger: {
        label: "text-danger",
      },
    },
    size: {
      xs: {
        label: "text-xs",
        inputWrapper: "h-6 px-1",
        input: "text-xs",
        clearButton: "right-2 text-sm",
      },
      sm: {
        label: "text-xs",
        inputWrapper: "h-8 px-2",
        input: "text-xs",
        clearButton: "text-base",
      },
      md: {
        inputWrapper: "h-10",
        input: "text-sm",
        clearButton: "text-lg",
      },
      lg: {
        inputWrapper: "h-12",
        input: "text-base",
        clearButton: "text-xl",
      },
      xl: {
        inputWrapper: "h-14",
        input: "text-base",
        clearButton: "text-xl right-3.5",
      },
    },
    radius: {
      none: {
        inputWrapper: "rounded-none",
      },
      base: {
        inputWrapper: "rounded",
      },
      sm: {
        inputWrapper: "rounded-sm",
      },
      md: {
        inputWrapper: "rounded-md",
      },
      lg: {
        inputWrapper: "rounded-lg",
      },
      xl: {
        inputWrapper: "rounded-xl",
      },
      full: {
        inputWrapper: "rounded-full",
      },
    },
    labelPlacement: {
      outside: {
        label: "text-foreground",
      },
      "outside-left": {
        base: "flex-row items-center flex-wrap",
        inputWrapper: "flex-1",
        label: "text-foreground",
      },
      inside: {
        label: "text-xs",
        inputWrapper: "flex-col items-start justify-center gap-0",
      },
    },
    fullWidth: {
      true: {
        base: "w-full",
      },
    },
    isLabelPlaceholder: {
      true: {
        label: "absolute z-10 pointer-events-none",
      },
    },
    isClearable: {
      true: {
        input: "peer pr-6",
        clearButton: "peer-[.is-filled]:opacity-70 peer-[.is-filled]:block",
      },
    },
    isDisabled: {
      true: {
        base: "opacity-50 pointer-events-none",
      },
    },
    isInvalid: {
      true: {
        label: "!text-danger",
        input: "placeholder:text-danger text-danger",
      },
    },
    isRequired: {
      true: {
        label: "after:content-['*'] after:text-danger after:ml-0.5",
      },
    },
    isMultiline: {
      true: {
        inputWrapper: "!h-auto",
        input: "resize-none py-2",
      },
    },
    disableAnimation: {
      true: {
        inputWrapper: "transition-none",
        label: "transition-none",
      },
      false: {
        inputWrapper: "transition-background motion-reduce:transition-none !duration-150",
        label: [
          "will-change-auto",
          "origin-top-left",
          "transition-all",
          "!duration-200",
          "!ease-[cubic-bezier(0,0,0.2,1)]",
          "motion-reduce:transition-none",
        ],
        clearButton: ["transition-opacity", "motion-reduce:transition-none"],
      },
    },
  },
  defaultVariants: {
    variant: "flat",
    color: "default",
    size: "md",
    radius: "lg",
    fullWidth: true,
    labelPlacement: "inside",
    isDisabled: false,
    disableAnimation: false,
  },
  compoundVariants: [
    // flat & color
    {
      variant: "flat",
      color: "primary",
      class: {
        inputWrapper: [
          "bg-primary-50",
          "data-[hover=true]:bg-primary-100",
          "text-primary",
          "group-data-[focus=true]:bg-primary-50",
          "placeholder:text-primary",
        ],
        input: "placeholder:text-primary",
      },
    },
    {
      variant: "flat",
      color: "secondary",
      class: {
        inputWrapper: [
          "bg-secondary-50",
          "text-secondary",
          "data-[hover=true]:bg-secondary-100",
          "group-data-[focus=true]:bg-secondary-50",
          "placeholder:text-secondary",
        ],
        input: "placeholder:text-secondary",
      },
    },
    {
      variant: "flat",
      color: "success",
      class: {
        inputWrapper: [
          "bg-success-50",
          "data-[hover=true]:bg-success-100",
          "text-success",
          "group-data-[focus=true]:bg-success-50",
          "placeholder:text-success",
        ],
        input: "placeholder:text-success",
      },
    },
    {
      variant: "flat",
      color: "warning",
      class: {
        inputWrapper: [
          "bg-warning-50",
          "data-[hover=true]:bg-warning-100",
          "text-warning",
          "group-data-[focus=true]:bg-warning-50",
          "placeholder:text-warning",
        ],
        input: "placeholder:text-warning",
      },
    },
    {
      variant: "flat",
      color: "danger",
      class: {
        inputWrapper: [
          "bg-danger-50",
          "data-[hover=true]:bg-danger-100",
          "text-danger",
          "group-data-[focus=true]:bg-danger-50",
          "placeholder:text-danger",
        ],
        input: "placeholder:text-danger",
      },
    },
    // faded & color
    {
      variant: "faded",
      color: "primary",
      class: {
        label: "text-primary",
        inputWrapper: "data-[hover=true]:border-primary focus-within:border-primary",
      },
    },
    {
      variant: "faded",
      color: "secondary",
      class: {
        label: "text-secondary",
        inputWrapper: "data-[hover=true]:border-secondary focus-within:border-secondary",
      },
    },
    {
      variant: "faded",
      color: "success",
      class: {
        label: "text-success",
        inputWrapper: "data-[hover=true]:border-success focus-within:border-success",
      },
    },
    {
      variant: "faded",
      color: "warning",
      class: {
        label: "text-warning",
        inputWrapper: "data-[hover=true]:border-warning focus-within:border-warning",
      },
    },
    {
      variant: "faded",
      color: "danger",
      class: {
        label: "text-danger",
        inputWrapper: "data-[hover=true]:border-danger focus-within:border-danger",
      },
    },
    // underlined & color
    {
      variant: "underlined",
      color: "primary",
      class: {
        inputWrapper: "after:bg-primary",
      },
    },
    {
      variant: "underlined",
      color: "secondary",
      class: {
        inputWrapper: "after:bg-secondary",
      },
    },
    {
      variant: "underlined",
      color: "success",
      class: {
        inputWrapper: "after:bg-success",
      },
    },
    {
      variant: "underlined",
      color: "warning",
      class: {
        inputWrapper: "after:bg-warning",
      },
    },
    {
      variant: "underlined",
      color: "danger",
      class: {
        inputWrapper: "after:bg-danger",
      },
    },
    // bordered & color
    {
      variant: "bordered",
      color: "primary",
      class: {
        inputWrapper: "group-data-[focus=true]:border-primary",
      },
    },
    {
      variant: "bordered",
      color: "secondary",
      class: {
        inputWrapper: "group-data-[focus=true]:border-secondary",
      },
    },
    {
      variant: "bordered",
      color: "success",
      class: {
        inputWrapper: "group-data-[focus=true]:border-success",
      },
    },
    {
      variant: "bordered",
      color: "warning",
      class: {
        inputWrapper: "group-data-[focus=true]:border-warning",
      },
    },
    {
      variant: "bordered",
      color: "danger",
      class: {
        inputWrapper: "group-data-[focus=true]:border-danger",
      },
    },
    // radius-full & size
    {
      radius: "full",
      size: ["xs", "sm"],
      class: {
        inputWrapper: "px-3",
      },
    },
    {
      radius: "full",
      size: "md",
      class: {
        inputWrapper: "px-4",
      },
    },
    {
      radius: "full",
      size: "lg",
      class: {
        inputWrapper: "px-5",
      },
    },
    {
      radius: "full",
      size: "xl",
      class: {
        inputWrapper: "px-6",
      },
    },
    // !disableAnimation & variant
    {
      disableAnimation: false,
      variant: ["faded", "bordered"],
      class: {
        inputWrapper: "transition-colors motion-reduce:transition-none",
      },
    },
    {
      disableAnimation: false,
      variant: "underlined",
      class: {
        inputWrapper: "after:transition-width motion-reduce:after:transition-none",
      },
    },
    // flat & faded
    {
      variant: ["flat", "faded"],
      class: {
        inputWrapper: [
          // focus ring
          "group-data-[focus-visible]:outline-none",
          "group-data-[focus-visible]:ring-2",
          "group-data-[focus-visible]:!ring-primary",
          "group-data-[focus-visible]:ring-offset-2",
          "group-data-[focus-visible]:ring-offset-background",
          "group-data-[focus-visible]:dark:ring-offset-background-dark",
        ],
      },
    },
    // isInvalid & variant
    {
      isInvalid: true,
      variant: "flat",
      class: {
        inputWrapper: [
          "bg-danger-50",
          "data-[hover=true]:bg-danger-100",
          "group-data-[focus=true]:bg-danger-50",
        ],
      },
    },
    {
      isInvalid: true,
      variant: "bordered",
      class: {
        inputWrapper: "!border-danger group-data-[focus=true]:border-danger",
      },
    },
    {
      isInvalid: true,
      variant: "underlined",
      class: {
        inputWrapper: "after:bg-danger",
      },
    },
    // size & labelPlacement
    {
      labelPlacement: "inside",
      size: "xs",
      class: {
        label: "text-[0.6rem]",
        inputWrapper: "h-10 py-1 px-2",
      },
    },
    {
      labelPlacement: "inside",
      size: "sm",
      class: {
        inputWrapper: "h-12 py-1.5 px-3",
      },
    },
    {
      labelPlacement: "inside",
      size: "md",
      class: {
        inputWrapper: "h-14 py-2",
      },
    },
    {
      labelPlacement: "inside",
      size: "lg",
      class: {
        label: "text-sm",
        inputWrapper: "h-16 py-2.5 gap-1",
      },
    },
    {
      labelPlacement: "inside",
      size: "xl",
      class: {
        label: "text-sm",
        inputWrapper: "h-20 p-4 gap-2",
      },
    },
    // isLabelPlaceholder & labelPlacement
    {
      isLabelPlaceholder: true,
      labelPlacement: ["inside", "outside"],
      class: {
        label: [
          "font-normal",
          "text-default-500",
          "group-focus-within:font-medium",
          "group-[.is-filled]:font-medium",
          "group-focus-within:pointer-events-auto",
          "group-[.is-filled]:pointer-events-auto",
        ],
      },
    },
    {
      isLabelPlaceholder: true,
      labelPlacement: "inside",
      class: {
        inputWrapper: "group",
        label: ["group-focus-within:text-default-600", "group-[.is-filled]:text-default-600"],
      },
    },
    {
      isLabelPlaceholder: true,
      labelPlacement: "outside",
      class: {
        base: "group relative justify-end",
        label: [
          "group-focus-within:left-0",
          "group-[.is-filled]:left-0",
          "group-focus-within:text-foreground",
          "group-[.is-filled]:text-foreground",
        ],
      },
    },
    // isLabelPlaceholder & color
    {
      isLabelPlaceholder: true,
      color: "primary",
      class: {
        label: ["group-focus-within:text-primary", "group-[.is-filled]:text-primary"],
      },
    },
    {
      isLabelPlaceholder: true,
      color: "secondary",
      class: {
        label: ["group-focus-within:text-secondary", "group-[.is-filled]:text-secondary"],
      },
    },
    {
      isLabelPlaceholder: true,
      color: "success",
      class: {
        label: ["group-focus-within:text-success", "group-[.is-filled]:text-success"],
      },
    },
    {
      isLabelPlaceholder: true,
      color: "warning",
      class: {
        label: ["group-focus-within:text-warning", "group-[.is-filled]:text-warning"],
      },
    },
    {
      isLabelPlaceholder: true,
      color: "danger",
      class: {
        label: ["group-focus-within:text-danger", "group-[.is-filled]:text-danger"],
      },
    },
    // isLabelPlaceholder & underlined
    {
      isLabelPlaceholder: true,
      variant: "underlined",
      class: {
        label: ["group-focus-within:pt-0", "group-[.is-filled]:pt-0"],
      },
    },
    // isLabelPlaceholder & underlined & size
    {
      isLabelPlaceholder: true,
      variant: "underlined",
      size: "xs",
      class: {
        label: ["pt-2"],
      },
    },
    {
      isLabelPlaceholder: true,
      variant: "underlined",
      size: "sm",
      class: {
        label: ["pt-3"],
      },
    },
    {
      isLabelPlaceholder: true,
      variant: "underlined",
      size: "md",
      class: {
        label: ["pt-4"],
      },
    },
    {
      isLabelPlaceholder: true,
      variant: "underlined",
      size: "lg",
      class: {
        label: ["pt-5"],
      },
    },
    {
      isLabelPlaceholder: true,
      variant: "underlined",
      size: "xl",
      class: {
        label: ["pt-6"],
      },
    },
    // isLabelPlaceholder & inside & size
    {
      isLabelPlaceholder: true,
      labelPlacement: "inside",
      size: "xs",
      class: {
        label: [
          "text-xs",
          "group-focus-within:text-[0.6rem]",
          "group-focus-within:-translate-y-2",
          "group-[.is-filled]:text-[0.6rem]",
          "group-[.is-filled]:-translate-y-2",
        ],
        input: "pt-4",
      },
    },
    {
      isLabelPlaceholder: true,
      labelPlacement: "inside",
      size: ["sm", "md"],
      class: {
        label: ["text-sm", "group-focus-within:text-xs", "group-[.is-filled]:text-xs"],
        input: "pt-4",
      },
    },
    {
      isLabelPlaceholder: true,
      labelPlacement: "inside",
      size: "sm",
      class: {
        label: ["group-focus-within:-translate-y-2.5", "group-[.is-filled]:-translate-y-2.5"],
        input: "pt-4",
      },
    },
    {
      isLabelPlaceholder: true,
      labelPlacement: "inside",
      size: "md",
      class: {
        label: ["group-focus-within:-translate-y-3", "group-[.is-filled]:-translate-y-3"],
        input: "pt-4",
      },
    },
    {
      isLabelPlaceholder: true,
      labelPlacement: "inside",
      size: "lg",
      class: {
        label: [
          "text-base",
          "group-focus-within:text-sm",
          "group-focus-within:-translate-y-3",
          "group-[.is-filled]:text-sm",
          "group-[.is-filled]:-translate-y-3",
        ],
        input: "pt-6",
      },
    },
    {
      isLabelPlaceholder: true,
      labelPlacement: "inside",
      size: "xl",
      class: {
        label: [
          "text-base",
          "group-focus-within:text-sm",
          "group-focus-within:-translate-y-3",
          "group-[.is-filled]:text-sm",
          "group-[.is-filled]:-translate-y-3",
        ],
        input: "pt-8",
      },
    },
    // isLabelPlaceholder & outside & size
    {
      isLabelPlaceholder: true,
      labelPlacement: "outside",
      size: "xs",
      class: {
        label: [
          "text-xs",
          "bottom-1",
          "left-1",
          "group-focus-within:bottom-8",
          "group-[.is-filled]:bottom-8",
        ],
      },
    },
    {
      isLabelPlaceholder: true,
      labelPlacement: "outside",
      size: "sm",
      class: {
        label: [
          "text-xs",
          "bottom-2",
          "left-2",
          "group-focus-within:bottom-10",
          "group-[.is-filled]:bottom-10",
        ],
      },
    },
    {
      isLabelPlaceholder: true,
      labelPlacement: "outside",
      size: "md",
      class: {
        label: [
          "text-sm",
          "bottom-2.5",
          "left-3",
          "group-focus-within:bottom-12",
          "group-[.is-filled]:bottom-12",
        ],
      },
    },
    {
      isLabelPlaceholder: true,
      labelPlacement: "outside",
      size: "lg",
      class: {
        label: [
          "text-base",
          "bottom-3",
          "left-3",
          "group-focus-within:text-sm",
          "group-[.is-filled]:bottom-sm",
          "group-focus-within:bottom-14",
          "group-[.is-filled]:bottom-14",
        ],
      },
    },
    {
      isLabelPlaceholder: true,
      labelPlacement: "outside",
      size: "xl",
      class: {
        label: [
          "text-base",
          "bottom-4",
          "left-3",
          "group-focus-within:text-sm",
          "group-[.is-filled]:bottom-sm",
          "group-focus-within:bottom-16",
          "group-[.is-filled]:bottom-16",
        ],
      },
    },
  ],
});

export type InputVariantProps = VariantProps<typeof input>;
export type InputSlots = keyof ReturnType<typeof input>;

export {input};
