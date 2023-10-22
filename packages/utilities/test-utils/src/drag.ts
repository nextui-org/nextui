// ####################################################
// ##                COPIED FROM HERE                ##
// ##                WITH TYPES ADDED                ##
// ## https://testing-library.com/docs/example-drag/ ##
// ####################################################

import {fireEvent} from "@testing-library/dom";

// https://stackoverflow.com/a/53946549/1179377
function isElement(obj: HTMLElement | Record<string, unknown>): obj is HTMLElement {
  if (typeof obj !== "object") {
    return false;
  }
  let prototypeStr, prototype;

  do {
    prototype = Object.getPrototypeOf(obj);
    // to work in iframe
    prototypeStr = Object.prototype.toString.call(prototype);
    // '[object Document]' is used to detect document
    if (prototypeStr === "[object Element]" || prototypeStr === "[object Document]") {
      return true;
    }
    obj = prototype;
    // null is the terminal of object
  } while (prototype !== null);

  return false;
}

function getElementClientCenter(element: HTMLElement) {
  const {left, top, width, height} = element.getBoundingClientRect();

  return {
    x: left + width / 2,
    y: top + height / 2,
  };
}

const getCoords = (
  charlie:
    | HTMLElement
    | {
        x: number;
        y: number;
      },
) => (isElement(charlie) ? getElementClientCenter(charlie) : charlie);

const sleep = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

export async function drag(
  element: HTMLElement,
  {
    to: inTo,
    delta,
    steps = 20,
    duration = 500,
  }: {
    to?: HTMLElement | {x: number; y: number};
    delta?: {
      x: number;
      y: number;
    };
    steps?: number;
    duration?: number;
  },
) {
  const from = getElementClientCenter(element);
  const to = delta
    ? {
        x: from.x + delta.x,
        y: from.y + delta.y,
      }
    : inTo
    ? getCoords(inTo)
    : null;

  if (to === null) throw new Error("You must provide either `delta` or `to`");

  const step = {
    x: (to.x - from.x) / steps,
    y: (to.y - from.y) / steps,
  };

  const current = {
    clientX: from.x,
    clientY: from.y,
  };

  fireEvent.mouseEnter(element, current);
  fireEvent.mouseOver(element, current);
  fireEvent.mouseMove(element, current);
  fireEvent.mouseDown(element, current);
  for (let i = 0; i < steps; i++) {
    current.clientX += step.x;
    current.clientY += step.y;
    await sleep(duration / steps);
    fireEvent.mouseMove(element, current);
  }
  fireEvent.mouseUp(element, current);
}
