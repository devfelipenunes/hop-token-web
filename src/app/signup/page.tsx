"use client";

import api from "@/service/api";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

const SignUp = () => {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const onSubmit = async (data: any) => {
    api
      .post("/register", data)
      .then((response) => {
        console.log(response.data);
      })
      .then((err) => {
        console.log(err);
      });

    // router.push("/dashboard"); // Redirecionar para a página de dashboard após o cadastro
  };

  const goToSignIn = () => {
    router.push("/signin");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-3xl font-bold mb-8">Sign Up</h2>
      <form
        className="flex flex-col items-center space-y-5 text-black"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col space-y-10">
          <input
            type="text"
            placeholder="Name"
            className="input-field"
            {...register("name")}
          />
          <input
            type="email"
            placeholder="Email"
            className="input-field"
            {...register("email")}
          />

          <input
            type="password"
            placeholder="Password"
            className="input-field"
            {...register("password")}
          />
        </div>
        <div>
          <button
            className="bg-white px-5 text-black"
            type="submit"
          >
            Sign Up
          </button>
          <button
            className="bg-white px-5 text-black mt-6"
            onClick={goToSignIn}
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
