import type {SheetRenderProps} from "react-aria-components/Sheet";

const HANDLE_DRAG_VELOCITY = 0.4;
const SHEET_CLOSE_THRESHOLD = 0.25;
const SHEET_RELEASE_MS = 500;

/** CSS cubic-bezier(0.32, 0.72, 0, 1), sampled over unit time. */
export function sheetReleaseEase(time: number) {
  if (time <= 0) return 0;
  if (time >= 1) return 1;

  let solved = time;

  for (let iteration = 0; iteration < 8; iteration++) {
    const error = bezierComponent(solved, 0.32, 0) - time;
    const slope = bezierSlope(solved, 0.32, 0);

    if (Math.abs(error) < 1e-4 || slope === 0) break;

    solved = Math.min(1, Math.max(0, solved - error / slope));
  }

  return bezierComponent(solved, 0.72, 1);
}

function bezierComponent(time: number, start: number, end: number) {
  const a = 1 - 3 * end + 3 * start;
  const b = 3 * end - 6 * start;
  const c = 3 * start;

  return ((a * time + b) * time + c) * time;
}

function bezierSlope(time: number, start: number, end: number) {
  const a = 1 - 3 * end + 3 * start;
  const b = 3 * end - 6 * start;
  const c = 3 * start;

  return 3 * a * time * time + 2 * b * time + c;
}

export function sheetDismissTarget({
  current,
  elapsed,
  extent,
  isDismissable,
  rest,
  size,
  swipeDirection,
  travel,
  viewport,
}: {
  current: number;
  elapsed: number;
  isDismissable: boolean;
  swipeDirection: SheetRenderProps["swipeDirection"];
  rest: number;
  extent: number;
  size: number;
  viewport: number;
  travel: number;
}) {
  const bidirectional = swipeDirection === "horizontal" || swipeDirection === "vertical";
  const dismissesTowardStart = bidirectional
    ? travel > 0 || (travel === 0 && current < rest)
    : swipeDirection === "bottom" || swipeDirection === "right";
  const pointerDragged = dismissesTowardStart ? travel : -travel;
  const scrollDragged = dismissesTowardStart ? rest - current : current - rest;
  const dragged = Math.max(pointerDragged, scrollDragged);
  // Bottom and right sheets leave through scroll 0. Top and left leave at the far edge.
  const closed = dismissesTowardStart ? 0 : Math.max(0, extent);

  if (!isDismissable || dragged <= 0) return rest;

  const visible = size > 0 ? Math.min(size, viewport) : 0;
  const velocity = elapsed > 0 ? Math.abs(travel) / elapsed : 0;

  if (
    velocity > HANDLE_DRAG_VELOCITY ||
    (visible > 0 && dragged >= visible * SHEET_CLOSE_THRESHOLD)
  ) {
    return closed;
  }

  return rest;
}

export function nearestSheetSnap(targets: number[], current: number, velocity: number) {
  if (targets.length === 0) return null;

  if (velocity > HANDLE_DRAG_VELOCITY) {
    const lower = targets.filter((target) => target < current - 0.5);

    if (lower.length > 0) return Math.max(...lower);
  }

  if (velocity < -HANDLE_DRAG_VELOCITY) {
    const higher = targets.filter((target) => target > current + 0.5);

    if (higher.length > 0) return Math.min(...higher);
  }

  return targets.reduce((best, target) =>
    Math.abs(target - current) < Math.abs(best - current) ? target : best,
  );
}

/** Animate a scalar; DOM measurement and scrolling stay in the handle adapter. */
export function animateSheetValue(
  from: number,
  to: number,
  update: (value: number) => void,
  complete: () => void,
  reducedMotion: boolean,
) {
  let cancelled = false;
  let frame = 0;
  const start = performance.now();
  const cancel = () => {
    cancelled = true;
    cancelAnimationFrame(frame);
  };

  if (reducedMotion || Math.abs(to - from) < 0.5) {
    update(to);
    complete();

    return cancel;
  }

  const step = (now: number) => {
    if (cancelled) return;
    const progress = Math.min(1, Math.max(0, (now - start) / SHEET_RELEASE_MS));

    update(from + (to - from) * sheetReleaseEase(progress));
    if (progress < 1) frame = requestAnimationFrame(step);
    else complete();
  };

  frame = requestAnimationFrame(step);

  return cancel;
}
