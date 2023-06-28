import { AppProps } from 'next/app'
import { globalStyles } from '../styles/global'
import { Container } from '../styles/pages/app'

import { CartProvider } from 'use-shopping-cart'
import { Header } from '../components/Header'

export default function App({ Component, pageProps }: AppProps) {
  globalStyles()
  return (
    <CartProvider
      cartMode="checkout-session"
      stripe={process.env.STRIPE_SECRET_KEY as string}
      currency="USD"
      shouldPersist={false}
    >
      <Container>
        <Header />
        <Component {...pageProps} />
      </Container>
    </CartProvider>
  )
}