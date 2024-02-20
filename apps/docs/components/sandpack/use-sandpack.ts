import {useMemo} from "react";
import {SandpackFiles, SandpackPredefinedTemplate} from "@codesandbox/sandpack-react";
import {useTheme} from "next-themes";
import {useLocalStorage} from "usehooks-ts";

import {HighlightedLines} from "./types";
import {getHighlightedLines, getFileName} from "./utils";
import {stylesConfig, postcssConfig, tailwindConfig, getHtmlFile, rootFile} from "./entries";

export interface UseSandpackProps {
  files?: SandpackFiles;
  typescriptStrict?: boolean;
  template?: SandpackPredefinedTemplate;
  highlightedLines?: HighlightedLines;
}

const importReact = 'import React from "react";';

export const useSandpack = ({
  files = {},
  typescriptStrict = false,
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

  const {theme} = useTheme();

  const decorators = getHighlightedLines(highlightedLines, currentTemplate);

  const sandpackTemplate = useMemo<SandpackPredefinedTemplate>(
    () => (currentTemplate === "vite-react-ts" && hasTypescript ? currentTemplate : "vite-react"),
    [currentTemplate, hasTypescript],
  );

  // map current template to its mime type
  const mimeType = useMemo(
    () => (sandpackTemplate === "vite-react-ts" ? ".tsx" : ".jsx"),
    [sandpackTemplate],
  );

  // get entry file by current template
  const entryFile = useMemo(
    () => (sandpackTemplate === "vite-react-ts" ? "index.tsx" : "index.jsx"),
    [sandpackTemplate],
  );

  // filter files by current template
  const filteredFiles = Object.keys(files).reduce((acc, key) => {
    if (key.includes("App") && !key.includes(mimeType)) {
      return acc;
    }
    if (typescriptStrict && currentTemplate === "vite-react-ts" && key.includes(".js")) {
      return acc;
    }
    if (currentTemplate === "vite-react" && key.includes(".ts")) {
      return acc;
    }
    // @ts-ignore
    acc[key] = files[key];

    return acc;
  }, {});

  let dependencies = {
    "framer-motion": "10.12.16",
    "@nextui-org/react": "latest",
  };

  // sort files by dependency
  const sortedFiles = Object.keys(filteredFiles)
    .sort((a: string, b: string) => {
      const aFile = files[a] as string;
      const bFile = files[b] as string;
      const aName = getFileName(a);
      const bName = getFileName(b);

      // if bName includes "App" should be first
      if (bName.includes("App")) {
        return 1;
      }

      if (aFile?.includes(bName)) {
        return -1;
      }
      if (bFile.includes(aName)) {
        return 1;
      }

      return 0;
    })
    .reduce((acc, key) => {
      let fileContent = files[key] as string;

      // Check if the file content includes 'React' import statements, if not, add it
      if (!fileContent.includes("from 'react'") && !fileContent.includes('from "react"')) {
        fileContent = `${importReact}\n${fileContent}\n`;
      }

      // Check if file content includes any other dependencies, if yes, add it to dependencies
      const importRegex = /import .* from ["'](.*)["']/g;
      let match;

      while ((match = importRegex.exec(fileContent)) !== null) {
        const dependencyName = match[1];

        if (!dependencies.hasOwnProperty(dependencyName) && !dependencyName.includes("./")) {
          // add the dependency to the dependencies object with version 'latest'
          // @ts-ignore
          dependencies[dependencyName] = "latest";
        }
      }

      return {
        ...acc,
        [key]: fileContent,
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

  const customSetup = {
    dependencies,
    entry: entryFile,
    devDependencies: {
      autoprefixer: "^10.4.14",
      postcss: "^8.4.21",
      tailwindcss: "^3.2.7",
    },
  };

  return {
    customSetup,
    files: {
      ...sortedFiles,
      [entryFile]: {
        code: rootFile,
        hidden: true,
      },
      "index.html": {
        code: getHtmlFile(theme ?? "light", entryFile),
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
