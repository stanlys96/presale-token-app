import { useState, useEffect } from "react";
import { useEthers, useContractFunction, useCall } from "@usedapp/core";
import { constants, utils } from "ethers";
import { Contract } from "@ethersproject/contracts";
import SupermanPresale from "../constants/SupermanPresale.json";
import SupermanCoin from "../constants/SupermanCoin.json";

export const useGetProgress = () => {
  const { account, chainId } = useEthers();
  const { abi } = SupermanPresale;
  const supermanPresaleAddress = "0x94d47B9D612455b432A8267b3aeC21A46eD451bd";
  const supermanPresaleInterface = new utils.Interface(abi);
  const supermanPresaleContract = new Contract(
    supermanPresaleAddress,
    supermanPresaleInterface
  );

  const result = useCall({
    contract: supermanPresaleContract,
    method: "getProgress",
  });
  return result;
};
