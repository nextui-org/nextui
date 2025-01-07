import {InputOtp} from "@heroui/react";
import {useForm, Controller, SubmitHandler} from "react-hook-form";
import {Button} from "@heroui/react";

interface FormValues {
  otp: string;
}

export default function App() {
  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm<FormValues>({
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
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
            errorMessage={errors.otp?.message}
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
