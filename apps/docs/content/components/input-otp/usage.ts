const App = `import {InputOtp, Button} from "@nextui-org/react";

export default function App() {
  const [value, setValue] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted OTP:", value);
    alert("Submitted OTP: " + value);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
      <InputOtp
        length={4}
        value={value}
        onValueChange={setValue}
        color="primary"
        size="lg"
      />
      <Button type="submit" color="primary">
        Verify OTP
      </Button>
    </form>
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
