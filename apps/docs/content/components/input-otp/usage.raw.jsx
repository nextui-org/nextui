import {InputOtp, Button} from "@nextui-org/react";

export default function App() {
  const [value, setValue] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Submitted OTP: " + value);
  };

  return (
    <form className="flex flex-col items-center gap-4" onSubmit={handleSubmit}>
      <InputOtp color="primary" length={4} size="lg" value={value} onValueChange={setValue} />
      <Button color="primary" type="submit">
        Verify OTP
      </Button>
    </form>
  );
}
