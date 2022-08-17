import React from "react";
import {random, range} from "lodash";
import {yellow, CSS} from "@nextui-org/react";
import useRandomInterval from "@hooks/use-random-interval";
import usePrefersReducedMotion from "@hooks/use-prefers-reduced-motion";

import {Sparkle} from "../icons";

import {StyledSparkles, StyledChildWrapper, StyledSparkleWrapper} from "./styles";

export interface SparklesProps {
  children?: React.ReactNode;
  floatAbove?: boolean;
  color?: string;
  css?: CSS;
}

const generateSparkle = (color = yellow.yellow500, floatAbove = true) => {
  return {
    id: String(random(10000, 99999)),
    createdAt: Date.now(),
    // Bright yellow color:
    color,
    size: random(10, 16),
    style: {
      // Pick a random spot in the available space
      top: random(-20, 80) + "%",
      left: random(0, 100) + "%",
      zIndex: floatAbove ? 2 : -1,
    },
  };
};

type GeneratedSparkle = ReturnType<typeof generateSparkle>;

const Sparkles: React.FC<SparklesProps> = ({
  children,
  color,
  floatAbove = false,
  ...otherProps
}) => {
  const [sparkles, setSparkles] = React.useState<GeneratedSparkle[]>(() => {
    return range(3).map(() => generateSparkle(color, floatAbove));
  });

  const prefersReducedMotion = usePrefersReducedMotion();

  useRandomInterval(
    () => {
      const now = Date.now();
      // Create a new sparkle
      const sparkle = generateSparkle(color, floatAbove);
      // Clean up any "expired" sparkles
      const nextSparkles = sparkles.filter((sparkle) => {
        const delta = now - sparkle.createdAt;

        return delta < 750;
      });

      // Include our new sparkle
      nextSparkles.push(sparkle);
      setSparkles(nextSparkles);
    },
    prefersReducedMotion ? null : 50,
    prefersReducedMotion ? null : 1000,
  );

  return (
    <StyledSparkles {...otherProps}>
      {sparkles.map((sparkle) => (
        <StyledSparkleWrapper key={sparkle.id} style={sparkle.style}>
          <Sparkle fill={sparkle.color} size={sparkle.size} />
        </StyledSparkleWrapper>
      ))}
      <StyledChildWrapper>{children}</StyledChildWrapper>
    </StyledSparkles>
  );
};

export default Sparkles;
