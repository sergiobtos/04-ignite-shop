import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Stripe from 'stripe'
import { stripe } from '../../lib/stripe'
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from '../../styles/pages/product'
import Head from 'next/head'
import { Product as IProduct } from 'use-shopping-cart/core'
import { useShoppingCart } from 'use-shopping-cart'

export default function Product({ product }: IProduct) {
  const { isFallback } = useRouter()

  const cart = useShoppingCart()
  const { addItem } = cart

  const handleBuyProduct = () => {
    addItem(product)
  }

  if (isFallback) {
    return <p>Loading...</p>
  }
  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>
      <ProductContainer>
        <ImageContainer>
          <Image src={product.image} alt="" width={520} height={480} />
        </ImageContainer>
        <ProductDetails>
          <h1>{product.name}</h1>
          <span>
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(product.price / 100)}
          </span>
          <p>{product.description}</p>
          <button onClick={handleBuyProduct}>Add to the bag</button>
        </ProductDetails>
      </ProductContainer>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: 'prod_MTCdzYGZWxjsjl' } }],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productID = params?.id as string

  const product = await stripe.products.retrieve(productID, {
    expand: ['default_price'],
  })

  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        image: product.images[0],
        description: product.description,
        price: price.unit_amount,
        currency: price.currency,
        price_id: price.id,
      },
    },
    revalidate: 60 * 60 * 1, // 1 hora
  }
}