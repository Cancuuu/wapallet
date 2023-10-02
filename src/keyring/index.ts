import { ISetupAccountParams, TWallet } from "../types";
import { mnemonicToSeed } from "bip39";
import { hdkey } from "ethereumjs-wallet";
import { DEFAULT_HD_PATH } from "../constants";
import { toChecksumAddress } from "ethereumjs-util";

export const initializeAccount = async ({
  mnemonic,
  derivationIndex,
}: ISetupAccountParams): Promise<TWallet> => {
  const walletParams = {
    mnemonic,
    derivationIndex,
  };

  return getRootFromMnemonic(walletParams)
    .then(async (root) => {
      const address = getAddressFromRoot({ root });
      const privateKey = getPrivateKeyFromRoot({ root });

      return {
        mnemonic,
        addresses: [address],
        privateKeys: [privateKey],
      };
    })
    .catch((err) => {
      throw new Error(`${err} on getRootFromMnemonic`);
    });
};

const getAddressFromRoot = ({ root }: { root: hdkey }) => {
  const wallet = root.getWallet();
  const address = "0x" + wallet.getAddress().toString("hex");
  const checksummedAddress = toChecksumAddress(address);
  return checksummedAddress;
};

const getPrivateKeyFromRoot = ({ root }: { root: hdkey }) => {
  const wallet = root.getWallet();
  const privateKey = wallet.getPrivateKey().toString("hex");
  return privateKey;
};

const getRootFromMnemonic = async ({
  mnemonic,
  derivationIndex,
}: {
  mnemonic: string;
  derivationIndex: number;
}) => {
  return mnemonicToSeed(mnemonic).then((seed) => {
    const hdWallet = hdkey.fromMasterSeed(seed);
    const root = hdWallet.derivePath(`${DEFAULT_HD_PATH}/${derivationIndex}`);
    return root;
  });
};
