import {MutableRefObject} from "react";

import {Placement} from "../utils/prop-types";

interface ParentDomRect {
  top: number;
  left: number;
  right: number;
  bottom: number;
  width: number;
  height: number;
}

interface ReactiveDomReact {
  top: number;
  bottom: number;
  left: number;
  right: number;
  width: number;
  height: number;
}

const defaultRect: ReactiveDomReact = {
  top: -1000,
  left: -1000,
  right: -1000,
  bottom: -1000,
  width: 0,
  height: 0,
};

export const getRect = (ref: MutableRefObject<HTMLElement | null>): ReactiveDomReact => {
  if (!ref || !ref.current) return defaultRect;
  const rect = ref.current.getBoundingClientRect();

  return {
    ...rect,
    width: rect.width || rect.right - rect.left,
    height: rect.height || rect.bottom - rect.top,
    top: rect.top + document.documentElement.scrollTop,
    bottom: rect.bottom + document.documentElement.scrollTop,
    left: rect.left + document.documentElement.scrollLeft,
    right: rect.right + document.documentElement.scrollLeft,
  };
};

export interface TooltipPlacement {
  top: string;
  left: string;
  transform: string;
}

export const defaultTooltipPlacement = {
  top: "-1000px",
  left: "-1000px",
  transform: "none",
};

export interface TooltipIconPlacement {
  top: string;
  left: string;
  right: string;
  bottom: string;
  transform: string;
}

export const getPlacement = (
  placement: Placement,
  rect: ParentDomRect,
  offset: number,
): TooltipPlacement => {
  const placements: {[key in Placement]: TooltipPlacement} = {
    top: {
      top: `${rect.top - offset}px`,
      left: `${rect.left + rect.width / 2}px`,
      transform: "translate(-50%, -100%)",
    },
    topStart: {
      top: `${rect.top - offset}px`,
      left: `${rect.left}px`,
      transform: "translate(0, -100%)",
    },
    topEnd: {
      top: `${rect.top - offset}px`,
      left: `${rect.left + rect.width}px`,
      transform: "translate(-100%, -100%)",
    },
    bottom: {
      top: `${rect.bottom + offset}px`,
      left: `${rect.left + rect.width / 2}px`,
      transform: "translate(-50%, 0)",
    },
    bottomStart: {
      top: `${rect.bottom + offset}px`,
      left: `${rect.left}px`,
      transform: "translate(0, 0)",
    },
    bottomEnd: {
      top: `${rect.bottom + offset}px`,
      left: `${rect.left + rect.width}px`,
      transform: "translate(-100%, 0)",
    },
    left: {
      top: `${rect.top + rect.height / 2}px`,
      left: `${rect.left - offset}px`,
      transform: "translate(-100%, -50%)",
    },
    leftStart: {
      top: `${rect.top}px`,
      left: `${rect.left - offset}px`,
      transform: "translate(-100%, 0)",
    },
    leftEnd: {
      top: `${rect.top + rect.height}px`,
      left: `${rect.left - offset}px`,
      transform: "translate(-100%, -100%)",
    },
    right: {
      top: `${rect.top + rect.height / 2}px`,
      left: `${rect.right + offset}px`,
      transform: "translate(0, -50%)",
    },
    rightStart: {
      top: `${rect.top}px`,
      left: `${rect.right + offset}px`,
      transform: "translate(0, 0)",
    },
    rightEnd: {
      top: `${rect.top + rect.height}px`,
      left: `${rect.right + offset}px`,
      transform: "translate(0, -100%)",
    },
  };

  return placements[placement] || (placements.top as TooltipPlacement);
};

export const getIconPlacement = (placement: Placement, offset: number): TooltipIconPlacement => {
  const placements: {[key in Placement]?: TooltipIconPlacement} = {
    top: {
      top: "auto",
      right: "auto",
      left: "50%",
      bottom: "0px",
      transform: "translate(-50%, 100%) rotate(45deg)",
    },
    topStart: {
      top: "auto",
      right: "auto",
      left: "8%",
      bottom: "0px",
      transform: "translate(8%, 100%) rotate(45deg)",
    },
    topEnd: {
      top: "auto",
      right: "8%",
      left: "auto",
      bottom: "0px",
      transform: "translate(8%, 100%) rotate(45deg)",
    },
    bottom: {
      top: `0px`,
      right: "auto",
      left: "50%",
      bottom: "auto",
      transform: "translate(-50%, -100%) rotate(225deg)",
    },
    bottomStart: {
      top: `0px`,
      right: "auto",
      left: "8%",
      bottom: "auto",
      transform: "translate(8%, -100%) rotate(225deg)",
    },
    bottomEnd: {
      top: `0px`,
      right: "8%",
      left: "auto",
      bottom: "auto",
      transform: "translate(8%, -100%) rotate(225deg)",
    },
    left: {
      top: "50%",
      right: `-${offset - 1}px`,
      left: "auto",
      bottom: "auto",
      transform: "translate(100%, -50%) rotate(-45deg)",
    },
    leftStart: {
      top: "calc(15% + 1px)",
      right: `-${offset - 1}px`,
      left: "auto",
      bottom: "auto",
      transform: "translate(100%, 0) rotate(-45deg)",
    },
    leftEnd: {
      top: "auto",
      right: `-${offset - 1}px`,
      left: "auto",
      bottom: "calc(15% + 1px)",
      transform: "translate(100%, 0) rotate(-45deg)",
    },
    right: {
      top: "50%",
      right: "auto",
      left: `-${offset - 1}px`,
      bottom: "auto",
      transform: "translate(-100%, -50%) rotate(135deg)",
    },
    rightStart: {
      top: "calc(15% + 1px)",
      right: "auto",
      left: `-${offset - 1}px`,
      bottom: "auto",
      transform: "translate(-100%, 0) rotate(135deg)",
    },
    rightEnd: {
      top: "auto",
      right: "auto",
      left: `-${offset - 1}px`,
      bottom: "calc(15% + 1px)",
      transform: "translate(-100%, 0) rotate(135deg)",
    },
  };

  return placements[placement] || (placements.top as TooltipIconPlacement);
};
