import { useForm } from "react-hook-form";
import api from "@/service/api";

const CreateRecipeModal = ({ show, onClose, onRecipeCreated }) => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    api
      .post("/recipe", data)
      .then((response) => {
        console.log(response.data);
        onRecipeCreated(response.data);
        onClose(); // Fechar modal após enviar o formulário
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCloseModal = () => {
    onClose();
    reset(); // Reset form fields when modal is closed
  };

  return (
    show && (
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
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Criar
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default CreateRecipeModal;
