export function removeFromLast<T>(path: string, key: string): string | T {
  const i = path.lastIndexOf(key);

  return i === -1 ? path : path.substring(0, i);
}

export interface Heading {
  text: string;
  id: string;
}

export function getHeadings(): Heading[] {
  const headings = document.getElementsByClassName("linked-heading") as HTMLCollection;

  return Array.from(headings).map((e) => {
    return {
      id: e.id,
      text: e.getAttribute("data-name"),
    };
  }) as Heading[];
}
