import App from "./custom-items.raw.jsx?raw";
import AppTs from "./custom-items.raw.tsx?raw";

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
