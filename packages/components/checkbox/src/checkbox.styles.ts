// import {styled} from "@nextui-org/system";
// import {cssFocusVisible} from "@nextui-org/shared-css";

// export const StyledCheckbox = styled("label", {
//   $$checkboxBorderColor: "$colors$border",
//   $$checkboxBorderRadius: "$radii$squared",
//   d: "inline-flex",
//   jc: "flex-start",
//   ai: "center",
//   position: "relative",
//   w: "auto",
//   cursor: "pointer",
//   zIndex: "$1",
//   opacity: 1,
//   transition: "opacity 0.25s ease",
//   "@motion": {
//     transition: "none",
//   },
//   variants: {
//     size: {
//       xs: {
//         $$checkboxSize: "$space$7",
//       },
//       sm: {
//         $$checkboxSize: "$space$8",
//       },
//       md: {
//         $$checkboxSize: "$space$9",
//       },
//       lg: {
//         $$checkboxSize: "$space$10",
//       },
//       xl: {
//         $$checkboxSize: "$space$11",
//       },
//     },
//     isDisabled: {
//       true: {
//         opacity: 0.75,
//         cursor: "not-allowed",
//       },
//     },
//     disableAnimation: {
//       true: {
//         transition: "none",
//       },
//     },
//   },
// });

// export const StyledCheckboxMask = styled("div", {
//   $$checkboxMaskTransition:
//     "transform 0.25s ease 0s, opacity 0.25s ease 0s, background 0.25s ease 0s, border-color 0.25s ease 0s",
//   size: "100%",
//   position: "absolute",
//   pe: "none",
//   boxSizing: "border-box",
//   dflex: "center",
//   zIndex: "-$1",
//   br: "inherit",
//   color: "$$checkboxBorderColor",
//   "&:before": {
//     content: "",
//     position: "absolute",
//     top: "0px",
//     left: "0px",
//     size: "100%",
//     br: "inherit",
//     transition: "$$checkboxMaskTransition",
//     zIndex: "-$1",
//     border: "$borderWeights$normal solid currentColor",
//     boxSizing: "border-box",
//   },
//   "&:after": {
//     content: "",
//     position: "absolute",
//     top: "0px",
//     left: "0px",
//     size: "100%",
//     bg: "$$checkboxColor",
//     scale: 0.5,
//     br: "inherit",
//     opacity: 0,
//     transition: "$$checkboxMaskTransition",
//     zIndex: "-$1",
//   },
//   "@motion": {
//     "&:before": {
//       transition: "none",
//     },
//     "&:after": {
//       transition: "none",
//     },
//   },
//   variants: {
//     isChecked: {
//       true: {
//         "&:before": {
//           opacity: 0,
//           scale: 1.2,
//         },
//         "&:after": {
//           opacity: 1,
//           scale: 1,
//         },
//       },
//     },
//     isIndeterminate: {
//       true: {
//         "&:before": {
//           opacity: 0,
//           scale: 1.2,
//         },
//         "&:after": {
//           opacity: 1,
//           scale: 1,
//         },
//       },
//     },
//     disableAnimation: {
//       true: {
//         "&:before": {
//           transition: "none",
//         },
//         "&:after": {
//           transition: "none",
//         },
//       },
//     },
//   },
// });

// export const StyledCheckboxText = styled("span", {
//   position: "relative",
//   dflex: "center",
//   color: "$text",
//   opacity: 1,
//   pl: "calc($$checkboxSize * 0.57)",
//   ln: "$$checkboxSize",
//   fontSize: "$$checkboxSize",
//   us: "none",
//   transition: "opacity 0.25s ease 0s",
//   "@motion": {
//     transition: "none",
//     "&:before": {
//       transition: "none",
//     },
//   },
//   variants: {
//     color: {
//       default: {
//         color: "$text",
//       },
//       primary: {
//         color: "$primary",
//       },
//       secondary: {
//         color: "$secondary",
//       },
//       success: {
//         color: "$success",
//       },
//       warning: {
//         color: "$warning",
//       },
//       error: {
//         color: "$error",
//       },
//     },
//     lineThrough: {
//       true: {
//         "&:before": {
//           content: "",
//           position: "absolute",
//           width: "0px",
//           height: "2px",
//           background: "$text",
//           transition: "width 0.25s ease 0s",
//         },
//       },
//     },
//     isChecked: {
//       true: {
//         "&:before": {
//           opacity: 0.8,
//         },
//       },
//     },
//     isDisabled: {
//       true: {
//         color: "$accents5",
//       },
//     },
//     disableAnimation: {
//       true: {
//         transition: "none",
//         "&:before": {
//           transition: "none",
//         },
//       },
//     },
//   },
//   compoundVariants: [
//     {
//       lineThrough: true,
//       isChecked: true,
//       css: {
//         opacity: 0.6,
//         "&:before": {
//           w: "calc(100% - 10px)",
//         },
//       },
//     },
//   ],
// });

// export const StyledCheckboxContainer = styled(
//   "div",
//   {
//     br: "$$checkboxBorderRadius",
//     position: "relative",
//     sizeMin: "$$checkboxSize",
//     transition: "box-shadow 0.25s ease",
//     zIndex: "$1",
//     ".nextui-checkbox-input": {
//       position: "absolute",
//       width: "100%",
//       height: "100%",
//       top: "0px",
//       left: "0px",
//       margin: "0px",
//       padding: "0px",
//       opacity: 0,
//       zIndex: "$1",
//       cursor: "pointer",
//       "&:disabled": {
//         cursor: "not-allowed",
//       },
//     },
//     "@motion": {
//       transition: "none",
//     },
//     variants: {
//       color: {
//         default: {
//           $$checkboxColor: "$colors$primary",
//           $$checkboxColorHover: "$colors$primarySolidHover",
//         },
//         primary: {
//           $$checkboxColor: "$colors$primary",
//           $$checkboxColorHover: "$colors$primarySolidHover",
//         },
//         secondary: {
//           $$checkboxColor: "$colors$secondary",
//           $$checkboxColorHover: "$colors$secondarySolidHover",
//         },
//         success: {
//           $$checkboxColor: "$colors$success",
//           $$checkboxColorHover: "$colors$successSolidHover",
//         },
//         warning: {
//           $$checkboxColor: "$colors$warning",
//           $$checkboxColorHover: "$colors$warningSolidHover",
//         },
//         error: {
//           $$checkboxColor: "$colors$error",
//           $$checkboxColorHover: "$colors$errorSolidHover",
//         },
//         gradient: {
//           $$checkboxColor: "$colors$gradient",
//           $$checkboxColorHover: "$colors$gradient",
//         },
//       },
//       isRounded: {
//         true: {
//           $$checkboxBorderRadius: "$radii$pill",
//         },
//       },
//       isDisabled: {
//         true: {
//           opacity: 0.4,
//           cursor: "not-allowed",
//         },
//       },
//       disableAnimation: {
//         true: {
//           transition: "none",
//         },
//       },
//       isHovered: {
//         true: {
//           [`& ${StyledCheckboxMask}:before`]: {
//             bg: "$$checkboxBorderColor",
//             border: "2px solid transparent",
//           },
//           [`& ${StyledCheckboxMask}:after`]: {
//             bg: "$$checkboxColorHover",
//           },
//         },
//       },
//     },
//   },
//   cssFocusVisible,
// );

// export const StyledIconCheck = styled("i", {
//   size: "$$checkboxSize",
//   dflex: "center",
//   br: "inherit",
//   opacity: 0,
//   zIndex: "$2",
//   transition: "transform 0.35s ease",
//   "&:after": {
//     content: "",
//     opacity: 0,
//     position: "relative",
//     width: "10px",
//     height: "2px",
//     br: "1px",
//     background: "$white",
//     display: "block",
//   },
//   "@motion": {
//     transition: "none",
//     "&:after": {
//       transition: "none",
//     },
//   },
//   variants: {
//     isIndeterminate: {
//       true: {
//         opacity: 1,
//         transform: "rotate(0deg)",
//         width: "auto",
//         height: "auto",
//         margin: "0px",
//         "&:after": {
//           opacity: 1,
//         },
//       },
//       false: {
//         width: "8px",
//         height: "14px",
//         display: "block",
//         position: "relative",
//         marginTop: "-4px",
//       },
//     },
//     size: {
//       xs: {
//         marginTop: "-2px",
//         transform: "rotate(45deg) scale(0.5)",
//       },
//       sm: {
//         marginTop: "-2px",
//         transform: "rotate(45deg) scale(0.5)",
//       },
//       md: {
//         transform: "rotate(45deg) scale(0.8)",
//       },
//       lg: {
//         transform: "rotate(45deg)",
//       },
//       xl: {
//         transform: "rotate(45deg)",
//       },
//     },
//     isChecked: {
//       true: {
//         opacity: 1,
//       },
//     },
//     disableAnimation: {
//       true: {
//         transition: "none",
//         "&:after": {
//           transition: "none",
//         },
//       },
//     },
//   },
//   compoundVariants: [
//     // isIndeterminate && xs size
//     {
//       isIndeterminate: true,
//       size: "xs",
//       css: {
//         scale: "0.5",
//       },
//     },
//     // isIndeterminate && sm size
//     {
//       isIndeterminate: true,
//       size: "sm",
//       css: {
//         scale: "0.5",
//       },
//     },
//     // isIndeterminate && md size
//     {
//       isIndeterminate: true,
//       size: "md",
//       css: {
//         scale: "0.8",
//       },
//     },
//     // isIndeterminate && lg size
//     {
//       isIndeterminate: true,
//       size: "lg",
//       css: {
//         transform: "none",
//       },
//     },
//     // isIndeterminate && xl size
//     {
//       isIndeterminate: true,
//       size: "lg",
//       css: {
//         transform: "none",
//       },
//     },
//   ],
// });

// export const StyledIconCheckFirstLine = styled("div", {
//   content: "",
//   background: "transparent",
//   position: "absolute",
//   width: "8px",
//   height: "1px",
//   br: "5px",
//   zIndex: "$1",
//   bottom: "0px",
//   "&:after": {
//     content: "",
//     position: "absolute",
//     left: "0px",
//     width: "0%",
//     height: "2px",
//     background: "$white",
//     br: "5px 0px 0px 5px",
//   },
//   "@motion": {
//     "&:after": {
//       transition: "none",
//     },
//   },
//   variants: {
//     isIndeterminate: {
//       true: {
//         display: "none",
//       },
//     },
//     isChecked: {
//       true: {
//         "&:after": {
//           width: "100%",
//           transition: "width 0.25s ease 0.1s",
//         },
//       },
//     },
//     disableAnimation: {
//       true: {
//         "&:after": {
//           transition: "none",
//         },
//       },
//     },
//   },
//   compoundVariants: [
//     // checked && disableAnimation
//     {
//       isChecked: true,
//       disableAnimation: true,
//       css: {
//         "&:after": {
//           transition: "none",
//         },
//       },
//     },
//   ],
// });

// export const StyledIconCheckSecondLine = styled("div", {
//   content: "",
//   position: "absolute",
//   h: "13px",
//   br: "5px",
//   bottom: "0",
//   right: "0",
//   zIndex: "$1",
//   background: "transparent",
//   width: "2px",
//   "&:after": {
//     content: "",
//     position: "absolute",
//     width: "2px",
//     height: "0%",
//     background: "$white",
//     left: "0px",
//     bottom: "0px",
//     br: "5px 5px 0px 0px",
//   },
//   "@motion": {
//     "&:after": {
//       transition: "none",
//     },
//   },
//   variants: {
//     isIndeterminate: {
//       true: {
//         display: "none",
//       },
//     },
//     isChecked: {
//       true: {
//         "&:after": {
//           height: "100%",
//           transition: "height 0.2s ease 0.3s",
//         },
//       },
//     },
//     disableAnimation: {
//       true: {
//         "&:after": {
//           transition: "none",
//         },
//       },
//     },
//   },
//   compoundVariants: [
//     // checked && disableAnimation
//     {
//       isChecked: true,
//       disableAnimation: true,
//       css: {
//         "&:after": {
//           transition: "none",
//         },
//       },
//     },
//   ],
// });
