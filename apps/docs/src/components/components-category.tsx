import type {StatusChipStatus} from "./status-chip";

import {cn} from "@/utils/cn";

import {source} from "../lib/source";

import {ComponentItem} from "./component-item";

// Component groups matching meta.json structure
const COMPONENT_GROUPS = [
  {
    category: "Buttons",
    components: [
      "(buttons)/button",
      "(buttons)/button-group",
      "(buttons)/close-button",
      "(buttons)/toggle-button",
      "(buttons)/toggle-button-group",
    ],
  },
  {
    category: "Forms",
    components: [
      "(forms)/checkbox",
      "(forms)/checkbox-group",
      "(forms)/description",
      "(forms)/error-message",
      "(forms)/field-error",
      "(forms)/fieldset",
      "(forms)/form",
      "(forms)/input",
      "(forms)/input-group",
      "(forms)/input-otp",
      "(forms)/label",
      "(forms)/number-field",
      "(forms)/radio-group",
      "(forms)/search-field",
      "(forms)/text-field",
      "(forms)/text-area",
    ],
  },
  {
    category: "Date and Time",
    components: [
      "(date-and-time)/calendar",
      "(date-and-time)/date-field",
      "(date-and-time)/date-picker",
      "(date-and-time)/date-range-picker",
      "(date-and-time)/range-calendar",
      "(date-and-time)/time-field",
    ],
  },
  {
    category: "Navigation",
    components: [
      "(navigation)/accordion",
      "(navigation)/breadcrumbs",
      "(navigation)/disclosure",
      "(navigation)/disclosure-group",
      "(navigation)/link",
      "(navigation)/pagination",
      "(navigation)/tabs",
    ],
  },
  {
    category: "Overlays",
    components: [
      "(overlays)/alert-dialog",
      "(overlays)/drawer",
      "(overlays)/modal",
      "(overlays)/popover",
      "(overlays)/toast",
      "(overlays)/tooltip",
      "(overlays)/sheet",
    ],
  },
  {
    category: "Collections",
    components: ["(collections)/dropdown", "(collections)/list-box", "(collections)/tag-group"],
  },
  {
    category: "Controls",
    components: ["(controls)/slider", "(controls)/switch"],
  },
  {
    category: "Feedback",
    components: [
      "(feedback)/alert",
      "(feedback)/meter",
      "(feedback)/progress-bar",
      "(feedback)/progress-circle",
      "(feedback)/skeleton",
      "(feedback)/spinner",
    ],
  },
  {
    category: "Layout",
    components: ["(layout)/card", "(layout)/separator", "(layout)/surface", "(layout)/toolbar"],
  },
  {
    category: "Media",
    components: ["(media)/avatar", "(media)/avatar-group"],
  },
  {
    category: "Pickers",
    components: ["(pickers)/autocomplete", "(pickers)/combo-box", "(pickers)/select"],
  },
  {
    category: "Typography",
    components: ["(typography)/kbd", "(typography)/typography"],
  },
  {
    category: "Data Display",
    components: ["(data-display)/badge", "(data-display)/chip", "(data-display)/table"],
  },
  {
    category: "Colors",
    components: [
      "(colors)/color-area",
      "(colors)/color-field",
      "(colors)/color-picker",
      "(colors)/color-slider",
      "(colors)/color-swatch",
      "(colors)/color-swatch-picker",
    ],
  },
  {
    category: "Utilities",
    components: ["(utilities)/scroll-shadow"],
  },
] as const;

const componentStatusIcons = ["preview", "new", "updated", "new-dot"];

interface ComponentWithStatus {
  component: {
    name: string;
    title: string;
    description: string;
    href: string;
    category?: string;
  };
  status?: StatusChipStatus;
}

interface ComponentCategory {
  category: string;
  locale: string;
}

function isRouteGroup(part: string): boolean {
  return part.startsWith("(") && part.endsWith(")");
}

function getComponentNameFromPath(path: string): string {
  return path.split("/").pop() || path;
}

function getComponentWithStatus(path: string, locale: string): ComponentWithStatus | null {
  const pathWithoutRouteGroups = path
    .split("/")
    .filter((part) => !isRouteGroup(part))
    .join("/");

  const pagePath = ["react", "components", ...pathWithoutRouteGroups.split("/")].filter(Boolean);
  const page = source.getPage(pagePath, locale);

  if (!page) return null;

  const title = page.data.title || "";
  const description = page.data.description || "";
  const componentName = getComponentNameFromPath(path);
  const icon = page.data.icon;
  const status: StatusChipStatus | undefined =
    icon && componentStatusIcons.includes(icon) ? (icon as StatusChipStatus) : undefined;

  return {
    component: {
      category: undefined,
      description,
      href: page.url,
      name: componentName,
      title,
    },
    status,
  };
}

export function ComponentsCategory({category, locale}: ComponentCategory) {
  const group = COMPONENT_GROUPS.find((group) => group.category === category);

  if (!group) return null;

  const components = group.components
    .map((path) => getComponentWithStatus(path, locale))
    .filter((item): item is ComponentWithStatus => item !== null);

  if (components.length === 0) return null;

  return (
    <div className={cn("not-prose flex flex-col gap-12")}>
      <div key={group.category} className="flex flex-col gap-6">
        <div className={cn("grid grid-cols-1 gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-3")}>
          {components.map(({component, status}) => (
            <ComponentItem
              key={component.name}
              component={component}
              openInNewTab={false}
              status={status}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
