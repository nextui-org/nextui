const SelectorIcon = `export const SelectorIcon = () => (
  <svg height="1em" viewBox="0 0 24 24" width="1em">
    <g
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    >
      <path d="M8 2v4m8-4v4" />
      <rect height="18" rx="2" width="18" x="3" y="4" />
      <path d="M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01" />
    </g>
  </svg>
);`;

const App = `import {DatePicker} from "@nextui-org/react";
import {SelectorIcon} from './SelectorIcon';

export default function App() {
  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <DatePicker 
        label="Birth date"
        selectorIcon={<SelectorIcon />}
      />
    </div> 
  );
}`;

const react = {
  "/App.jsx": App,
  "/SelectorIcon.jsx": SelectorIcon,
};

export default {
  ...react,
};
