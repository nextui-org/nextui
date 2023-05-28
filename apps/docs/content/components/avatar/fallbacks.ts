const App = `import {Avatar} from "@nextui-org/react

export default function App() {
  return (
    <div className="flex gap-4 items-center">
      <Avatar showFallback src='https://images.unsplash.com/broken' />
      <Avatar showFallback name='Jane' src='https://images.unsplash.com/broken' />
      <Avatar name='Joe' src='https://images.unsplash.com/broken' />
    </div>
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
