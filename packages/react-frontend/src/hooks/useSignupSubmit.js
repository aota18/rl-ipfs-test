import { useState } from "react";
import { useForm } from "react-hook-form";

const useSignupSubmit = (state) => {
  const [loading, setLoading] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    control,
  } = useForm({ defaultValues: state.signupInfo });

  return {
    onSubmit,
    handleSubmit,
    errors,
    register,
    loading,
    getValues,
    control,
  };
};

export default useSignupSubmit;
