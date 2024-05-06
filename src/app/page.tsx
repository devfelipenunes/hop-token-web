"use client";

import NavBar from "@/components/NavBar";
import api from "@/service/api";

import Link from "next/link";
import { useEffect, useState } from "react";

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

export default function Home() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  const [recipe, setRecipe] = useState([]);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleQuantityChange = (event) => {
    setQuantity(parseInt(event.target.value));
  };

  const buy = () => {
    api
      .get(`/recipe/buy/${selectedItem.id}`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleAddToCart = () => {
    if (selectedItem) {
      const existingItemIndex = cartItems.findIndex(
        (item) => item.id === selectedItem.id
      );

      if (existingItemIndex !== -1) {
        const updatedCart = cartItems.map((item, index) => {
          if (index === existingItemIndex) {
            return {
              ...item,
              quantity: item.quantity + quantity,
            };
          }
          return item;
        });
        setCartItems(updatedCart);
        localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      } else {
        const itemToAdd = { ...selectedItem, quantity };
        const updatedCart = [...cartItems, itemToAdd];
        setCartItems(updatedCart);
        localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      }

      setSelectedItem(null);
      setQuantity(1);
    }
  };

  useEffect(() => {
    api
      .get("/recipe")
      .then((response) => {
        console.log(response.data);
        setRecipe(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center">
      <NavBar />
      {/* Modal */}
      {selectedItem && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex justify-center items-center z-50 text-black">
          <div className="bg-white p-6 rounded-lg w-[300px]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">{selectedItem.name}</h2>
              <button
                className="text-red-500"
                onClick={() => setSelectedItem(null)}
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
      <div className="flex flex-col w-full max-w-[700px] justify-between mb-6">
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
      </div>
      {/* Melhores cervejas */}

      {/* Melhores receitas */}
      <div className="flex flex-col w-full max-w-[700px] justify-between mb-6">
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
      </div>
      {/* Melhores receitas */}
    </main>
  );
}
