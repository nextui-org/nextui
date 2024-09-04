const App = `import {Alert} from "@nextui-org/react";

export default function App() {
  const title = "Email Sent!!";
  const description ="You will get a reply soon";

  return (
    <div className="flex items-center justify-center w-screen h-[400px]">
        <div className="flex flex-col">

            <div className="w-full flex-col items-center my-3">
                <h2 className="my-2 h2">isCloseable = true</h2>
                <Alert title = {title} description = {description} isCloseable={true} />
            </div>

            <div className="w-full flex-col items-center my-3">
                <h2 className="my-2 h2">isCloseable = false</h2>
                <Alert title = {title} description = {description} isCloseable={false} />
            </div>
            
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
