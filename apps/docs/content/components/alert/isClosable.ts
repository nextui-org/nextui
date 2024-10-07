const App = `import {Alert} from "@nextui-org/react";

export default function App() {
  const title = "Email Sent!!";
  const description ="You will get a reply soon";

  return (
    <div className="flex items-center justify-center w-screen">
      <div className="flex flex-col">
        <div className="w-full flex items-center my-3">
          <h2 className="my-2 mx-4">isClosable=true</h2>
          <Alert isClosable={true} title={title} description={description} />
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
