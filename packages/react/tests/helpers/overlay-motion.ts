const KEYFRAME_META = new Set(["composite", "computedOffset", "easing", "offset"]);

/** Stretch one phase so the running animation can be inspected. Only the duration changes. */
export const stretchAnimation = (selector: string) => {
  const style = document.createElement("style");

  style.textContent = `${selector} { animation-duration: 10s !important; }`;
  document.head.append(style);
  onTestFinished(() => style.remove());
};

/** Properties a CSS animation actually interpolates, ignoring keyframe metadata. */
export const animatedProperties = (element: HTMLElement) => {
  const animation = element
    .getAnimations()
    .find((item): item is CSSAnimation => item instanceof CSSAnimation);
  const keyframes =
    animation?.effect instanceof KeyframeEffect ? animation.effect.getKeyframes() : [];

  return {
    animation,
    properties: [
      ...new Set(
        keyframes.flatMap((keyframe) =>
          Object.keys(keyframe).filter((property) => !KEYFRAME_META.has(property)),
        ),
      ),
    ].sort(),
  };
};
