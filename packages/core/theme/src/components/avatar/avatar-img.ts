// import {CompoundVariants, cva} from "../../utils";

// import {variants, defaultVariants, type Variants} from "./avatar-common";

// const avatarImgBase = [];

// const avatarImgVariants: Variants = {
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

// const avatarImgCompoundVariants: CompoundVariants<Variants> = [
//   {
//     color: "neutral",
//     textColor: "success",
//   },
// ];

// /**
//  * Avatar image cva component
//  *
//  * @example
//  * <div className="avatar-wrapper">
//  *  <img className={avatarImg()} src="https://picsum.photos/200/300" alt="avatar" />
//  * </div>
//  */
// const avatarImg = cva(avatarImgBase, {
//   variants: avatarImgVariants,
//   compoundVariants: avatarImgCompoundVariants,
//   defaultVariants,
// });

// export {avatarImgBase, avatarImgVariants, avatarImgCompoundVariants, avatarImg};

export const avatarImg = {};
