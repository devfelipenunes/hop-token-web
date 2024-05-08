"use client";

import NavBar from "@/components/NavBar";
import {
  Recipe,
  loadMyNFTRecipes,
  loadNFTRecipes,
} from "@/service/Web3Service";
import api from "@/service/api";
import Image from "next/image";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  const [recipe, setRecipe] = useState([]);
  const [error, setError] = useState(false);
  const [nfts, setNfts] = useState<Recipe[]>([]);
  const [totalNfts, setTotalNfts] = useState<Recipe[]>([]);

  // const handleItemClick = (item) => {
  //   setSelectedItem(item);
  // };

  // const handleQuantityChange = (event) => {
  //   setQuantity(parseInt(event.target.value));
  // };

  useEffect(() => {
    loadNFTRecipes()
      .then((nfts) => setNfts(nfts))
      .catch((err) => alert(err.message));
  }, []);

  // const buy = () => {
  //   api
  //     .get(`/recipe/buy/${selectedItem.id}`)
  //     .then((response) => {
  //       console.log(response.data);
  //       setSelectedItem(null);
  //     })
  //     .catch((error) => {
  //       console.log(error.response.message);
  //       setError(true);
  //     });
  // };
  // const handleAddToCart = () => {
  //   if (selectedItem) {
  //     const existingItemIndex = cartItems.findIndex(
  //       (item) => item.id === selectedItem.id
  //     );

  //     if (existingItemIndex !== -1) {
  //       const updatedCart = cartItems.map((item, index) => {
  //         if (index === existingItemIndex) {
  //           return {
  //             ...item,
  //             quantity: item.quantity + quantity,
  //           };
  //         }
  //         return item;
  //       });
  //       setCartItems(updatedCart);
  //       localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  //     } else {
  //       const itemToAdd = { ...selectedItem, quantity };
  //       const updatedCart = [...cartItems, itemToAdd];
  //       setCartItems(updatedCart);
  //       localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  //     }

  //     setSelectedItem(null);
  //     setQuantity(1);
  //   }
  // };

  // useEffect(() => {
  //   api
  //     .get("/recipe")
  //     .then((response) => {
  //       console.log(response.data);
  //       setRecipe(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  return (
    <main className="flex min-h-screen flex-col items-center bg-white">
      <NavBar />
      {/* Modal */}
      {selectedItem && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex justify-center items-center z-50 text-black">
          <div className="bg-white p-6 rounded-lg w-[300px]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">{selectedItem.name}</h2>
              <button
                className="text-red-500"
                onClick={() => {
                  setSelectedItem(null);
                  setError(false);
                }}
              >
                Fechar
              </button>
            </div>

            <div className="">
              <div className="w-full">
                <div className="sm:w-1/2 h-[250px] sm:mr-5 sm:mb-0 mb-5 bg-slate-600">
                  x
                </div>
                <div className="sm:w-1/2">
                  <div>
                    {selectedItem.price && <p>Preço: {selectedItem.price}</p>}
                    {selectedItem.alcoholic && (
                      <p>Teor Alcoólico: {selectedItem.alcoholic}%</p>
                    )}
                    {selectedItem.rating && (
                      <p>Avaliação: {selectedItem.rating}</p>
                    )}
                    <p>Descrição: {selectedItem.description}</p>
                  </div>
                </div>
              </div>

              <div className="justify-between items-center flex">
                {!selectedItem?.royaltiesId && (
                  <label
                    htmlFor="quantity"
                    className="block mt-4"
                  >
                    Quantidade:
                  </label>
                )}
                <div className="flex flex-row w-full mt-5 items-center">
                  {!selectedItem?.royaltiesId ? (
                    <>
                      <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        min="1"
                        value={quantity}
                        onChange={handleQuantityChange}
                        className="border border-gray-300 rounded-md px-2 h-10 mr-2 w-12"
                      />
                      <button
                        onClick={buy}
                        className="bg-orange-700 text-white px-4 py-2 rounded-md"
                      >
                        comprar
                      </button>
                    </>
                  ) : (
                    <div
                      className={`flex flex-col justify-center items-center w-full px-4`}
                    >
                      {error && (
                        <p className="text-red-500 mb-6">
                          Usuário não pode comprar sua propria receita
                        </p>
                      )}

                      <button
                        onClick={buy}
                        className="bg-green-700 text-white px-4 py-2 rounded-md"
                      >
                        comprar
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Modal */}

      {/* Melhores cervejas */}

      {/* Melhores cervejas */}

      {/* Melhores receitas */}
      <div className="flex flex-col w-full max-w-[700px] justify-between mb-6 mt-[100px]">
        <div className="bg-green-700 w-full max-w-5xl items-center justify-between font-mono text-sm flex flex-row p-5 text-white rounded-md">
          <p>Melhores Receitas</p>
        </div>
        <div className="flex flex-wrap justify-between px-3">
          {nfts && nfts.length ? (
            nfts.map((nft) => (
              <div className="px-3 w-[250px] mt-5 ">
                <div className="bg-white overflow-hidden rounded-xl text-gray-500 shadow-2xl">
                  <Link
                    href={`/details/${nft.itemId}`}
                    className=""
                  >
                    <Image
                      src={nft.image}
                      className="w-full"
                      alt="..."
                      width="600"
                      height="600"
                    />
                  </Link>
                  <div className="px-4 py-6 sm:px-6">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-xl">
                        <Link
                          href={`/details/${nft.itemId}`}
                          className="hover:text-primary-500 text-gray-900"
                        >
                          {nft.name}
                        </Link>
                      </h3>
                    </div>

                    <div className="flex items-center justify-between flex-col">
                      {/* <div>
                        <Link
                          href={`/details/${nft.itemId}`}
                          className="hover:text-gray-400 inline-flex italic items-center space-x-2 text-sm"
                        >
                          <span>by {nft.description}</span>
                        </Link>
                      </div> */}

                      <div className=" mt-10">
                        <Link
                          href={`/details/${nft.itemId}`}
                          className="group text-secondary-500 flex flex-row justify-center items-center px-4 py-2 rounded-lg hover:bg-slate-200 bg-slate-300"
                        >
                          <p className="">Comprar</p>{" "}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <>No NFTs found for this user.</>
          )}
          {/* {recipe.map((recipe, index) => (
            <div
              className="w-[200px] h-[250px] flex flex-col justify-between items-center text-black m-3 rounded-lg p-2 bg-green-700 "
              key={index}
              onClick={() => handleItemClick(recipe)}
            >
              <img
                src={recipe.image} // Substitua pela URL da sua imagem
                alt="Descrição da imagem" // Adicione uma descrição adequada para acessibilidade
                className="w-full h-[50%] rounded-lg" // Ajuste o tamanho e a classe conforme necessário
              />
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
          ))} */}
        </div>
      </div>
      {/* Melhores receitas */}
    </main>
  );
}
