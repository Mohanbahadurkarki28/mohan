import { Button, Input } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";

import { registerUser } from "../../api";
import ErrorMessage from "../../components/common/error";

const schema = yup
  .object({
    firstname: yup.string().required("First name is required!"),
    lastname: yup.string().required("Last name is required!"),
    email: yup
      .string()
      .email("Must be a valid email!")
      .required("Email is required!"),
    password: yup.string().min(6, "Password must be 6 characters long!"),
  })
  .required();

const RegisterPage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { isPending, mutate } = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      navigate("/auth/login");
    },
    onError: (err) => {
      toast.error(err?.response?.data?.error || "ERROR WHILE REGISTERING", {
        position: "bottom-right",
      });
      console.log("error while log in", err);
    },
  });

  const onSubmit = async (data) => mutate(data);

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-center space-y-4"
      >
        <div className="space-y-2 w-full">
          <label htmlFor="firstname">First Name</label>
          <Input
            type="text"
            id="firstname"
            {...register("firstname", { required: true, maxLength: 20 })}
            className="p-2 rounded-md border w-full outline-purple-200"
          />
          <ErrorMessage message={errors.name?.message} />
        </div>
        <div className="space-y-2 w-full">
          <label htmlFor="lastname">Last Name</label>
          <Input
            type="text"
            id="lastname"
            {...register("lastname", { required: true, maxLength: 20 })}
            className="p-2 rounded-md border w-full outline-purple-200"
          />
          <ErrorMessage message={errors.name?.message} />
        </div>
        <div className="space-y-2 w-full">
          <label htmlFor="email">Email</label>
          <Input
            type="email"
            id="email"
            {...register("email", { required: true, maxLength: 20 })}
            className="p-2 rounded-md border w-full outline-purple-200"
          />
          <ErrorMessage message={errors.email?.message} />
        </div>
        <div className="space-y-2 w-full">
          <label htmlFor="password">Password</label>
          <Input
            type="password"
            id="password"
            {...register("password", { required: true })}
            className="p-2 rounded-md border w-full outline-purple-200"
          />
          <ErrorMessage message={errors.password?.message} />
        </div>
        <Button
          type="submit"
          className="p-2 w-full flex items-center justify-center bg-purple-500 rounded-md hover:bg-purple-600 transition-colors text-white"
        >
          {isPending && <Loader2 className="animate-spin mr-2 w-4 h-4" />}
          Continue
        </Button>
      </form>

      <div className="w-full flex justify-end">
        <span>Already have an account? </span>
        <Link to={`/auth/login`} className="ml-1 underline">
          Login
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;
