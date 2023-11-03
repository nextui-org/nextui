const App = `import {Autocomplete, AutocompleteItem, AutocompleteSection} from "@nextui-org/react";

export default function App() {
  const headingClasses = "flex w-full sticky top-1 z-20 py-1.5 px-2 bg-default-100 shadow-small rounded-small";

  return (
    <Autocomplete
      label="Favorite Animal"
      variant="bordered"
      placeholder="Search an animal"
      className="max-w-xs"
      scrollShadowProps={{
        isEnabled: false,
      }}
    >
      <AutocompleteSection 
        title="Mammals"
        classNames={{
          heading: headingClasses,
        }}
      >
        <AutocompleteItem key="Lion">Lion</AutocompleteItem>
        <AutocompleteItem key="Tiger">Tiger</AutocompleteItem>
        <AutocompleteItem key="Elephant">Elephant</AutocompleteItem>
        <AutocompleteItem key="Kangaroo">Kangaroo</AutocompleteItem>
        <AutocompleteItem key="Panda">Panda</AutocompleteItem>
        <AutocompleteItem key="Giraffe">Giraffe</AutocompleteItem>
        <AutocompleteItem key="Zebra">Zebra</AutocompleteItem>
        <AutocompleteItem key="Cheetah">Cheetah</AutocompleteItem>
      </AutocompleteSection>
      <AutocompleteSection 
        title="Birds"
        classNames={{
          heading: headingClasses,
        }}
      >
        <AutocompleteItem key="Eagle">Eagle</AutocompleteItem>
        <AutocompleteItem key="Parrot">Parrot</AutocompleteItem>
        <AutocompleteItem key="Penguin">Penguin</AutocompleteItem>
        <AutocompleteItem key="Ostrich">Ostrich</AutocompleteItem>
        <AutocompleteItem key="Peacock">Peacock</AutocompleteItem>
        <AutocompleteItem key="Swan">Swan</AutocompleteItem>
        <AutocompleteItem key="Falcon">Falcon</AutocompleteItem>
        <AutocompleteItem key="Flamingo">Flamingo</AutocompleteItem>
      </AutocompleteSection>
    </Autocomplete>
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
