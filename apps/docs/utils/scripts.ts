export const loadScript = (src: string, container: HTMLElement | null) => {
  const script = document.createElement("script");

  script.setAttribute("async", "");
  script.src = src;
  container && container.appendChild(script);

  return script;
};

export const removeScript = (
  script: HTMLScriptElement | HTMLElement,
  container: HTMLElement | null,
) => {
  if (script.parentNode != container) return;
  container && container?.removeChild(script);
};
