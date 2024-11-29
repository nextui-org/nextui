import App from "./international-calendar.raw.jsx?raw";
import AppTs from "./international-calendar.raw.tsx?raw";

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
