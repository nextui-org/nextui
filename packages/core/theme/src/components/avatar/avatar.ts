// import {cva, type VariantProps, type CompoundVariants} from "../../utils";

// import {variants, defaultVariants, type Variants} from "./avatar-common";

// const avatarBase = [
//   "flex",
//   "relative",
//   "justify-center",
//   "items-center",
//   "box-border",
//   "overflow-hidden",
//   "align-middle",
// ];

// const avatarVariants: Variants = {
//   ...variants,
//   radius: {
//     none: "rounded-none",
//     base: "rounded",
//     sm: "rounded-sm",
//     md: "rounded-md",
//     lg: "rounded-lg",
//     xl: "rounded-xl",
//   },
//   color: {
//     neutral: "text-neutral dark:text-neutral-dark",
//     primary: "text-primary",
//     secondary: "text-secondary dark:text-secondary-dark",
//     success: "text-success",
//     warning: "text-warning",
//     error: "text-error",
//   },
//   textColor: {
//     neutral: "text-neutral dark:text-neutral-dark",
//     primary: "text-primary",
//     secondary: "text-secondary dark:text-secondary-dark",
//     success: "text-success",
//     warning: "text-warning",
//     error: "text-error",
//   },
//   size: {
//     xs: "text-xs",
//     sm: "text-sm",
//     md: "text-base",
//     lg: "text-lg",
//     xl: "text-xl",
//   },
//   border: {
//     none: "border-0",
//     light: "border",
//     normal: "border-2",
//     bold: "border-4",
//     extrabold: "border-8",
//   },
//   isZoomed: {
//     true: "",
//     false: "",
//   },
//   isStacked: {
//     true: "",
//     false: "",
//   },
// };

// const avatarCompoundVariants: CompoundVariants<Variants> = [
//   {
//     color: "neutral",
//     textColor: "success",
//   },
// ];

// /**
//  * Avatar wrapper cva component
//  *
//  * @example
//  * <div className={avatar({ color: "secondary", size: "lg" })}>
//  *  <img src="https://picsum.photos/200/300" alt="your avatar" />
//  * </div>
//  */
// const avatar = cva(avatarBase, {
//   variants: avatarVariants,
//   compoundVariants: avatarCompoundVariants,
//   defaultVariants,
// });

// export {avatarBase, avatarVariants, avatarCompoundVariants, avatar};

// export type AvatarVariantProps = VariantProps<typeof avatar>;

export const avatarImg = {};
