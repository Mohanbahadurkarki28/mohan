import { Button, Input } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";

import { Loader2 } from "lucide-react";
import { loginUser } from "../../api";
import ErrorMessage from "../../components/common/error";
import { useAuth } from "../../hooks/use-auth";

const schema = yup
  .object({
    email: yup
      .string()
      .email("Must be a valid email!")
      .required("Email is required!"),
    password: yup.string().min(6, "Password must be 6 characters long!"),
  })
  .required();

const LoginPage = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    mutate(data);
  };

  const { isPending, mutate } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      setAuth(data.data.token, data.data.user);
      navigate("/");
    },
    onError: (err) => {
      toast.error(err?.response?.data?.error || "ERROR WHILE REGISTERING", {
        position: "bottom-right",
      });
      console.log("error while log in", err);
    },
  });

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-center space-y-4"
      >
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
          disabled={isPending}
          className="p-2 w-full flex items-center justify-center bg-purple-500 rounded-md hover:bg-purple-600 transition-colors text-white disabled:bg-gray-500"
        >
          {isPending && <Loader2 className="animate-spin mr-2 w-4 h-4" />}
          Continue
        </Button>
      </form>

      <div className="w-full flex flex-col items-end">
        <div>
          <span>Don&apos;t have an account? </span>
          <Link to={`/auth/register`} className="ml-1 underline">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
