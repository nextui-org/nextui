export const isActive = (pathname: string, href: string) =>
  pathname && pathname.startsWith(href);
