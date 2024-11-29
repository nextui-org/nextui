import App from "./custom-cells.raw.jsx?raw";
import AppTs from "./custom-cells.raw.tsx?raw";

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
