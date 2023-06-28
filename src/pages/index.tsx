import Image from "next/image"
import { GetStaticProps } from "next"
import { HomeContainer, Product } from "../styles/pages/home"
import Head from "next/head"
import Link from "next/link"
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import { stripe } from "../lib/stripe"
import Stripe from "stripe"
import { useState } from "react"
import { Arrow } from '../components/Arrow'

interface HomeProps {
    products: {
        id: string;
        name: string;
        imageUrl: string;
        price: string;
    }[]
}

export default function Home({products}: HomeProps) {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [loaded, setLoaded] = useState(false)
    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
        slides: {
            perView: 3,
            spacing: 48,
        },
        initial: 0,
        slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel)
        },
        created() {
            setLoaded(true)
        }
    })
    console.log('38',instanceRef?.current?.track.details.slides.length)
    console.log('current slide',instanceRef?.current?.track.details.rel)

    return (
        <>
            <Head>
                <title>Home | Ignite Shop</title>
            </Head>
           <HomeContainer>
            <div ref={sliderRef} className="keen-slider">
               {products.map(product => {
                return (
                    <Link key={product.id} href={`/product/${product.id}`}  prefetch={false}>
                        <Product className="keen-slider__slide">
                        <Image 
                            src={product.imageUrl} 
                            width={520} 
                            height={480} 
                            alt="" />
                        <footer>
                            <strong>{product.name}</strong>
                            <span>{product.price}</span>
                        </footer>
                        </Product>
                    </Link>
                )
               })}
               {loaded && instanceRef.current && (
                    <>
                        <Arrow
                            left
                            onClick={(e: any) =>
                            e.stopPropagation() || instanceRef.current?.prev()
                            }
                            disabled={currentSlide === 0}
                        />
                        <Arrow
                            onClick={(e: any) =>
                            e.stopPropagation() || instanceRef.current?.next()
                            }
                            disabled={currentSlide === 1}
                        />
                    </>
               )}
               </div>
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