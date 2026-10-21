type NativeComponentPage = {
  data: {description?: string; title: string};
  path: string;
  url: string;
};

const NATIVE_COMPONENTS_CATEGORY_REGEX =
  /<NativeComponentsCategory\s+category\s*=\s*["']([^"']+)["']\s*\/>/g;

function categoryToDirectory(category: string): string {
  return category.toLowerCase().replace(/\s+/g, "-");
}

/**
 * The Native components overview is assembled from MDX component categories.
 * Expand those categories in the machine-readable representation so its
 * content matches the server-rendered component catalogue.
 */
export function replaceNativeComponentsCategories(
  content: string,
  pages: NativeComponentPage[],
): string {
  return content.replace(NATIVE_COMPONENTS_CATEGORY_REGEX, (_match, category: string) => {
    const directory = categoryToDirectory(category);
    const categoryPath = `/native/components/(${directory})/`;
    const components = pages.filter((page) => page.path.includes(categoryPath));

    if (components.length === 0) return "";

    return components
      .map((page) => {
        const description = page.data.description ? `: ${page.data.description}` : "";

        return `- [${page.data.title}](${page.url})${description}`;
      })
      .join("\n");
  });
}
