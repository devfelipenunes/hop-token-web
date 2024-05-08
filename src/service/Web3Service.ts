import axios from "axios";
import { EventLog, ethers } from "ethers";
import NFTBeer from "./NFTBeer.abi.json";
import NFTRecipe from "./NFTRecipe.abi.json";
import HopTokenABI from "./HopToken.abi.json";

const HOPTOKEN_ADDRESS = `${process.env.HOPTOKEN_ADDRESS}`;
const NFTBEER_ADDRESS = `${process.env.NFTBEER_ADDRESS}`;
const NFTRECIPE_ADDRESS = `${process.env.NFTRECIPE_ADDRESS}`;
const CHAIN_ID = `${process.env.CHAIN_ID}`;

export type NewNFT = {
  name?: string;
  description?: string;
  price?: string;
  image?: File;
};

async function uploadFile(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axios({
    method: "POST",
    url: "/pinata/file",
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  });

  return `${response.data.uri}`;
}

async function uploadMetadata(metadata: Metadata) {
  const response = await axios({
    method: "POST",
    url: "/pinata/metadata",
    data: metadata,
    headers: { "Content-Type": "application/json" },
  });

  return `${response.data.uri}`;
}

type Metadata = {
  name?: string;
  description?: string;
  image?: string;
};

async function getProvider() {
  if (!window.ethereum) throw new Error(`Wallet not found!`);

  const provider = new ethers.BrowserProvider(window.ethereum);

  const accounts: string[] = await provider.send("eth_requestAccounts", []);

  localStorage.setItem("account", accounts[0]);

  if (!accounts || !accounts.length) throw new Error(`Wallet not permitted!`);

  await provider.send("wallet_switchEthereumChain", [{ chainId: CHAIN_ID }]);

  return provider;
}

export type Recipe = {
  itemId: number;
  tokenId: number;
  price: bigint | string;
  creator: string;
  owner: string;
  image: string;
  name: string;
  description: string;
};

export async function loadRecipeDetails(itemId: number): Promise<Recipe> {
  const provider = await getProvider();
  const hopToken = new ethers.Contract(HOPTOKEN_ADDRESS, HopTokenABI, provider);
  const recipe = new ethers.Contract(NFTRECIPE_ADDRESS, NFTRecipe, provider);

  const item: Recipe = await hopToken.recipes(itemId);
  if (!item) return {} as Recipe;

  const tokenUri = await recipe.tokenURI(item.tokenId);
  const metadata = await axios.get(
    tokenUri.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/")
  );
  const price = ethers.formatUnits(item.price.toString(), "ether");

  return {
    price,
    itemId: item.itemId,
    tokenId: item.tokenId,
    creator: item.creator,
    owner: item.owner,
    image: metadata.data.image.replace(
      "ipfs://",
      "https://gateway.pinata.cloud/ipfs/"
    ),
    name: metadata.data.name,
    description: metadata.data.description,
  } as Recipe;
}

export async function buyNFTRecipe(nft: Recipe) {
  const provider = await getProvider();
  const signer = await provider.getSigner();
  const hopToken = new ethers.Contract(HOPTOKEN_ADDRESS, HopTokenABI, signer);
  const price = ethers.parseUnits(nft.price.toString(), "ether");

  const tx = await hopToken.createRecipeSale(NFTRECIPE_ADDRESS, nft.itemId, {
    value: price,
  });
  await tx.wait();
}

async function createRecipe(url: string, price: string): Promise<number> {
  const provider = await getProvider();
  const signer = await provider.getSigner();

  const nftRecipe = new ethers.Contract(NFTRECIPE_ADDRESS, NFTRecipe, signer);
  const mintTx = await nftRecipe.mint(url);
  const mintTxReceipt: ethers.ContractTransactionReceipt = await mintTx.wait();
  let eventLog = mintTxReceipt.logs[0] as EventLog;
  const tokenId = Number(eventLog.args[2]);

  const weiPrice = ethers.parseUnits(price, "ether");

  const hopToken = new ethers.Contract(HOPTOKEN_ADDRESS, HopTokenABI, signer);
  const listingPrice = (await hopToken.listingPrice()).toString();
  const createTx = await hopToken.createNFTRecipe(
    NFTRECIPE_ADDRESS,
    tokenId,
    weiPrice,
    { value: listingPrice }
  );
  const createTxReceipt: ethers.ContractTransactionReceipt =
    await createTx.wait();

  eventLog = createTxReceipt.logs.find(
    (l) => (l as EventLog).eventName === "NFTRecipeCreated"
  ) as EventLog;
  const itemId = Number(eventLog.args[0]);

  return itemId;
}

export async function uploadAndCreateRecipe(nft: NewNFT): Promise<number> {
  if (!nft.name || !nft.description || !nft.image || !nft.price)
    throw new Error("All fields are required.");

  const uri = await uploadFile(nft.image);

  const metadataUri = await uploadMetadata({
    name: nft.name,
    description: nft.description,
    image: uri,
  });
  console.log(metadataUri);

  const itemId = await createRecipe(metadataUri, nft.price);

  return itemId;
}

export async function loadMyNFTRecipes(): Promise<Recipe[]> {
  const provider = await getProvider();
  const signer = await provider.getSigner();

  const hopToken = new ethers.Contract(HOPTOKEN_ADDRESS, HopTokenABI, provider);
  const recipe = new ethers.Contract(NFTRECIPE_ADDRESS, NFTRecipe, provider);

  const data = await hopToken.fetchMyRecipes({ from: signer.address });
  if (!data || !data.length) return [];

  const items = await Promise.all(
    data.map(async (item: Recipe) => {
      const tokenUri = await recipe.tokenURI(item.tokenId);
      const metadata = await axios.get(
        tokenUri.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/")
      );
      const price = ethers.formatUnits(item.price.toString(), "ether");

      return {
        price,
        itemId: item.itemId,
        tokenId: item.tokenId,
        creator: item.creator,
        owner: item.owner,
        image: metadata.data.image.replace(
          "ipfs://",
          "https://gateway.pinata.cloud/ipfs/"
        ),
        name: metadata.data.name,
        description: metadata.data.description,
      } as Recipe;
    })
  );

  return items;
}

export async function loadNFTRecipes(): Promise<Recipe[]> {
  const provider = await getProvider();

  const hopToken = new ethers.Contract(HOPTOKEN_ADDRESS, HopTokenABI, provider);
  const recipe = new ethers.Contract(NFTRECIPE_ADDRESS, NFTRecipe, provider);

  const data = await hopToken.fetchRecipes();
  if (!data || !data.length) return [];

  const items = await Promise.all(
    data.map(async (item: Recipe) => {
      const tokenUri = await recipe.tokenURI(item.tokenId);
      const metadata = await axios.get(
        tokenUri.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/")
      );
      const price = ethers.formatUnits(item.price.toString(), "ether");

      return {
        price,
        itemId: item.itemId,
        tokenId: item.tokenId,
        creator: item.creator,
        owner: item.owner,
        image: metadata.data.image.replace(
          "ipfs://",
          "https://gateway.pinata.cloud/ipfs/"
        ),
        name: metadata.data.name,
        description: metadata.data.description,
      } as Recipe;
    })
  );

  return items;
}
