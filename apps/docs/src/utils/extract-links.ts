import {siteConfig} from "@/config/site";
import {
  COMPONENT_PATH,
  COMPONENT_PATH_NATIVE,
  COMPONENT_STYLES_PATH,
  COMPONENT_STYLES_PATH_NATIVE,
  STORYBOOK_URL,
  THEMES_PATH,
} from "@/utils/constants";
import {readFrontmatter} from "@/utils/frontmatter";

export interface ComponentLinksType {
  rac?: string;
  radix?: string;
  source?: string;
  source_native?: string;
  styles?: string;
  styles_native?: string;
  storybook?: string;
  themes?: string;
  tailwind?: string;
  figma?: boolean;
  [key: string]: string | boolean | undefined;
}

export interface GithubInfoType {
  pull?: number;
}

/**
 * Extracts the links field from MDX frontmatter
 * @param content - The raw MDX content string
 * @returns The parsed links object or null if not found
 */
export function extractLinksFromMDX(content: string): ComponentLinksType | null {
  try {
    const {data} = readFrontmatter(content);

    if (data["links"] && typeof data["links"] === "object") {
      return data["links"] as ComponentLinksType;
    }

    return null;
  } catch (error) {
    console.error("Error extracting links from MDX:", error);

    return null;
  }
}

/**
 * Extracts the github field from MDX frontmatter
 * @param content - The raw MDX content string
 * @returns The parsed github object or null if not found
 */
export function extractGithubFromMDX(content: string): GithubInfoType | null {
  try {
    const {data} = readFrontmatter(content);

    if (data["github"] && typeof data["github"] === "object") {
      return data["github"] as GithubInfoType;
    }

    return null;
  } catch (error) {
    console.error("Error extracting github info from MDX:", error);

    return null;
  }
}

/**
 * Extracts the image field from MDX frontmatter
 * @param content - The raw MDX content string
 * @returns The image URL string or null if not found
 */
export function extractImageFromMDX(content: string): string | null {
  try {
    const {data} = readFrontmatter(content);

    if (data["image"] && typeof data["image"] === "string") {
      return data["image"];
    }

    return null;
  } catch (error) {
    console.error("Error extracting image from MDX:", error);

    return null;
  }
}

/**
 * Converts a Storybook title to a URL path segment
 * Handles both grouped titles (e.g., "Components/Buttons/Button") and simple titles
 * @param title - The Storybook title
 * @returns URL-safe path segment
 */
function convertStorybookTitleToPath(title: string): string {
  // Remove emojis and trim whitespace
  const cleaned = title.replace(/[\u{1F300}-\u{1F9FF}]/gu, "").trim();

  // Split by "/" and convert each part to kebab-case
  return cleaned
    .split("/")
    .map((part) =>
      part
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, ""),
    )
    .filter(Boolean)
    .join("-");
}

/**
 * Generates component link URLs based on the extracted links
 * @param links - The extracted links object
 * @returns An object with formatted URLs
 */
export function generateComponentLinks(links: ComponentLinksType | null) {
  if (!links) return null;

  // Handle storybook link: can be either a simple slug or a full title path
  let storybookUrl: string | undefined;

  if (links.storybook) {
    // If the storybook value contains "/", treat it as a full Storybook title
    if (links.storybook.includes("/")) {
      const pathSegment = convertStorybookTitleToPath(links.storybook);

      storybookUrl = `${STORYBOOK_URL}/?path=/docs/${pathSegment}`;
    } else {
      // Legacy support: treat as simple slug (kept for backward compatibility)
      storybookUrl = `${STORYBOOK_URL}/?path=/docs/components-${links.storybook}`;
    }
  }

  return {
    figma: links.figma ? siteConfig.figmaCommunityFile : undefined,
    rac: links.rac ? `https://react-aria.adobe.com/${links.rac}` : undefined,
    radix: links.radix
      ? `https://www.radix-ui.com/primitives/docs/components/${links.radix}`
      : undefined,
    source: links.source ? `${COMPONENT_PATH}/${links.source}` : undefined,
    source_native: links.source_native
      ? `${COMPONENT_PATH_NATIVE}/${links.source_native}`
      : undefined,
    storybook: storybookUrl,
    styles: links.styles ? `${COMPONENT_STYLES_PATH}/${links.styles}` : undefined,
    styles_native: links.styles_native
      ? `${COMPONENT_STYLES_PATH_NATIVE}/${links.styles_native}`
      : undefined,
    tailwind: links.tailwind ? `https://tailwindcss.com/docs/${links.tailwind}` : undefined,
    themes: links.themes ? THEMES_PATH : undefined,
  };
}
