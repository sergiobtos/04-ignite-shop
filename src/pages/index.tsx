import Image from "next/image"
import { GetStaticProps } from "next"
import { HomeContainer, Product } from "../styles/pages/home"
import Head from "next/head"
import Link from "next/link"
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'

export default function Home() {
    return (
        <>
            <Head>
                <title>Home | Ignite Shop</title>
            </Head>
            <HomeContainer>
                <Product className="keen-slider__slide">
                    <Image src='' width={520} height={480} alt="" />
                    <footer>
                        <strong>product.name</strong>
                        <span>product.price</span>
                    </footer>
                </Product>
            </HomeContainer>
        </>
    )
}