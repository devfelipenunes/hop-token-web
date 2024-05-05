"use client";

import NavBar from "@/components/NavBar";
import { useState } from "react";

export default function Beer() {
  const beers = [
    {
      id: 1,
      name: "Pilsen Premium",
      image: "",
      price: "5,99",
      alcoholic: 5,
      amargor: 3,
      rating: 4.5,
      description:
        "Pilsen Premium é uma cerveja leve e refrescante, perfeita para ser apreciada em dias quentes. Com notas sutis de lúpulo e um teor alcoólico moderado, é uma escolha clássica para quem busca uma cerveja fácil de beber.",
    },
    {
      id: 2,
      name: "Amber Ale Artesanal",
      image: "",
      price: "5,99",
      alcoholic: 5,
      amargor: 3,
      rating: 4.2,
      description:
        "Amber Ale Artesanal é uma cerveja encorpada e complexa, com aromas caramelizados e um sabor rico e maltado. Com um leve amargor no final, é uma excelente opção para quem aprecia cervejas com personalidade.",
    },
    {
      id: 3,
      name: "India Pale Ale Citrus",
      image: "",
      price: "5,99",
      alcoholic: 5,
      amargor: 3,
      rating: 4.7,
      description:
        "India Pale Ale Citrus é uma cerveja intensamente aromática, com notas cítricas de lúpulo e um sabor equilibrado entre o amargor e a doçura do malte. Ideal para os amantes de cervejas com caráter.",
    },
    {
      id: 4,
      name: "Stout Especial",
      image: "",
      price: "5,99",
      alcoholic: 5,
      amargor: 3,
      rating: 4.4,
      description:
        "Stout Especial é uma cerveja escura e robusta, com sabores intensos de malte torrado, café e chocolate. Com um corpo encorpado e uma cremosidade irresistível, é uma verdadeira indulgência para os apreciadores de cervejas escuras.",
    },
  ];

  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [cartItems, setCartItems] = useState([]);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleQuantityChange = (event) => {
    setQuantity(parseInt(event.target.value));
  };

  const handleAddToCart = () => {
    if (selectedItem) {
      const itemToAdd = { ...selectedItem, quantity };
      const updatedCart = [...cartItems, itemToAdd];
      setCartItems(updatedCart);
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      setSelectedItem(null);
      setQuantity(1);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center">
      <NavBar />
      <div className="flex flex-col w-full max-w-[700px] justify-between mb-6">
        <div className="w-full my-12">
          <p className="text-center">Nossas cervejas</p>
        </div>
        <div className="flex flex-row justify-between px-3">
          {beers.map((beer) => (
            <div
              key={beer.id}
              className="w-1/4 h-[200px] flex flex-col justify-between items-center bg-blue-500 m-3"
              onClick={() => handleItemClick(beer)}
            >
              <div className="w-full h-1/2 bg-red-500" />
              <div className="w-full h-1/2">
                <p>{beer.name}</p>
                <p>Preço: R${beer.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Renderização do detalhe da cerveja */}
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
            {selectedItem.description && <p>{selectedItem.description}</p>}
            <label
              htmlFor="quantity"
              className="block mt-4"
            >
              Quantidade:
            </label>
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
              Adicionar ao Carrinho
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
