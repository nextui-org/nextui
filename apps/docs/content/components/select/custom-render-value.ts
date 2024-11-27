import App from "./custom-render-value.raw.jsx?raw";
import AppTs from "./custom-render-value.raw.tsx?raw";

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
