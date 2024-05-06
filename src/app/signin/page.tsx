"use client";

import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { useForm } from "react-hook-form";

const SignInScreen = () => {
  const { register, handleSubmit } = useForm();
  const { signIn } = useContext(AuthContext);

  const router = useRouter();

  async function onSubmit(data: any) {
    await signIn(data);
  }

  const goToSignUp = () => {
    router.push("/signup");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-black ">
      <form
        className="flex flex-col px-5 py-10 pitems-center space-y-5 w-[300px] bg-orange-300 rounded-2xl"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-3xl font-bold mb-8 text-white text-center">
          Bem Vindo!
        </h2>
        <div className="space-y-5">
          <input
            type="email"
            placeholder="Email"
            className="input-field p-2 w-full rounded-xl "
            {...register("email")}
          />
          <input
            type="password"
            placeholder="Password"
            className="input-field p-2 w-full rounded-xl "
            {...register("password")}
          />
        </div>
        <div className="flex justify-between mt-5">
          <button
            className="bg-white px-5 py-2 rounded-lg"
            type="submit"
          >
            Login
          </button>
          <button
            className="bg-white px-5 rounded-lg"
            onClick={goToSignUp}
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignInScreen;
