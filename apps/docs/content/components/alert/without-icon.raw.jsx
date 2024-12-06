import {Alert} from "@nextui-org/react";

export default function App() {
  const title = "This is an alert";
  const description = "Thanks for subscribing to our newsletter!";

  return (
    <div className="flex items-center justify-center w-full">
      <Alert hideIcon color="success" description={description} title={title} variant="faded" />
    </div>
  );
}
