import {Alert} from "@nextui-org/react";

export default function App() {
  return (
    <div className="flex items-center justify-center w-full">
      <Alert
        hideIconWrapper
        color="secondary"
        description="This is a bordered variant alert"
        title="Bordered Alert"
        variant="bordered"
      />
    </div>
  );
}
