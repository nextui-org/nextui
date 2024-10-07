const App = `import {Alert} from "@nextui-org/react";

export default function App() {
  const title = "Email Sent!!";
  const description = "You will get a reply soon";

  return (
    <div className="flex items-center justify-center w-screen">
        <div className="flex flex-col">
            {["none", "sm", "md", "lg", "full"].map((radius) => (
                <div key={radius} className="w-full flex justify-between items-center my-3">
                  <h4 className="mx-4 text-md">{radius}</h4>
                  <Alert title={title} description={description} radius={radius} />
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
