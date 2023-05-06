import Head from "next/head"
import Stripe from "stripe"
import { stripe } from "@/src/lib/stripe"

import { ImageContainer, ProductContainer, ProductDetailsContainer } from "@/src/styles/pages/product"

import { GetStaticPaths, GetStaticProps } from "next"
import Image from "next/image"
import useCart from "@/src/hooks/useCart"
import { IProduct } from "@/src/contexts/CartContext"

interface ProductProps {
    product: IProduct;
}

export default function Product({ product }: ProductProps) {

    const { addToCart, isItemAlreadyExistsInCart } = useCart();

    const  itemAlreadyInCart = isItemAlreadyExistsInCart(product.id);

    return (
        <>
            <Head>
                <title>{product.name} | Ignite Shop</title>
            </Head>
            <ProductContainer>
                <ImageContainer>
                    <Image src={product.imageUrl} width={520} height={480} alt="" />
                </ImageContainer>

                <ProductDetailsContainer>
                    <h1>{product.name}</h1>
                    <span>{product.price}</span>

                    <p>{product.description}</p>

                    <button
                        disabled={itemAlreadyInCart}
                        onClick={() => addToCart(product)}>
                        {itemAlreadyInCart ? 'Este produto já está no carrinho' : 'Adicionar ao carrinho'}
                    </button>
                </ProductDetailsContainer>
            </ProductContainer>
        </>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [
            { params: { id: 'prod_MnmskcHNRIhGnJ' } }
        ],
        fallback: "blocking",
    }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
    const productId = String(params?.id);

    const product = await stripe.products.retrieve(productId, {
        expand: ['default_price'],
    })

    const price = product.default_price as Stripe.Price

    return {
        props: {
            product: {
                id: product.id,
                name: product.name,
                imageUrl: product.images[0],
                price: new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                }).format(price.unit_amount as number / 100),
                numberPrice: price.unit_amount as number / 100,
                description: product.description,
                defaultPriceId: price.id,
            }
        },
        revalidate: 60 * 60 * 1,
    }
}