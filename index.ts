import { generateMnemonic } from "bip39";
import { initializeAccount } from "./keyring";
import { TWallet } from "./types";

export const RNWCreateWallet = (): Promise<TWallet> => {
  const mnemonic = generateMnemonic();
  return initializeAccount({
    mnemonic,
    derivationIndex: 0,
  });
};

const main = async () => {
  const newWallet = await RNWCreateWallet();
  console.log("This is the new wallet 🥳 👉", newWallet);
};

try {
  main();
} catch (error) {
  console.error("This is the error", error);
}
