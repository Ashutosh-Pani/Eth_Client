import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {   useConnection, WagmiProvider } from 'wagmi'
import { config } from "./config"
import './App.css'
import { Account } from './account';
import { WalletOptions } from './wallet-option';

const client = new QueryClient();

function App() {


  return (
    <>
    <WagmiProvider config={config}>
      <QueryClientProvider client={client}>
        <ConnectWallet/>
      </QueryClientProvider>
    </WagmiProvider>
    </>
  )
}

function ConnectWallet (){

  const { isConnected } = useConnection()

  if(isConnected) return <Account/>
  return <WalletOptions/>
}


export default App
