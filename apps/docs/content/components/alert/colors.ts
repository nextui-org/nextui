const App = `import {Alert} from "@nextui-org/react";

export default function App() {
  const title = "Email Sent!!";
  const description = "You will get a reply soon";

  return (
    <div className="flex items-center justify-center w-screen">
        <div className="flex flex-col">
            {["default", "primary", "secondary", "success", "warning", "danger"].map((color) => (
                <div key={color} className="w-full flex justify-between items-center my-3">
                    <h4 className="mx-4 text-md">{color}</h4>
                    <Alert title={title} description={description} color={color} />
                </div>
            ))}
        </div>
    </div>
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
