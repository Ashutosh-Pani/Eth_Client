import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useConnection, useReadContract, WagmiProvider } from "wagmi";
import { config } from "./config";
import "./App.css";
import { Account } from "./account";
import { WalletOptions } from "./wallet-option";
const client = new QueryClient();

function App() {
  return (
    <>
      <WagmiProvider config={config}>
        <QueryClientProvider client={client}>
          <ConnectWallet />
          <BalanceOf />
        </QueryClientProvider>
      </WagmiProvider>
    </>
  );
}

function BalanceOf() {
  const { address } = useConnection();
  const { data, isLoading, error } = useReadContract({
    address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
    abi: [
      {
        constant: true,
        inputs: [{ name: "who", type: "address" }],
        name: "balanceOf",
        outputs: [{ name: "", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
    ],
    functionName: "balanceOf",
    args: [address?.toString()],
  });

  if (isLoading) {
    return <div> loading...</div>;
  }

  if (error) {
    console.log(error);
    return <div>something went wrong</div>;
  }

  return <div>Total Supply of USDT is {data?.toString()}</div>;
}

function ConnectWallet() {
  const { isConnected } = useConnection();

  if (isConnected) return <Account />;
  return <WalletOptions />;
}

export default App;
