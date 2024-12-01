import App from "./async-loading-items.raw.jsx?raw";
import AppTs from "./async-loading-items.raw.tsx?raw";

const react = {
  "/App.jsx": App,
};

const reactTs = {
  "/App.tsx": AppTs,
};

export default {
  ...react,
  ...reactTs,
};
