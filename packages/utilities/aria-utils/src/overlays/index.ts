import {Placement, PlacementAxis} from "@react-types/overlays";

export type PopoverPlacement =
  | "bottom"
  | "bottom-left"
  | "bottom-right"
  | "top"
  | "top-left"
  | "top-right"
  | "left"
  | "left-top"
  | "left-bottom"
  | "right"
  | "right-top"
  | "right-bottom";

export const getAriaPlacement = (placement?: PopoverPlacement) => {
  if (!placement) {
    return "bottom" as Placement;
  }

  return placement.replace("-", " ") as Placement;
};

export const getPopoverPlacementFromAxis = (placementAxis?: PlacementAxis) => {
  if (!placementAxis) {
    return "bottom";
  }

  return placementAxis.replace("-", " ") as PopoverPlacement;
};

export const getPopoverPlacement = (ariaPlacement?: Placement) => {
  if (!ariaPlacement) {
    return "bottom" as Placement;
  }

  return ariaPlacement.replace(" ", "-") as PopoverPlacement;
};

export const getTransformOrigin = (placement?: PopoverPlacement) => {
  if (!placement) {
    return "bottom" as Placement;
  }
  switch (placement) {
    case "bottom":
      return "top center";
    case "top":
      return "bottom center";
    case "left":
      return "right center";
    case "right":
      return "left center";
    case "bottom-left":
      return "top left";
    case "bottom-right":
      return "top right";
    case "top-left":
      return "bottom left";
    case "top-right":
      return "bottom right";
    case "left-top":
      return "right top";
    case "left-bottom":
      return "right bottom";
    case "right-top":
      return "left top";
    case "right-bottom":
      return "left bottom";
    default:
      return "top center";
  }
};
