import {styled} from "@nextui-org/react";
import {growCircles} from "@utils/animations";

export const StyledSonarPulse = styled("div", {
  position: "relative",
  display: "inline-block",
});

export const StyledIconWrapper = styled("div", {
  position: "relative",
  width: "$$sonarSize",
  height: "$$sonarSize",
  textAlign: "center",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "50%",
  background: "transparent",
  zIndex: 2,
});

export const StyledSonarElements = styled("div", {
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  overflow: "visible",
  position: "absolute",
  zIndex: -1,
  size: "$$sonarSize * 4",
});

export const StyledSonarCircle = styled("div", {
  $$circleSize: "calc($$sonarSize * $$factor)",
  borderRadius: "50%",
  position: "absolute",
  width: "$$circleSize",
  height: "$$circleSize",
  top: "calc($$circleSize / 2 * -1)",
  left: "calc($$circleSize / 2 * -1)",
  animation: `6s linear infinite both $$playState ${growCircles} `,
  animationDelay: "$$delay",
});
