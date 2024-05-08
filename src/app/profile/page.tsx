"use client";

import { useEffect, useState } from "react";
import NavBar from "@/components/NavBar";
import api from "@/service/api";
import { useForm } from "react-hook-form";
import { MdContentCopy } from "react-icons/md"; // Importar o ícone de cópia
import CreateRecipeModal from "@/components/CreateRecipe";
import { Recipe, loadMyNFTRecipes } from "@/service/Web3Service";
import Link from "next/link";
import Image from "next/image";

export default function Profile() {
  const [user, setUser] = useState({});
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [nfts, setNfts] = useState<Recipe[]>([]);
  const [account, setAccount] = useState("");

  useEffect(() => {
    loadMyNFTRecipes()
      .then((nfts) => setNfts(nfts))
      .catch((err) => alert(err.message));
  }, []);

  const { register, handleSubmit } = useForm({
    defaultValues: user,
  });

  const onSubmit = (data) => {};

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
    <main className="flex min-h-screen flex-col items-center bg-white">
      <NavBar />

      <div className="mt-[100px]">
        <div className="-mx-3 flex flex-wrap gap-y-6 justify-center mb-12">
          {nfts && nfts.length ? (
            nfts.map((nft) => (
              <div className="px-3 w-[250px] h-[150px] mt-5 ">
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

                      {/* <div className="">
                        <Link
                          href={`/details/${nft.itemId}`}
                          className="group text-secondary-500 flex flex-row justify-center items-center px-4 py-2 rounded-lg hover:bg-slate-200 bg-slate-300"
                        >
                          <p className="">Comprar</p>{" "}
                        </Link>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <>No NFTs found for this user.</>
          )}
        </div>
        {/* <div className="mx-auto px-4 w-full lg:w-6/12">
          <h1 className="font-bold leading-tight mb-2 text-4xl text-white md:leading-tight md:text-5xl lg:leading-tight lg:text-6xl 2xl:leading-tight 2xl:text-7xl">
            {nft.name || "Loading..."}
          </h1>
          <p className="font-light mb-12 text-xl">
            by {nft.description || "Loading..."}
          </p>
          <div className="flex flex-wrap gap-4 items-center">
            <button
              type="button"
              onClick={btnBuyClick}
              className="bg-gradient-to-t bg-primary-500 font-bold from-primary-500 hover:bg-primary-600 hover:from-primary-600 hover:to-primary-500 inline-block px-12 py-2 rounded text-white to-primary-400"
            >
              Buy
            </button>
            {message ? (
              <p className="font-bold mt-5 text-white">{message}</p>
            ) : (
              <></>
            )}
          </div>
        </div> */}
        {/* Melhores cervejas */}

        {/* Melhores receitas */}
        <div className="flex flex-col w-full max-w-[700px] justify-between mb-6">
          <div className="flex flex-wrap justify-between px-3"></div>
        </div>
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
