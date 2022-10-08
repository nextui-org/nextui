import {styled} from "@nextui-org/system";

import {expand} from "./drip.animations";

export const StyledDrip = styled("div", {
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  "& svg": {
    position: "absolute",
    animation: `350ms linear ${expand}`,
    animationFillMode: "forwards",
    width: "$md",
    height: "$md",
  },
});
