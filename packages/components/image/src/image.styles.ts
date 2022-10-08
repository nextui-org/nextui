import {styled} from "@nextui-org/system";

import {loading} from "./image.animations";

export const StyledImage = styled("img", {
  size: "100%",
  display: "block",
});

export const StyledImageContainer = styled("div", {
  opacity: 0,
  margin: "0 auto",
  position: "relative",
  overflow: "hidden",
  maxWidth: "100%",
  transition: "transform 250ms ease 0ms, opacity 200ms ease-in 0ms",
  "@motion": {
    transition: "none",
  },
  variants: {
    isLoaded: {
      true: {
        opacity: 1,
      },
      false: {
        opacity: 0,
      },
    },
  },
});

export const StyledImageSkeleton = styled("div", {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  size: "100%",
  borderRadius: "inherit",
  backgroundImage:
    "linear-gradient(270deg, $colors$accents1, $colors$accents2, $colors$accents2, $colors$accents1)",
  backgroundSize: "400% 100%",
  animation: `${loading} 5s ease-in-out infinite`,
  transition: "opacity 300ms ease-out",
});
