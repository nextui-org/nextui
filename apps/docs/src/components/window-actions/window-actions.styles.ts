import {styled, VariantProps} from "@nextui-org/react";
import {Box} from "@primitives";

export const StyledWindowIcon = styled(Box, {
  size: "$6",
  br: "$pill",
  mr: "$4",
  variants: {
    color: {
      red: {
        bg: "$red600",
      },
      green: {
        bg: "$green600",
      },
      yellow: {
        bg: "$yellow600",
      },
    },
  },
});

export const StyledWindowActions = styled("div", {
  dflex: "flex-start",
  alignItems: "center",
  px: "$2",
  pt: "$5",
  pb: "$4",
  zIndex: "$2",
  position: "sticky",
  top: 0,
  variants: {
    variant: {
      normal: {},
      code: {
        background: "$codeBackground",
      },
    },
  },
  defaultVariants: {
    variant: "code",
  },
});

export type WindowActionsVariantProps = VariantProps<typeof StyledWindowActions>;
