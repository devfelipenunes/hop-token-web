"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Recipe, buyNFTRecipe, loadRecipeDetails } from "@/service/Web3Service";
import NavBar from "@/components/NavBar";
import Image from "next/image";

function Details() {
  const params = useParams();
  const itemId = params.itemId;

  const [nft, setNft] = useState<Recipe>({} as Recipe);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    setMessage("Loading details...");
    loadRecipeDetails(Number(itemId))
      .then((nft) => setNft(nft))
      .catch((err) => setMessage(err.message));
  }, [params.itemId]);

  function btnBuyClick() {
    if (!nft) return;

    setMessage("Sending your intent to blockchain...wait...");
    buyNFTRecipe(nft)
      .then((tx) => (window.location.href = "/profile"))
      .catch((err) => setMessage(err.message));
  }

  console.log(nft);

  return (
    <>
      <NavBar />
      <main className="mt-10 mb-10 z-0  bg-white h-screen">
        <section className="bg-secondary-500 poster pt-4 text-opacity-60 text-white sm:px-4 flex justify-center items-center">
          {/* <Featured nft={nft} /> */}
          <div className=" w-[80%] flex md:flex-row flex-col items-center mt-[100px]">
            <Image
              src={nft.image}
              className="w-full"
              alt="..."
              width="300"
              height="300"
            />
            <div className="ml-4 text-black">
              <h1 className="font-bold leading-tight  mb-2 text-4xl md:leading-tight md:text-5xl lg:leading-tight lg:text-6xl 2xl:leading-tight 2xl:text-7xl z-0">
                {nft.name || "Loading..."}
              </h1>
              <p className="font-light mb-12 text-xl">
                {nft.description || "Loading..."}
              </p>

              <div className="flex flex-row items-center gap-4">
                <p>
                  <span className="font-bold">Price:</span> {nft.price}
                </p>
                <button
                  onClick={btnBuyClick}
                  className="group text-secondary-500 flex flex-row justify-center items-center px-4 py-2 rounded-lg hover:bg-slate-200 bg-slate-300"
                >
                  <p className="">Comprar</p>{" "}
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Details;
