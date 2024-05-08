import { useForm } from "react-hook-form";
import api from "@/service/api";
import { useState } from "react";

import { NewNFT, uploadAndCreateRecipe } from "@/service/Web3Service";

const CreateRecipeModal = ({ show, onClose, onRecipeCreated }) => {
  const { register, handleSubmit, reset } = useForm();

  const [nft, setNft] = useState<NewNFT>();
  const [message, setMessage] = useState<string>("");

  function btnSubmitClick() {
    if (!nft) return;

    setMessage("Sending your NFT to blockchain...wait...");
    uploadAndCreateRecipe(nft)
      .then((itemId) => {
        setMessage("NFT created successfully!");
        window.location.href = "/details/" + itemId;
      })
      .catch((err) => setMessage(err.message));
  }

  function onInputChange(evt: React.ChangeEvent<HTMLInputElement>) {
    setNft((prevState) => ({
      ...prevState,
      [evt.target.id]: evt.target.value,
    }));
  }

  function onFileChange(evt: React.ChangeEvent<HTMLInputElement>) {
    if (evt.target.files && evt.target.files.length) {
      const file = evt.target.files[0];
      setNft((prevState) => ({ ...prevState, image: file }));
    }
  }

  const handleCloseModal = () => {
    onClose();
    reset(); // Reset form fields when modal is closed
  };

  return (
    show && (
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex justify-center items-center text-black z-30">
        <div className="bg-white p-6 rounded-lg">
          <div className="flex flex-row justify-between">
            <h2 className="text-lg font-bold mb-8">Criar Receita</h2>
            <p
              onClick={handleCloseModal}
              className="cursor-pointer text-red-500 text-xl"
            >
              x
            </p>
          </div>
          <form>
            <div className="mb-6">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                value={nft?.name || ""}
                onChange={onInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4  "
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Descrição
              </label>
              <input
                type="text"
                id="description"
                value={nft?.description || ""}
                onChange={onInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="price"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Price (Ether)
              </label>
              <input
                type="number"
                id="price"
                value={nft?.price || ""}
                onChange={onInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 "
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="image"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Image
              </label>
              <input
                type="file"
                id="image"
                onChange={onFileChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 "
                required
              />
            </div>
            <button
              type="button"
              onClick={btnSubmitClick}
              className="bg-gradient-to-t bg-orange-500 font-bold from-primary-500 hover:bg-primary-600 hover:from-primary-600 hover:to-primary-500 inline-block px-12 py-2 rounded text-white to-primary-400"
            >
              Submit
            </button>
            {message ? <p className="font-bold mt-5">{message}</p> : <></>}
          </form>
        </div>
      </div>
    )
  );
};

export default CreateRecipeModal;
