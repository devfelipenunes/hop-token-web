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

  const beers = [
    {
      id: 1,
      name: "Pilsen Premium",
      price: "5,99",
      alcoholic: 5,
      rating: 4.5,
      description:
        "Pilsen Premium é uma cerveja leve e refrescante, perfeita para ser apreciada em dias quentes. Com notas sutis de lúpulo e um teor alcoólico moderado, é uma escolha clássica para quem busca uma cerveja fácil de beber.",
    },
    {
      id: 2,
      name: "Amber Ale Artesanal",
      price: "5,99",
      alcoholic: 5,
      rating: 4.2,
      description:
        "Amber Ale Artesanal é uma cerveja encorpada e complexa, com aromas caramelizados e um sabor rico e maltado. Com um leve amargor no final, é uma excelente opção para quem aprecia cervejas com personalidade.",
    },
    {
      id: 3,
      name: "India Pale Ale Citrus",
      price: "5,99",
      alcoholic: 5,
      rating: 4.7,
      description:
        "India Pale Ale Citrus é uma cerveja intensamente aromática, com notas cítricas de lúpulo e um sabor equilibrado entre o amargor e a doçura do malte. Ideal para os amantes de cervejas com caráter.",
    },
    {
      id: 4,
      name: "Stout Especial",
      price: "5,99",
      alcoholic: 5,
      rating: 4.4,
      description:
        "Stout Especial é uma cerveja escura e robusta, com sabores intensos de malte torrado, café e chocolate. Com um corpo encorpado e uma cremosidade irresistível, é uma verdadeira indulgência para os apreciadores de cervejas escuras.",
    },
  ];

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

      <div>
        {/* <div className="flex flex-col w-full max-w-[700px] justify-between mb-6">
          <div className="bg-orange-600 w-full max-w-5xl items-center justify-between font-mono text-sm flex flex-row p-5  rounded-md text-white">
            <p className="text-white">Melhores Cervejas</p>
          </div>
          <div className="flex flex-wrap justify-between px-3">
            {beers.map((beer, index) => (
              <div
                className="w-[200px] h-[250px] flex flex-col justify-between items-center rounded-lg bg-orange-600 text-white m-3  p-2"
                key={index}
                onClick={() => handleItemClick(beer)}
              >
                <div className="w-full h-1/2 bg-red-500" />
                <div className="w-full h-1/2  mt-2 flex flex-col justify-between">
                  <div>
                    <p>{beer.name}</p>
                    {beer.price && <p>{beer.price}</p>}
                  </div>
                  <div className="bg-orange-400 items-center justify-center flex rounded-md p-1">
                    <p>Comprar</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div> */}
        {/* Melhores cervejas */}

        {/* Melhores receitas */}
        {/* <div className="flex flex-col w-full max-w-[700px] justify-between mb-6">
          <div className="bg-green-700 w-full max-w-5xl items-center justify-between font-mono text-sm flex flex-row p-5 text-white rounded-md">
            <p>Melhores Receitas</p>
          </div>
          <div className="flex flex-wrap justify-between px-3">
            {recipe.map((recipe, index) => (
              <div
                className="w-[200px] h-[250px] flex flex-col justify-between items-center text-black m-3 rounded-lg p-2 bg-green-700 "
                key={index}
                onClick={() => handleItemClick(recipe)}
              >
                <div className="w-full h-1/2 bg-white rounded-lg" />
                <div className="w-full h-1/2 text-white mt-2 flex flex-col justify-between">
                  <div>
                    <p>{recipe.name}</p>
                    <p>{recipe.price}</p>
                  </div>

                  <div className="bg-green-500 items-center justify-center flex rounded-md p-1">
                    <p>Comprar</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div> */}
        {/* Melhores receitas */}
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
