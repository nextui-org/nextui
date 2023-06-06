import {useMemo} from "react";
import {
  SandpackFiles,
  SandpackPredefinedTemplate,
  SandpackSetup,
} from "@codesandbox/sandpack-react";

import {HighlightedLines} from "./types";
import {getHighlightedLines, getFileName} from "./utils";
import {defaultEntry, stylesConfig, postcssConfig, tailwindConfig} from "./entries";

import {useLocalStorage} from "@/hooks/use-local-storage";

export interface UseSandpackProps {
  files?: SandpackFiles;
  template?: SandpackPredefinedTemplate;
  highlightedLines?: HighlightedLines;
}

export const useSandpack = ({
  files = {},
  template = "vite-react",
  highlightedLines,
}: UseSandpackProps) => {
  // once the user select a template we store it in local storage
  const [currentTemplate, setCurrentTemplate] = useLocalStorage<SandpackPredefinedTemplate>(
    "currentTemplate",
    template,
  );
  const hasTypescript = Object.keys(files).some(
    (file) => file.includes(".ts") || file.includes(".tsx"),
  );

  const decorators = getHighlightedLines(highlightedLines, currentTemplate);

  const sandpackTemplate = useMemo<SandpackPredefinedTemplate>(
    () => (currentTemplate === "vite-react-ts" && hasTypescript ? currentTemplate : "vite-react"),
    [currentTemplate, hasTypescript],
  );

  // map current template to its mime type
  const mimeType = useMemo(() => (sandpackTemplate === "vite-react-ts" ? ".tsx" : ".jsx"), [
    sandpackTemplate,
  ]);

  // get entry file by current template
  const entryFile = useMemo(
    () => (sandpackTemplate === "vite-react-ts" ? "index.tsx" : "index.jsx"),
    [sandpackTemplate],
  );

  // filter files by current template
  const filteredFiles = Object.keys(files).reduce((acc, key) => {
    if (key.includes(mimeType)) {
      // @ts-ignore
      acc[key] = files[key];
    }

    return acc;
  }, {});

  // sort files by dependency
  const sortedFiles = Object.keys(filteredFiles)
    .sort((a: string, b: string) => {
      const aFile = files[a] as string;
      const bFile = files[b] as string;
      const aName = getFileName(a);
      const bName = getFileName(b);

      if (aFile?.includes(bName)) {
        return -1;
      }
      if (bFile.includes(aName)) {
        return 1;
      }

      return 0;
    })
    .reduce((acc, key) => {
      return {
        ...acc,
        [key]: files[key],
      };
    }, {});

  /**
   * Uncomment this logic when specific imports are needed
   */
  // const nextUIComponents = useMemo(
  //   () =>
  //     Object.values(getNextUIComponents(sortedFiles) || {}).flatMap((e) =>
  //       e.split(",").map((name) => name.replace(/"/g, "")),
  //     ),
  //   [sortedFiles],
  // );

  // const hasComponents = !isEmpty(nextUIComponents);

  // const dependencies = useMemo(() => {
  //   let deps = {
  //     "framer-motion": "10.12.16",
  //   };

  //   if (hasComponents) {
  //     let deps = {
  //       "@nextui-org/theme": "dev-v2",
  //       "@nextui-org/system": "dev-v2",
  //     };

  //     nextUIComponents.forEach((component) => {
  //       deps = {
  //         ...deps,
  //         [`@nextui-org/${component}`]: "dev-v2",
  //       };
  //     });

  //     return deps;
  //   }

  //   return {
  //     ...deps,
  //     "@nextui-org/react": "dev-v2",
  //   };
  // }, [hasComponents, nextUIComponents, component]);

  // const tailwindConfigFile = useMemo(
  //   () => (hasComponents ? updateTailwindConfig(tailwindConfig, nextUIComponents) : tailwindConfig),
  //   [tailwindConfig, nextUIComponents],
  // );

  const customSetup = useMemo<SandpackSetup>(
    () => ({
      entry: entryFile,
      dependencies: {
        "framer-motion": "10.12.16",
        "@nextui-org/react": "dev-v2",
      },
      devDependencies: {
        autoprefixer: "^10.4.14",
        postcss: "^8.4.21",
        tailwindcss: "^3.2.7",
      },
    }),
    [entryFile],
  );

  return {
    customSetup,
    files: {
      ...sortedFiles,
      [entryFile]: {
        code: defaultEntry,
        hidden: true,
      },
      "tailwind.config.js": {
        code: tailwindConfig,
        hidden: true,
      },
      "postcss.config.js": {
        code: postcssConfig,
        hidden: true,
      },
      "styles.css": {
        code: stylesConfig,
        hidden: true,
      },
    },
    hasTypescript,
    entryFile,
    sortedFiles,
    decorators,
    sandpackTemplate,
    setCurrentTemplate,
  };
};
