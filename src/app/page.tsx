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
      {selectedItem && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex justify-center items-center z-50 text-black">
          <div className="bg-white p-6 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">{selectedItem.name}</h2>
              <button
                className="text-red-500"
                onClick={() => setSelectedItem(null)}
              >
                Fechar
              </button>
            </div>
            {selectedItem.price && <p>Preço: {selectedItem.price}</p>}
            {selectedItem.alcoholic && (
              <p>Teor Alcoólico: {selectedItem.alcoholic}%</p>
            )}
            {selectedItem.rating && <p>Avaliação: {selectedItem.rating}</p>}
            <p>Descrição: {selectedItem.description}</p>
            <label
              htmlFor="quantity"
              className="block mt-4"
            >
              Quantidade:
            </label>
            <div className="justify-between items-center mb-4 flex">
              <input
                type="number"
                id="quantity"
                name="quantity"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
                className="border border-gray-300 rounded-md px-2 py-1 mt-1"
              />
              <button
                onClick={handleAddToCart}
                className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md"
              >
                comprar
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col w-full max-w-[700px] justify-between mb-6">
        <div className="bg-white w-full max-w-5xl items-center justify-between font-mono text-sm flex flex-row p-5  text-black">
          <p>Melhores Cervejas</p>
          <Link href="/beer">Ver mais</Link>
        </div>
        <div className="flex flex-row justify-between px-3">
          {beers.map((beer) => (
            <div
              className="w-1/4 h-[200px] flex flex-col justify-between items-center bg-white text-black m-3"
              key={beer.id}
              onClick={() => handleItemClick(beer)}
            >
              <div className="w-full h-1/2 bg-red-500" />
              <div className="w-full h-1/2">
                <p>{beer.name}</p>
                {beer.price && <p>{beer.price}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col w-full max-w-[700px] justify-between mb-6">
        <div className="bg-white w-full max-w-5xl items-center justify-between font-mono text-sm flex flex-row p-5 text-black">
          <p>Melhores Receitas</p>
          <Link href="/revenues">Ver mais</Link>
        </div>
        <div className="flex flex-row justify-between px-3">
          {recipe.map((recipe, index) => (
            <div
              className="w-1/4 h-[200px] flex flex-col justify-between items-center bg-white text-black m-3"
              key={index}
              onClick={() => handleItemClick(recipe)}
            >
              <div className="w-full h-1/2 bg-red-500" />
              <div className="w-full h-1/2">
                <p>{recipe.name}</p>
                {recipe.stars && <p>rating: {recipe.stars}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
