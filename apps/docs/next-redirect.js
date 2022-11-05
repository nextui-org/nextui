const path = require("path");

const shell = require("shelljs");

const rootDir = path.join(__dirname, ".");
const contentDir = path.join(rootDir, "content");
const docsDir = path.join(contentDir, "docs");
const componentsDocsDir = path.join(docsDir, "components");

const getComponentsName = () => {
  const names = shell
    .ls("-R", componentsDocsDir)
    .map((file) => path.join(process.cwd(), componentsDocsDir, file))
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => path.basename(file, ".mdx"));

  return names;
};
const getComponentsRoute = (names = []) => {
  return names.map((name) => {
    return {
      source: `/${name}`,
      destination: `/docs/components/${name}`,
      permanent: true,
    };
  });
};

async function redirect() {
  const componentsName = getComponentsName();

  return [
    ...getComponentsRoute(componentsName),
    {
      source: "/docs",
      destination: "/docs/guide/getting-started",
      permanent: true,
    },
    {
      source: "/docs/getting-started",
      destination: "/docs/guide/getting-started",
      permanent: true,
    },
    {
      source: "/guide",
      destination: "/docs/guide/getting-started",
      permanent: true,
    },
    {
      source: "/learn",
      destination: "/docs/guide/getting-started",
      permanent: true,
    },
    {
      source: "/theme",
      destination: "/docs/theme/default-theme",
      permanent: true,
    },
    {
      source: "/docs/theme",
      destination: "/docs/theme/default-theme",
      permanent: true,
    },
    {
      source: "/components/:path*",
      permanent: true,
      destination: "/docs/components/:path*",
    },
    {
      source: "/docs/components",
      destination: "/docs/components/button",
      permanent: true,
    },
    {
      source: "/components",
      destination: "/docs/components/button",
      permanent: true,
    },
  ];
}

module.exports = redirect;
