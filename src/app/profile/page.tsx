"use client";

import NavBar from "@/components/NavBar";
import api from "@/service/api";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function Profile() {
  const [user, setUser] = useState({});

  const { register, handleSubmit } = useForm({
    defaultValues: user,
  });

  const onSubmit = (data) => {};

  useEffect(() => {
    api
      .get("/me")
      .then((response) => {
        setUser(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <main className="flex min-h-screen flex-col items-center">
      <NavBar />
      <div></div>
      <div className="mt-8 p-6 bg-gray-100 rounded-md text-black ">
        <h1 className="text-xl font-bold mb-4">Perfil do Usuário</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <div>
            <label
              className="block mb-1"
              htmlFor="name"
            >
              Nome:
            </label>
            <p>{user.name}</p>
            {/* <input
              type="text"
              id="name"
              name="name"
              {...register("name")}
              className="border border-gray-300 rounded-md px-3 py-1 w-full"
            /> */}
          </div>

          <div>
            <label
              className="block mb-1"
              htmlFor="saldo"
            >
              Wallet:
            </label>
            <p>{user.wallet_address}</p>
            {/* <input
              type="text"
              id="saldo"
              name="saldo"
              {...register("saldo")}
              className="border border-gray-300 rounded-md px-3 py-1 w-full"
            /> */}
          </div>
          <div>
            <label
              className="block mb-1"
              htmlFor="email"
            >
              Email:
            </label>
            <p>{user.email}</p>
            {/* <input
              type="email"
              id="email"
              name="email"
              {...register("email")}
              className="border border-gray-300 rounded-md px-3 py-1 w-full"
            /> */}
          </div>

          {/* </div> */}
          {/* <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Salvar Alterações
          </button> */}
        </form>
      </div>
    </main>
  );
}
