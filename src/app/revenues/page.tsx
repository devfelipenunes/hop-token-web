"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import NavBar from "@/components/NavBar";
import api from "@/service/api";

const Revenues = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const [recipe, setRecipe] = useState([]);

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

  const handleCreateRecipe = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    reset(); // Reset form fields when modal is closed
  };

  const onSubmit = (data) => {
    console.log(data); // Aqui você pode adicionar lógica para lidar com os dados do formulário
    api
      .post("/recipe", data)
      .then((response) => {
        console.log(response.data);
        setRecipe(response.data);
        setShowModal(false); // Fechar modal após enviar o formulário
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <main className="flex min-h-screen flex-col items-center">
      <NavBar />
      <div className="flex flex-col w-full max-w-[700px] justify-between mb-6">
        <div className="w-full flex flex-row justify-between items-center mt-12">
          <p>Clique para criar uma nova receita</p>
          <button
            onClick={handleCreateRecipe}
            className="bg-green-500 text-white px-4 py-2 rounded-md mb-4"
          >
            Criar Receita
          </button>
        </div>
        <div className="w-full my-12">
          <p className="text-center">Nossas receitas</p>
        </div>
        <div className="flex flex-row justify-between px-3 ">
          {/* Botão para criar uma nova receita */}

          {/* Renderização das receitas */}
          {recipe.map((item, index) => (
            <div
              key={index}
              className="w-1/4 h-[200px] flex flex-col justify-between items-center bg-blue-500 m-3"
              onClick={() => handleItemClick(item)}
            >
              <div className="w-full h-1/2 bg-red-500" />
              <div className="w-full h-1/2">
                <p>{item.name}</p>
                <p>Preço: R${item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Modal para criar uma nova receita */}
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex justify-center items-center z-50 text-black">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-lg font-bold mb-4">Criar Nova Receita</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="input-wrapper">
                <label htmlFor="name">Nome:</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Nome"
                  {...register("name")}
                  className="input-field"
                />
              </div>

              <div className="input-wrapper">
                <label htmlFor="price">Preço:</label>
                <input
                  type="text"
                  id="price"
                  placeholder="Preço"
                  {...register("price")}
                  className="input-field"
                />
              </div>

              <div className="input-wrapper">
                <label htmlFor="description">Descrição:</label>
                <input
                  type="text"
                  id="description"
                  placeholder="Descrição"
                  {...register("description")}
                  className="input-field"
                />
              </div>

              <div className="input-wrapper">
                <label htmlFor="ingredients">Ingredientes:</label>
                <input
                  type="text"
                  id="ingredients"
                  placeholder="Ingredientes"
                  {...register("ingredients")}
                  className="input-field"
                />
              </div>

              <div className="flex justify-end mt-4">
                <button
                  onClick={handleCloseModal}
                  className="bg-gray-300 text-black px-4 py-2 mr-4 rounded-md"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  onClick={handleAddToCart}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Criar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default Revenues;
