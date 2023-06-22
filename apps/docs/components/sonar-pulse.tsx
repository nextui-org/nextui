import {FC, ReactNode, useMemo} from "react";
import {parseToRgba} from "color2k";
import {clsx} from "@nextui-org/shared-utils";
import {useIsSSR} from "@react-aria/ssr";
export interface SonarPulseProps {
  children: ReactNode;
  icon?: ReactNode;
  size?: number;
  circlesCount?: number;
  playState?: "running" | "paused";
  color?: string;
}

export const SonarPulse: FC<SonarPulseProps> = ({
  children,
  color = "#FF4ECD",
  icon,
  size = 80,
  circlesCount = 4,
  playState = "paused",
}) => {
  const isSSR = useIsSSR();

  const initialSizeFactor = 1.5;
  const circleSize = size * initialSizeFactor;

  const rgbaColors = useMemo(() => {
    const alpha = 0.4;
    const length = circlesCount;
    const factor = alpha / circlesCount;

    return Array.from({length}).map((_, i) => {
      const alphaFactor = alpha - i * factor;
      let rgbaColor = parseToRgba(color);

      // replace the alpha value by the new one
      rgbaColor[3] = alphaFactor;

      return rgbaColor;
    });
  }, [circlesCount, color]);

  const renderCircles = useMemo(() => {
    const circles = [];

    for (let i = 1; i < circlesCount; i++) {
      circles.push(
        <div
          key={i}
          className={clsx("circle", `circle-${i}`, "absolute", {
            "animate-expand-opacity": playState === "running",
          })}
          style={{
            width: `${size * (initialSizeFactor + i)}px`,
            height: `${size * (initialSizeFactor + i)}px`,
            borderRadius: "50%",
            top: `calc(${size * (initialSizeFactor + i)}px / 2 * -1)`,
            left: `calc(${size * (initialSizeFactor + i)}px / 2 * -1)`,
            animationPlayState: playState,
            animationDelay: `${i * 0.5}s`,
            border: `1px solid rgba(${rgbaColors[i - 1]})`,
            background: `linear-gradient(-180deg, rgba(${rgbaColors[i]}) 20%, hsl(var(--nextui-background)) 100%)`,
          }}
        />,
      );
    }

    return circles;
  }, [rgbaColors, circlesCount, playState, size]);

  if (isSSR) {
    return null;
  }

  return (
    <div className="relative inline-block">
      <div
        className="relative flex items-center justify-center text-center rounded-full bg-transparent"
        style={{width: `${size}px`, height: `${size}px`}}
      >
        {icon}
      </div>
      {children}
      <div className="absolute top-1/2 left-1/2 overflow-visible -z-10">
        <div
          className="absolute animate-expand rounded-full"
          style={{
            width: `${circleSize}px`,
            height: `${circleSize}px`,
            top: `calc(${circleSize}px / 2 * -1)`,
            left: `calc(${circleSize}px / 2 * -1)`,
            animationPlayState: playState,
            animationDelay: "1s",
            border: `1.5px solid rgba(${rgbaColors[0]})`,
            background: `linear-gradient(-180deg, rgba(${rgbaColors[0]}) 40%, hsl(var(--nextui-background)) 100%)`,
          }}
        />
        {renderCircles}
      </div>
    </div>
  );
};
