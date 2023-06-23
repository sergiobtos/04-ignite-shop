import Image from "next/image"
import { GetStaticProps } from "next"
import { HomeContainer, Product } from "../styles/pages/home"
import Head from "next/head"
import Link from "next/link"
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import { stripe } from "../lib/stripe"
import Stripe from "stripe"

interface HomeProps {
    products: {
        id: string;
        name: string;
        imageUrl: string;
        price: number;
    }[]
}

export default function Home({products}: HomeProps) {
    const [sliderRef] = useKeenSlider({
        slides: {
            perView: 3,
            spacing: 48,
        }
    })

    return (
        <>
            <Head>
                <title>Home | Ignite Shop</title>
            </Head>
           <HomeContainer ref={sliderRef} className="keen-slider">
               {products.map(product => {
                return (
                    <Link href={`/product/${product.id}`} key={product.id}>
                        <Product className="keen-slider__slide">
                        <Image src={product.imageUrl} width={520} height={480} alt="1" />
                        <footer>
                            <strong>{product.name}</strong>
                            <span>{product.price}</span>
                        </footer>
                        </Product>
                    </Link>
                )
               })}
            </HomeContainer>
        </>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    //await new Promise(resolve => setTimeout(resolve, 1000));
    const response = await stripe.products.list({
        expand: ['data.default_price']
    });
    const responseData = response.data.filter(product => product.name !== 'Subscription')

    const products = responseData.map(product => {
        const price = product.default_price as Stripe.Price;
        if(product.name !== 'Subscription') {
            return {
                id: product.id,
                name: product.name,
                imageUrl: product.images[0] || '',
                price: new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                }).format(price.unit_amount! / 100),
            }
        }   
    })

    return {
        props: {
            products,
        },
        revalidate: 60 * 60 * 2 , // 2 hours
    }
}