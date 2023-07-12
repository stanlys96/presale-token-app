import "../app/globals.css";
import { MoralisProvider } from "react-moralis";
import { AppProps } from "next/app";
import { Mainnet, DAppProvider, Goerli } from "@usedapp/core";
import { getDefaultProvider } from "ethers";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <DAppProvider
        config={{
          readOnlyChainId: Mainnet.chainId,
          readOnlyUrls: {
            // [Mainnet.chainId]: getDefaultProvider("mainnet"),
            [Goerli.chainId]:
              "https://goerli.infura.io/v3/11d0a5344888470393248b1c55105a8c",
          },
          notifications: {
            expirationPeriod: 1000,
            checkInterval: 1000,
          },
        }}
      >
        <Component {...pageProps} />
      </DAppProvider>
    </>
  );
}

export default MyApp;
