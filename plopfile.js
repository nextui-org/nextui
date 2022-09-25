/**
 * Part of this code is taken from @chakra-ui/react package ❤️
 */

const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const camelCase = (str) => {
  return str.replace(/[-_](\w)/g, (_, c) => c.toUpperCase());
};

const workspaces = ["components", "core", "hooks", "utilities"];
const generators = ["component", "package", "hook"];

/**
 * @param {import("plop").NodePlopAPI} plop
 */
module.exports = function main(plop) {
  plop.setHelper("capitalize", (text) => {
    return capitalize(camelCase(text));
  });

  generators.forEach((gen) => {
    plop.setGenerator(gen, {
      description: `Generates a ${gen}`,
      prompts: [
        {
          type: "input",
          name: `${gen}Name`,
          message: `Enter ${gen} name:`,
        },
        {
          type: "input",
          name: "description",
          message: `The description of this ${gen}:`,
        },
        {
          type: "list",
          name: "outDir",
          message: `where should this ${gen} live?`,
          default: "packages",
          choices: workspaces,
        },
      ],
      actions(answers) {
        const actions = [];

        if (!answers) return actions;

        const {description, outDir} = answers;
        const generatorName = answers[`${gen}Name`] ?? "";

        const data = {
          [`${gen}Name`]: generatorName,
          description,
          outDir,
        };

        actions.push({
          type: "addMany",
          templateFiles: `plop/${gen}/**`,
          destination: `./packages/{{outDir}}/{{dashCase ${gen}Name}}`,
          base: `plop/${gen}`,
          data,
          abortOnFail: true,
        });

        return actions;
      },
    });
  });
};
