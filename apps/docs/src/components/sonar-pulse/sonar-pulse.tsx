import {hexToRGBA} from "@utils/index";
import React, {useMemo} from "react";
import {growCirclesWithoutDisappear} from "@utils/animations";

import {
  StyledSonarPulse,
  StyledIconWrapper,
  StyledSonarElements,
  StyledSonarCircle,
} from "./sonar-pulse.styles";

interface SonarPulseProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  size?: number;
  circlesCount?: number;
  playState?: "running" | "paused";
  color?: string;
}

const SonarPulse: React.FC<SonarPulseProps> = ({
  children,
  color = "#FF4ECD",
  icon,
  size = 80,
  circlesCount = 4,
  playState = "paused",
}) => {
  const initialSizeFactor = 1.5;

  const rgbaColors = useMemo(() => {
    const alpha = 0.4;
    const length = circlesCount;
    const factor = alpha / circlesCount;

    return Array.from({length}).map((_, i) => hexToRGBA(color, alpha - i * factor));
  }, [circlesCount, color]);

  const renderCircles = useMemo(() => {
    const circles = [];

    for (let i = 1; i < circlesCount; i++) {
      circles.push(
        <StyledSonarCircle
          className={`circle circle-${i}`}
          css={{
            $$factor: initialSizeFactor + i,
            $$delay: `${i * 0.5}s`,
            $$playState: playState,
            border: `1px solid ${rgbaColors[i - 1]}`,
            background: `linear-gradient(-180deg, ${rgbaColors[i]} 20%, $background 100%)`,
          }}
        />,
      );
    }

    return circles;
  }, [rgbaColors, circlesCount, playState]);

  return (
    <StyledSonarPulse
      css={{
        $$sonarSize: `${size}px`,
      }}
    >
      <StyledIconWrapper>{icon}</StyledIconWrapper>
      <StyledSonarElements>
        <StyledSonarCircle
          className={`circle circle-static`}
          css={{
            $$factor: initialSizeFactor,
            $$playState: playState,
            animation: `6s ease-out infinite both $$playState ${growCirclesWithoutDisappear} `,
            animationDelay: "1s",
            border: `1.5px solid ${rgbaColors[0]}`,
            background: `linear-gradient(-180deg, ${rgbaColors[0]} 40%, $background 100%)`,
          }}
        />
        {renderCircles}
        {children}
      </StyledSonarElements>
    </StyledSonarPulse>
  );
};

export default SonarPulse;
