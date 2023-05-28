const App = `import {Chip} from "@nextui-org/react";

const initialFruits = ["Apple", "Banana", "Cherry", "Watermelon", "Orange"]

export default function App() {
  const [fruits, setFruits] = React.useState(initialFruits);

  const handleClose = (fruitToRemove) => {
    setFruits(fruits.filter(fruit => fruit !== fruitToRemove));
    if (fruits.length === 1) {
      setFruits(initialFruits);
    }
  };

  return (
    <div className="flex gap-2">
      {fruits.map((fruit, index) => (
        <Chip key={index} onClose={() => handleClose(fruit)} variant="flat">
          {fruit}
        </Chip>
      ))}
    </div>
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
