import {SandpackPredefinedTemplate, SandpackFiles} from "@codesandbox/sandpack-react";

import {HighlightedLines, HighlightedLine} from "./types";

const getLines = (lines?: string): HighlightedLine => {
  const [start, end] = lines?.includes("-") ? lines?.split("-") : [0, 0];

  const count = end ? parseInt(`${end}`, 10) - parseInt(`${start}`, 10) + 1 : 0;

  return {
    start,
    end,
    count,
  };
};

export const getHighlightedLines = (
  highlightedLines?: HighlightedLines,
  template?: SandpackPredefinedTemplate,
) => {
  if (!highlightedLines) {
    return [];
  }

  let lines: HighlightedLine = {};

  // if integer, we assume it's a line number
  if (Number.isInteger(Number(highlightedLines))) {
    return [
      {
        className: "sp-highlight",
        line: Number(highlightedLines),
      },
    ];
  }

  if (typeof highlightedLines === "string") {
    lines = getLines(highlightedLines);
  }

  if (typeof highlightedLines === "object" && template) {
    const templateLines = highlightedLines[template];

    if (Number.isInteger(Number(templateLines))) {
      return [
        {
          className: "sp-highlight",
          line: Number(templateLines),
        },
      ];
    }
    lines = getLines(templateLines);
  }

  if (!lines.count || lines.count === 0) {
    return [];
  }

  // map linesCount to { className: 'sp-highlight', line: 1 }
  return Array.from({length: lines.count}, (_, i) => ({
    className: "sp-highlight",
    line: parseInt(`${lines.start}`, 10) + i,
  }));
};

export const getFileName = (filePath: string) => {
  return filePath?.split(".")?.[0]?.replace(/\W/g, "");
};

export const getId = () => {
  return Math.random().toString(32).slice(2, 10);
};

export function getNextUIComponents(files: SandpackFiles): {[filePath: string]: string} {
  const output: {[filePath: string]: string} = {};

  for (const filePath in files) {
    const file = files[filePath];
    const code = typeof file === "string" ? file : file.code;

    // Extract the import statements
    const importStatements = extractNextUIImport(code);

    // Convert the import statements
    const convertedImports = importStatements.map(convertImportStatement);

    // Join the converted import statements and assign them to the output dictionary
    output[filePath] = convertedImports.join("\n");
  }

  return output;
}

export function extractNextUIImport(code: string): string[] {
  // Split the code into lines
  const lines = code.split("\n");

  // Filter the lines to only include import statements from "@nextui-org/react"
  const importStatements = lines.filter(
    (line) => line.startsWith("import") && line.includes("@nextui-org/react"),
  );

  // Return the import statements
  return importStatements;
}

export function convertImportStatement(importStatement: string): string[] {
  // Use a regular expression to find the part of the string between the curly braces
  const matches = importStatement.match(/{(.*)}/);

  // If the regular expression found a match
  if (matches && matches[1]) {
    // Split the match into individual components, trim whitespace, convert to lowercase
    const components = matches[1].split(",").map((item) => item.trim().toLowerCase());

    // Filter the components to exclude those that start with the name of another component
    const filteredComponents = components.filter(
      (component, index, self) =>
        !self.some((other, otherIndex) => otherIndex !== index && component.startsWith(other)),
    );

    // Wrap each in quotes to create a string representation of a string array
    return filteredComponents;
  }

  // If the regular expression didn't find a match, return an empty string
  return [];
}

export function updateTailwindConfig(tailwindConfig: string, componentNames: string[]): string {
  // Split the tailwindConfig into lines
  const lines = tailwindConfig.split("\n");

  // Find the index of the line to replace
  const lineIndex = lines.findIndex((line) =>
    line.includes("./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"),
  );

  // If the line was found
  if (lineIndex !== -1) {
    // Remove the line to replace
    lines.splice(lineIndex, 1);

    // Add the new lines for each component name
    componentNames.forEach((componentName) => {
      // Remove the quotes from the component name
      const name = componentName.replace(/"/g, "");

      // Add the new line
      lines.splice(
        lineIndex,
        0,
        `  "./node_modules/@nextui-org/theme/dist/components/${name}.js",`,
      );
    });
  }

  // Join the lines back together and return the result
  return lines.join("\n");
}
