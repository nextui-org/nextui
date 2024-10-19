const App = `import {Alert} from "@nextui-org/react";

export default function App() {
  const title = "Email Sent!!";
  const description = "You will get a reply soon";

  return (
    <div className="flex items-center justify-center w-screen">
        <div className="flex flex-col w-full">
            {["none", "sm", "md", "lg", "full"].map((radius) => (
                <div key={radius} className="w-full flex items-center my-3">
                  <span className="mx-4 text-md">{radius}</span>
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