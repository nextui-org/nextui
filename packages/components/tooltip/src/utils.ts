import type {TooltipPlacement} from "./types";

export const getOrigins = (placement: TooltipPlacement) => {
  const origins = {
    top: {
      originY: 1,
    },
    bottom: {
      originY: 0,
    },
    start: {
      originX: 1,
    },
    end: {
      originX: 0,
    },
    left: {
      originX: 1,
    },
    right: {
      originX: 0,
    },
  };

  return origins?.[placement] || {};
};
