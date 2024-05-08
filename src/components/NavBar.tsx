"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import CreateRecipeModal from "./CreateRecipe";
import { MdContentCopy } from "react-icons/md";

export default function NavBar() {
  const [account, setAccount] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    // Recupera o item 'account' do localStorage
    const storedAccount = localStorage.getItem("account");
    if (storedAccount) {
      // Se o item existir no localStorage, define-o no estado
      setAccount(storedAccount);
    }
  }, []);

  function abbreviateWalletAddress(walletAddress) {
    const lengthToShow = 7;
    const start = walletAddress?.substring(0, lengthToShow);
    const end = walletAddress?.substring(walletAddress.length - lengthToShow);
    return `${start}...${end}`;
  }
  const handleCopyWalletAddress = () => {
    navigator.clipboard.writeText(account);
  };

  const Menu = [
    {
      name: "home",
      route: "/",
    },
    {
      name: "perfil",
      route: "/profile",
    },
  ];
  return (
    <div className="bg-orange-300 w-full h-[80px] flex justify-center fixed top-0">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm p-5 ">
        <div className="flex flex-row justify-between items-center">
          {account ? (
            <div className="flex flex-row space-x-3 items-center">
              <p>{abbreviateWalletAddress(account)}</p>
              <MdContentCopy
                className="ml-2 cursor-pointer text-white"
                onClick={handleCopyWalletAddress}
              />
            </div>
          ) : (
            <p>Icone</p>
          )}

          <div className="flex flex-row space-x-3 items-center">
            {Menu.map((item, index) => (
              <Link
                href={item.route}
                key={index}
              >
                {item.name}
              </Link>
            ))}
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-green-500 text-white px-4 py-2 rounded-md"
            >
              Criar Receita
            </button>
          </div>
        </div>
      </div>
      <CreateRecipeModal
        show={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onRecipeCreated={(newRecipe) => {
          setShowCreateModal(false);
        }}
      />
    </div>
  );
}
