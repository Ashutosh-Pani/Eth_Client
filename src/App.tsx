import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {  useAccount, useConnect, useDisconnect, WagmiProvider } from 'wagmi'
import { config } from "./config"
import './App.css'

const client = new QueryClient();

function App() {


  return (
    <>
    <WagmiProvider config={config}>
      <QueryClientProvider client={client}>
        <WalletOptions></WalletOptions>
      </QueryClientProvider>
    </WagmiProvider>
    </>
  )
}

export function WalletOptions() {
  const { connectors, connect } = useConnect()
  const { address } = useAccount()
  const {disconnect}  = useDisconnect()
  if(address){
    <div>
      you are connected {address}
      <button onClick={()=> {disconnect()}}>disconnect</button>
    </div>
  }
   return connectors.map((connector) => (
    <button key={connector.uid} onClick={() => connect({ connector })}>
      {connector.name}
    </button>
  ))
}

export default App
