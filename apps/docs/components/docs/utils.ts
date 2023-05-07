import {addTagToSlug} from "@/libs/docs/page";
import {removeFromLast} from "@/utils";

export const getRoutePaths = (path: string, tag?: string) => {
  const pagePath = path ? removeFromLast<string>(path, ".") : path;
  const pathname = pagePath ? addTagToSlug(pagePath, tag) : pagePath;

  return {
    pagePath,
    pathname,
  };
};
