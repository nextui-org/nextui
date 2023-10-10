const App = `import {Slider} from "@nextui-org/react";

export default function App() {
  const [value, setValue] = React.useState(0.2);
  const [inputValue, setInputValue] = React.useState("0.2");

  const handleChange = (value) => {
    if (isNaN(Number(value))) return;

    setValue(value);
    setInputValue(value.toString());
  };

  return (
    <Slider 
      label="Temperature" 
      size="sm"
      step={0.01} 
      maxValue={1} 
      minValue={0} 
      color="foreground"
      classNames={{
        base: "max-w-md",
        label: "text-medium",
      }}
      // we extract the default children to render the input
      renderOutput={({children, ...props}) => (
        <output {...props}>
          <Tooltip
            className="px-2 text-tiny text-default-500 rounded-md"
            content="Press Enter to confirm"
            placement="right"
          >
            <input
              className="px-1 py-0.5 w-12 text-right text-small text-default-700 font-medium bg-default-100 outline-none transition-colors rounded-small border-medium border-transparent hover:border-primary focus:border-primary"
              type="text"
              value={inputValue}
              onChange={(e) => {
                const v = e.target.value;

                setInputValue(v);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !isNaN(Number(inputValue))) {
                  setValue(Number(inputValue));
                }
              }}
            />
          </Tooltip>
        </output>
      )}
      value={value}
      onChange={handleChange}
    />
  );
}`;

const AppTs = `import {Slider, SliderValue} from "@nextui-org/react";

export default function App() {
  const [value, setValue] = React.useState<SliderValue>(0.2);
  const [inputValue, setInputValue] = React.useState<string>("0.2");

  const handleChange = (value: SliderValue) => {
    if (isNaN(Number(value))) return;

    setValue(value);
    setInputValue(value.toString());
  };

  return (
    <Slider 
      label="Temperature" 
      size="sm"
      step={0.01} 
      maxValue={1} 
      minValue={0} 
      color="foreground"
      classNames={{
        base: "max-w-md",
        label: "text-medium",
      }}
      // we extract the default children to render the input
      renderOutput={({children, ...props}) => (
        <output {...props}>
          <Tooltip
            className="px-2 text-tiny text-default-500 rounded-md"
            content="Press Enter to confirm"
            placement="right"
          >
            <input
              className="px-1 py-0.5 w-12 text-right text-small text-default-700 font-medium bg-default-100 outline-none transition-colors rounded-small border-medium border-transparent hover:border-primary focus:border-primary"
              type="text"
              value={inputValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const v = e.target.value;

                setInputValue(v);
              }}
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === "Enter" && !isNaN(Number(inputValue))) {
                  setValue(Number(inputValue));
                }
              }}
            />
          </Tooltip>
        </output>
      )}
      value={value}
      onChange={handleChange}
    />
  );
}`;

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
