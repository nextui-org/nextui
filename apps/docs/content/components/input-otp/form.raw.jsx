import {InputOtp} from "@nextui-org/react";
import {useForm, Controller} from "react-hook-form";
import {Button} from "@nextui-org/react";

export default function App() {
  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm({
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };

  return (
    <form className="flex flex-col gap-4 w-full max-w-[300px]" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="otp"
        render={({field}) => (
          <InputOtp
            {...field}
            errorMessage={errors.otp && errors.otp.message}
            isInvalid={!!errors.otp}
            length={4}
          />
        )}
        rules={{
          required: "OTP is required",
          minLength: {
            value: 4,
            message: "Please enter a valid OTP",
          },
        }}
      />
      <Button className="max-w-fit" type="submit" variant="flat">
        Verify OTP
      </Button>
    </form>
  );
}
