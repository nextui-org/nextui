const CheckIcon = `export const CheckIcon = (props) =>
  (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );`;

const CustomCheckbox = `import {useCheckbox, Chip, VisuallyHidden, tv} from "@nextui-org/react";
import {CheckIcon} from './CheckIcon.jsx'

const checkbox = tv({
  slots: {
    base: "border-default hover:bg-default-200",
    content: "text-default-500"
  },
  variants: {
    isSelected: {
      true: {
        base: "border-primary bg-primary hover:bg-primary-500 hover:border-primary-500",
        content: "text-primary-foreground pl-1"
      }
    },
    isFocusVisible: {
      true: { 
        base: "outline-none ring-2 !ring-primary ring-offset-2 ring-offset-background dark:ring-offset-background-dark",
      }
    }
  }
})

export const CustomCheckbox = (props) => {
  const {
    children,
    isSelected,
    isFocusVisible,
    getBaseProps,
    getLabelProps,
    getInputProps,
  } = useCheckbox({
    ...props
  })

  const styles = checkbox({ isSelected, isFocusVisible })

  return (
    <label {...getBaseProps()}>
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <Chip
        classNames={{
          base: styles.base(),
          content: styles.content(),
        }}
        color="primary"
        startContent={isSelected ? <CheckIcon className="ml-1" /> : null}
        variant="faded"
        {...getLabelProps()}
      >
        {children ? children : isSelected ? "Enabled" : "Disabled"}
      </Chip>
    </label>
  );
}`;

const App = `import {CheckboxGroup} from "@nextui-org/react";
import {CustomCheckbox} from "./CustomCheckbox";

export default function App() {
  const [groupSelected, setGroupSelected] = React.useState([]);

  return (
    <div className="flex flex-col gap-1 w-full">
      <CheckboxGroup
        className="gap-1"
        label="Select amenities"
        orientation="horizontal"
        value={groupSelected}
        onChange={setGroupSelected}
      >
        <CustomCheckbox value="wifi">Wifi</CustomCheckbox>
        <CustomCheckbox value="tv">TV</CustomCheckbox>
        <CustomCheckbox value="kitchen">Kitchen</CustomCheckbox>
        <CustomCheckbox value="parking">Parking</CustomCheckbox>
        <CustomCheckbox value="pool">Pool</CustomCheckbox>
        <CustomCheckbox value="gym">Gym</CustomCheckbox>
      </CheckboxGroup>
      <p className="mt-4 ml-1 text-default-500">
        Selected: {groupSelected.join(", ")}
      </p>
    </div>
  );
}`;

const react = {
  "/App.jsx": App,
  "/CustomCheckbox.jsx": CustomCheckbox,
  "/CheckIcon.jsx": CheckIcon,
};

export default {
  ...react,
};
