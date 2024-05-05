"use client";

import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { useForm } from "react-hook-form";

const SignInScreen = () => {
  const { register, handleSubmit } = useForm();
  const { signIn } = useContext(AuthContext);

  const router = useRouter();

  async function onSubmit(data) {
    await signIn(data);
  }

  const goToSignUp = () => {
    router.push("/signup");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-black">
      <h2 className="text-3xl font-bold mb-8 text-white">Sign In</h2>
      <form
        className="flex flex-col items-center space-y-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          type="email"
          placeholder="Email"
          className="input-field px-2"
          {...register("email")}
        />
        <input
          type="password"
          placeholder="Password"
          className="input-field px-2"
          {...register("password")}
        />
        <button
          className="bg-white px-5 "
          type="submit"
        >
          Login
        </button>
      </form>
      <button
        className="bg-white px-5 mt-6"
        onClick={goToSignUp}
      >
        Sign Up
      </button>
    </div>
  );
};

export default SignInScreen;
