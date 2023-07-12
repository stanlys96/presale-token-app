import { useEffect, useState } from "react";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { useEthers, useNotifications } from "@usedapp/core";
import Swal from "sweetalert2";
import ProgressBar from "@ramonak/react-progress-bar";
import supermanPresale from "../constants/SupermanPresale.json";
import supermanCoin from "../constants/SupermanCoin.json";
import { ethers, utils } from "ethers";
import { Icon } from "@iconify/react";
import { useGetProgress, useBuyTokenEth } from "@/hooks";

const truncateStr = (fullStr, strLen) => {
  if (fullStr.length <= strLen) return fullStr;

  const separator = "...";
  const seperatorLength = separator.length;
  const charsToShow = strLen - seperatorLength;
  const frontChars = Math.ceil(charsToShow / 2);
  const backChars = Math.floor(charsToShow / 2);
  return (
    fullStr.substring(0, frontChars) +
    separator +
    fullStr.substring(fullStr.length - backChars)
  );
};

export default function HomePage() {
  const tokenProgress = useGetProgress();
  const { send: buyTokenEth, state: buyTokenEthState } = useBuyTokenEth();
  const decimals = 18;
  const [progress, setProgress] = useState(0);
  const [price, setPrice] = useState(0.1);
  const { account, activateBrowserWallet, deactivate, chainId } = useEthers();

  useEffect(() => {
    console.log(tokenProgress?.value.toString(), "<<<< WALAO");
  }, [account, tokenProgress]);
  return (
    <div className="h-[100vh] bg-white the-container text-white">
      <nav className="max-w-[1200px] w-full mx-auto h-[15vh]">
        <ul className="flex justify-between py-4">
          <li>Walao</li>
          <li className="flex items-stretch">
            {!account && (
              <button
                onClick={async () => {
                  activateBrowserWallet();
                  if (typeof window !== "undefined") {
                    window.localStorage.setItem("connected", "injected");
                  }
                }}
                className="selectWalletBtn"
              >
                Connect Metamask
              </button>
            )}
            {account && (
              <div
                className="metamaskIconContainer"
                onClick={async () => {
                  deactivate();
                  if (typeof window !== "undefined") {
                    window.localStorage.removeItem("connected");
                  }
                }}
              >
                <Icon icon="logos:metamask-icon" />
              </div>
            )}
            {account && (
              <div className="accountContainer">
                {account.slice(0, 6)}...
                {account.slice(account.length - 4)}
              </div>
            )}
          </li>
        </ul>
      </nav>
      <div className="max-w-[1000px] w-full mx-auto h-[85vh]">
        <div className="grid grid-cols-2 gap-x-8 h-full">
          <div className="flex flex-col gap-6 justify-center items-center h-full">
            <p className="text-left">Welcome to the Presale of Superman Coin</p>
            <p>
              Buy $SPC tokens at a very discounted price in the Presale. Swap
              ETH for $SPC without any fees at the lowest price. During the
              Presale $SPC is available for only $0.21 compared to the public
              sale for $0.53
            </p>
            <img className="w-[240px] h-[240px]" src="bdinu.png" />
          </div>
          <div className="flex flex-col mt-[65px] items-center gap-3 bg-black h-fit p-4 rounded-[15px]">
            <p>PRESALE ENDING SOON</p>
            <p>1 SPC = $0.21 USDT</p>
            <p>0% SOLD</p>
            <ProgressBar
              className="w-full"
              completed={parseInt(tokenProgress?.toString() ?? "0")}
            />
            <p>ETH RAISED - 107.564 ETH</p>
            <button
              onClick={async () => {
                const amountAsWei = utils.parseEther("0.1");
                console.log(amountAsWei.toString(), "<<<");
                buyTokenEth({ value: amountAsWei.toString() });
              }}
              className="bg-blue w-full p-3 rounded-[10px] text-white"
            >
              Buy With ETH
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
