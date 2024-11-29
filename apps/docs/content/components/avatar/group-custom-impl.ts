import App from "./group-custom-impl.raw.jsx?raw";
import AppTs from "./group-custom-impl.raw.tsx?raw";

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
