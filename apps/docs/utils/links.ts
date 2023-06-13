export const isActive = (pathname: string | undefined | null, href: string) =>
  pathname && pathname.startsWith(href);
