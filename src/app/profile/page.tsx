"use client";

import { useEffect, useState } from "react";
import NavBar from "@/components/NavBar";
import api from "@/service/api";
import { useForm } from "react-hook-form";
import CreateRecipeModal from "@/components/CreateRecipe";

export default function Profile() {
  const [user, setUser] = useState({});
  const [showCreateModal, setShowCreateModal] = useState(false);

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
      <div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-green-500 text-white px-4 py-2 rounded-md mt-4"
        >
          Criar Nova Receita
        </button>
      </div>
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
          </div>

          <div>
            <label
              className="block mb-1"
              htmlFor="saldo"
            >
              Wallet:
            </label>
            <p>{user.wallet_address}</p>
          </div>
          <div>
            <label
              className="block mb-1"
              htmlFor="email"
            >
              Email:
            </label>
            <p>{user.email}</p>
          </div>
        </form>
      </div>
      <CreateRecipeModal
        show={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onRecipeCreated={(newRecipe) => {
          // Aqui você pode adicionar lógica para atualizar a lista de receitas após a criação de uma nova
          console.log("Nova receita criada:", newRecipe);
          setShowCreateModal(false);
        }}
      />
    </main>
  );
}
