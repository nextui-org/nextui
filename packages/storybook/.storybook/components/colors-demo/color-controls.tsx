import {Label} from "@heroui/react";
import React, {useCallback, useRef} from "react";
import {tv} from "tailwind-variants";

import {cn} from "../../utils/cn";

/* -------------------------------------------------------------------------------------------------
 * Styles
 * -----------------------------------------------------------------------------------------------*/

const sliderTrackStyles = tv({
  base: "relative h-8 w-full cursor-pointer rounded-full",
});

const sliderThumbStyles = tv({
  base: [
    "absolute top-1/2 -translate-x-1/2 -translate-y-1/2",
    "size-6 rounded-full border-[3px] border-white shadow-lg",
    "cursor-grab active:cursor-grabbing",
    "outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
    "transition-shadow",
  ],
});

/* -------------------------------------------------------------------------------------------------
 * HueSlider - A slider for selecting hue (0-360)
 * -----------------------------------------------------------------------------------------------*/

interface HueSliderProps {
  value: number;
  chroma: number;
  onChange: (value: number) => void;
  className?: string;
}

function HueSlider({chroma, className, onChange, value}: HueSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const getValueFromPosition = useCallback(
    (clientX: number) => {
      if (!trackRef.current) return value;
      const rect = trackRef.current.getBoundingClientRect();
      const percentage = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));

      return Math.round(percentage * 360);
    },
    [value],
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      isDragging.current = true;
      onChange(getValueFromPosition(e.clientX));

      const handleMouseMove = (e: MouseEvent) => {
        if (isDragging.current) {
          onChange(getValueFromPosition(e.clientX));
        }
      };

      const handleMouseUp = () => {
        isDragging.current = false;
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [getValueFromPosition, onChange],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      let newValue = value;

      switch (e.key) {
        case "ArrowLeft":
        case "ArrowDown":
          newValue = Math.max(0, value - (e.shiftKey ? 10 : 1));
          break;
        case "ArrowRight":
        case "ArrowUp":
          newValue = Math.min(360, value + (e.shiftKey ? 10 : 1));
          break;
        case "Home":
          newValue = 0;
          break;
        case "End":
          newValue = 360;
          break;
        default:
          return;
      }
      e.preventDefault();
      onChange(newValue);
    },
    [value, onChange],
  );

  // Calculate thumb position (0-100%)
  const thumbPosition = (value / 360) * 100;

  // Current color at this hue - use the chroma value for the gradient
  const displayChroma = Math.max(0.2, chroma);
  const currentColor = `oklch(0.7 ${displayChroma} ${value})`;

  // Build gradient with the current chroma level for accurate representation
  const gradientStops = [0, 60, 120, 180, 240, 300, 360]
    .map((h) => `oklch(0.7 ${displayChroma} ${h})`)
    .join(", ");

  return (
    <div
      ref={trackRef}
      aria-label="Base tone"
      aria-valuemax={360}
      aria-valuemin={0}
      aria-valuenow={value}
      className={cn(sliderTrackStyles(), className)}
      role="slider"
      tabIndex={0}
      style={{
        background: `linear-gradient(to right, ${gradientStops})`,
      }}
      onKeyDown={handleKeyDown}
      onMouseDown={handleMouseDown}
    >
      <div
        className={sliderThumbStyles()}
        style={{
          left: `${thumbPosition}%`,
          backgroundColor: currentColor,
        }}
      />
    </div>
  );
}

/* -------------------------------------------------------------------------------------------------
 * ChromaSlider - A slider for selecting chroma/saturation (0-0.2)
 * Reference: https://codepen.io example uses 0-0.2 range with step 0.001
 * -----------------------------------------------------------------------------------------------*/

interface ChromaSliderProps {
  value: number;
  hue: number;
  onChange: (value: number) => void;
  className?: string;
}

// Max chroma for subtle gray tinting - 0.02 keeps colors professional without high contrast
const MAX_CHROMA = 0.02;

function ChromaSlider({className, hue, onChange, value}: ChromaSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const getValueFromPosition = useCallback(
    (clientX: number) => {
      if (!trackRef.current) return value;
      const rect = trackRef.current.getBoundingClientRect();
      const percentage = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));

      // Round to 4 decimal places for finer control with smaller max
      return Math.round(percentage * MAX_CHROMA * 10000) / 10000;
    },
    [value],
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      isDragging.current = true;
      onChange(getValueFromPosition(e.clientX));

      const handleMouseMove = (e: MouseEvent) => {
        if (isDragging.current) {
          onChange(getValueFromPosition(e.clientX));
        }
      };

      const handleMouseUp = () => {
        isDragging.current = false;
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [getValueFromPosition, onChange],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      let newValue = value;
      const step = e.shiftKey ? 0.002 : 0.0002;

      switch (e.key) {
        case "ArrowLeft":
        case "ArrowDown":
          newValue = Math.max(0, value - step);
          break;
        case "ArrowRight":
        case "ArrowUp":
          newValue = Math.min(MAX_CHROMA, value + step);
          break;
        case "Home":
          newValue = 0;
          break;
        case "End":
          newValue = MAX_CHROMA;
          break;
        default:
          return;
      }
      e.preventDefault();
      onChange(Math.round(newValue * 10000) / 10000);
    },
    [value, onChange],
  );

  // Calculate thumb position (0-100%)
  const thumbPosition = (value / MAX_CHROMA) * 100;

  // Current color at this chroma level
  const currentColor = `oklch(0.7 ${value} ${hue})`;

  return (
    <div
      ref={trackRef}
      aria-label="Amount of color in gray"
      aria-valuemax={MAX_CHROMA}
      aria-valuemin={0}
      aria-valuenow={value}
      className={cn(sliderTrackStyles(), className)}
      role="slider"
      tabIndex={0}
      style={{
        background: `linear-gradient(to right, oklch(0.7 0 ${hue}), oklch(0.7 ${MAX_CHROMA} ${hue}))`,
      }}
      onKeyDown={handleKeyDown}
      onMouseDown={handleMouseDown}
    >
      <div
        className={sliderThumbStyles()}
        style={{
          left: `${thumbPosition}%`,
          backgroundColor: currentColor,
        }}
      />
    </div>
  );
}

/* -------------------------------------------------------------------------------------------------
 * ColorControls
 * -----------------------------------------------------------------------------------------------*/

interface ColorControlsProps {
  baseHue: number;
  grayChroma: number;
  onBaseHueChange: (hue: number) => void;
  onGrayChromaChange: (chroma: number) => void;
}

export function ColorControls({
  baseHue,
  grayChroma,
  onBaseHueChange,
  onGrayChromaChange,
}: ColorControlsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 xl:flex xl:gap-8">
      {/* Base Tone Slider */}
      <div className="flex min-w-0 flex-col items-start gap-3 xl:flex-row xl:items-center">
        <Label className="text-sm font-medium whitespace-nowrap text-foreground">Base tone</Label>
        <HueSlider
          chroma={grayChroma}
          className="w-full xl:w-[240px]"
          value={baseHue}
          onChange={onBaseHueChange}
        />
      </div>

      {/* Gray Chroma Slider */}
      <div className="flex min-w-0 flex-col items-start gap-3 xl:flex-row xl:items-center">
        <Label className="text-sm font-medium whitespace-nowrap text-foreground">
          Amount of color in gray
        </Label>
        <ChromaSlider
          className="w-full xl:w-[240px]"
          hue={baseHue}
          value={grayChroma}
          onChange={onGrayChromaChange}
        />
      </div>
    </div>
  );
}
