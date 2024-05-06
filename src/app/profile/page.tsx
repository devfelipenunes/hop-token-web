"use client";

import { useEffect, useState } from "react";
import NavBar from "@/components/NavBar";
import api from "@/service/api";
import { useForm } from "react-hook-form";
import { MdContentCopy } from "react-icons/md"; // Importar o ícone de cópia
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

  function abbreviateWalletAddress(walletAddress) {
    const lengthToShow = 7;
    const start = walletAddress?.substring(0, lengthToShow);
    const end = walletAddress?.substring(walletAddress.length - lengthToShow);
    return `${start}...${end}`;
  }

  const handleCopyWalletAddress = () => {
    navigator.clipboard.writeText(user?.wallet_address);
  };

  return (
    <main className="flex min-h-screen flex-col items-center">
      <NavBar />
      <div className="bg-orange-300 w-full h-[200px] flex justify-center">
        <div className="w-[600px] h-full flex flex-row justify-between items-center">
          <div className="flex flex-row items-center space-x-2">
            <img
              src={user?.image}
              alt="Imagem do usuário"
              className="w-[100px] h-[100px] rounded-full"
            />

            <div>
              <p className="text-3xl font-bold">{user.name}</p>
              <div className="flex items-center">
                <p>{abbreviateWalletAddress(user.wallet_address)}</p>
                <MdContentCopy
                  className="ml-2 cursor-pointer text-white"
                  onClick={handleCopyWalletAddress}
                />
              </div>
            </div>
          </div>
          <div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-green-500 text-white px-4 py-2 rounded-md mt-4"
            >
              Criar Nova Receita
            </button>
          </div>
        </div>
      </div>
      <CreateRecipeModal
        show={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onRecipeCreated={(newRecipe) => {
          setShowCreateModal(false);
        }}
      />
    </main>
  );
}
