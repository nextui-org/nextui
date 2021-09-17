function loadScript(src: string, container: HTMLElement | null) {
  const script = document.createElement('script');
  script.setAttribute('async', '');
  script.src = src;
  container && container.appendChild(script);
  return script;
}

export default loadScript;
