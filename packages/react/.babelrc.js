module.exports = (api) => {
  const env = api.env();

  let dev = false;
  let modules;
  let plugins;

  switch (env) {
    case "docs":
    case "test":
    case "dist-dev":
    case "development":
      dev = true;
      modules = false;
      break;
    case "dist-prod":
      plugins = ["@testing-library/babel-plugin-react"];
    case "production":
      plugins = ["@testing-library/babel-plugin-react"];
    case "esm":
      modules = false;
      break;
    case "cjs":
    default:
      modules = "commonjs";
  }

  const presets =
    env !== "test" && env !== "development"
      ? [
          [
            "@react-bootstrap",
            {
              dev,
              modules,
              removePropTypes: !dev,
            },
          ],
          "@babel/preset-typescript",
        ]
      : ["@babel/preset-env", "@babel/react", "@babel/preset-typescript"];

  return {
    presets,
    plugins,
    ignore:
      env !== "test" && env !== "development"
        ? [/@babel[\\|/]runtime/, /\.stories\.(js|ts|tsx)$/, /\.test\.(js|ts|tsx)$/]
        : [],
  };
};
