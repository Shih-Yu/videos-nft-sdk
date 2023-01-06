import "../styles/globals.css"
import type { AppProps } from "next/app"
import {
  LivepeerConfig,
  createReactClient,
  studioProvider,
} from "@livepeer/react"
import { WagmiConfig, chain, createClient, configureChains } from "wagmi"

import "@rainbow-me/rainbowkit/styles.css"

import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit"

import { publicProvider } from "wagmi/providers/public"
import { infuraProvider } from "wagmi/providers/infura"

const { chains, provider, webSocketProvider } = configureChains(
  [chain.polygon],
  [
    infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFURA_API_KEY }),
    publicProvider(),
  ]
)

const { connectors } = getDefaultWallets({
  appName: "Mint NFT",
  chains,
})
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
})

const client = createReactClient({
  provider: studioProvider({
    baseUrl: "https://livepeer.monster/api",
    apiKey: "fbc655bf-8920-43b4-be8c-6dd0c35447a5",
  }),
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <WagmiConfig client={wagmiClient}>
        <LivepeerConfig client={client}>
          <RainbowKitProvider chains={chains} theme={darkTheme()}>
            <Component {...pageProps} />
          </RainbowKitProvider>
        </LivepeerConfig>
      </WagmiConfig>
    </>
  )
}

export default MyApp
