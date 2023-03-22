import type {TooltipPlacement} from "./types";

import {Placement} from "@react-types/overlays";

export const getOrigins = (placement: TooltipPlacement) => {
  const origins: Record<
    TooltipPlacement,
    {
      originX?: number;
      originY?: number;
    }
  > = {
    top: {
      originY: 1,
    },
    bottom: {
      originY: 0,
    },
    left: {
      originX: 1,
    },
    right: {
      originX: 0,
    },
    "top-start": {
      originX: 0,
      originY: 1,
    },
    "top-end": {
      originX: 1,
      originY: 1,
    },
    "bottom-start": {
      originX: 0,
      originY: 0,
    },
    "bottom-end": {
      originX: 1,
      originY: 0,
    },
    "right-start": {
      originX: 0,
      originY: 0,
    },
    "right-end": {
      originX: 0,
      originY: 1,
    },
    "left-start": {
      originX: 1,
      originY: 0,
    },
    "left-end": {
      originX: 1,
      originY: 1,
    },
  };

  return origins?.[placement] || {};
};

export const toReactAriaPlacement = (placement: TooltipPlacement) => {
  const mapPositions: Record<TooltipPlacement, Placement> = {
    top: "top",
    bottom: "bottom",
    left: "left",
    right: "right",
    "top-start": "top start",
    "top-end": "top end",
    "bottom-start": "bottom start",
    "bottom-end": "bottom end",
    "left-start": "left top",
    "left-end": "left bottom",
    "right-start": "right top",
    "right-end": "right bottom",
  };

  return mapPositions[placement];
};
