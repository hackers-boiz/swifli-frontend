import { getAddress, signTransaction, isConnected, isAllowed } from "@stellar/freighter-api";
import { SorobanRpc, TransactionBuilder } from "@stellar/stellar-sdk";
import * as StellarSdk from "@stellar/stellar-sdk";
import { useEffect, useState } from "react";
// import { ConnectPasskey } from "./ConnectPasskey"


export const MintButton = ({ id, name }: { id: string, name: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const checkFreighter = async () => {
      try {
        const connected = await isConnected();
        setIsReady(!connected.isConnected);

        if (connected.isConnected) {
          const pubKey = await getAddress();
          setPublicKey(pubKey.address);
        }
      } catch (error) {
        console.error("Error checking Freighter connection:", error);
        setIsReady(false);
      }
    };

    checkFreighter();
  }, []);

  const onSubmit = async () => {
    setIsLoading(true);

    try {
      await isAllowed();

      const fetchResult = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/${id}/${name.toLowerCase()}`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ publicKey: publicKey }),
        },
      );

      const transaction = (await fetchResult.json()).transaction;
      console.log({ transaction });

      const rpc = new SorobanRpc.Server(process.env.NEXT_PUBLIC_NETWORK_URL!);

      const tx = TransactionBuilder.fromXDR(transaction, StellarSdk.Networks.TESTNET);
      const preparedTx = await rpc.prepareTransaction(tx);

      const { signedTxXdr } = await signTransaction(preparedTx.toXDR(), {
        networkPassphrase: StellarSdk.Networks.TESTNET
      });

      const { hash } = await rpc.sendTransaction(StellarSdk.TransactionBuilder.fromXDR(
        signedTxXdr,
        StellarSdk.Networks.TESTNET,
      ),);
      console.log({ hash });
      setTxHash(hash);

      setIsLoading(false);
    } catch (error) {

      console.error(error);
      setIsLoading(false);

    } finally {
      setIsLoading(false);
    }
  };

  if(txHash) {
    return <a href={`https://stellar.expert/explorer/testnet/tx/${txHash}`} target="_blank" rel="noreferrer" className="bg-teal-500 text-black font-bold px-4 py-2 rounded flex-1 hover:bg-teal-600 text-center disabled:bg-gray-700 disabled:text-white">See transaction</a>;
  }

  return <button onClick={onSubmit} disabled={isLoading} className="bg-teal-500 text-black font-bold px-4 py-2 rounded flex-1 hover:bg-teal-600 text-center disabled:bg-gray-700 disabled:text-white">{isLoading ? 'Loading...' : name}</button>;
};

