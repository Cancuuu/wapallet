export type TMnemonic = string;
export type TAddress = string;
export type TPrivateKey = string;

export interface ICreateWalletParams {
  name: string;
  password: string;
  accountNumber: number;
}

export interface ISetupAccountParams {
  mnemonic: TMnemonic;
  accountNumber?: number;
  derivationIndex: number;
  name?: string;
  password?: string;
}

export type TWallet = {
  mnemonic: TMnemonic;
  addresses: Array<TAddress>;
  privateKeys: Array<TAddress>;
};
