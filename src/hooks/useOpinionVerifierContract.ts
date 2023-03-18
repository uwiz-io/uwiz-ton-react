import { useState } from "react";
import OpinionVerifier from "../contracts/opinionVerifier";
import { useTonClient } from "./useTonClient";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { useTonConnect } from "./useTonConnect";
import { Address, OpenedContract } from "ton-core";
import { useQuery } from "@tanstack/react-query";
import { CHAIN } from "@tonconnect/protocol";
import { Cell } from "ton"
// import { useTonAddress } from '@tonconnect/ui-react';

export function useOpinionVerifierContract() {
  const { client } = useTonClient();
  const { wallet, sender, network } = useTonConnect();

  const OpinionVerifierContract = useAsyncInitialize(async () => {
    if (!client) return;
    if (!wallet) return;
    console.log(wallet);
    const opinionVerifierCodeBase64 = "te6cckEBBQEAtAABFP8A9KQT9LzyyAsBAgFiAgMBntAyIccAkVvg0NMDMfpAMO1E0NP/+kAwUSLHBfLhkQLTH9M/MYIQFvJBu1Iguo4Q+QJQA7IhAcjL/wHPFsntVJIwMuKCEKbkPlkSupEw4w0EABWhS8PaiaGn//SAYQCC+CdvIjCCCvrwgKEgwv/y4FCNBZGdW5kIGJhY2sgZnJvbSBjb3VudGVygcIAYyMsFUATPFlj6AhLLagHPFsly+wCbo58r";
    const opinionVerifierCode = Cell.fromBase64(opinionVerifierCodeBase64)
    const contract = OpinionVerifier.createForDeploy(opinionVerifierCode, Address.parse(wallet || ""));

    if (await client.isContractDeployed(contract.address)) {
      console.log("OpinionVerifier already deployed");
    console.log(await client.getBalance(contract.address))
    }
    return client.open(contract) as OpenedContract<OpinionVerifier>;
  }, [client, wallet]);


  // const { isDeployed, isFetchingDeployed } = useQuery(
  //   ["OpinionVerifier"],
  //   async () => {
  //     if (!OpinionVerifierContract) return null;
  //     if (!client) return null;
  //     return (await client.isContractDeployed(OpinionVerifierContract.address));
  //   },
  //   { refetchInterval: 3000 }
  // );

  const { data, isFetching } = useQuery(
    ["OpinionVerifier"],
    async () => {
      if (!OpinionVerifierContract) return null;
      return (await OpinionVerifierContract!.getInfo()).hash.toString(16);
    },
    { refetchInterval: 5000 }
  );


  const balance = useQuery(
    ["OpinionVerifier"],
    async () => {
      if (!OpinionVerifierContract) return null;
      return (await OpinionVerifierContract!.getState()).balance.toString();
    },
    { refetchInterval: 11000 }
  );


  return {
    value: isFetching ? null : data,
    // deployed: isDeployed ? null : isDeployed,
    address: OpinionVerifierContract?.address.toString(),
    balance: balance.isFetching ? null : balance.data, 
    sendPredictionString: (predictionString: string) => {
      console.log(predictionString, sender)
      if (!sender) {return}
      if (!predictionString) {return}
      
      return OpinionVerifierContract?.sendPredictionString(sender, predictionString);
    },
    sendDeploy: () => {
      if (!sender) {return}
      return OpinionVerifierContract?.sendDeploy(sender);
    }
  };
}
