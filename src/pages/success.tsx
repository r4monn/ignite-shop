import { ImageContainer, SuccessContainer } from "../styles/pages/success";
import { GetServerSideProps } from "next";
import { stripe } from "../lib/stripe";
import Stripe from "stripe";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

interface SuccesProps {
    customerName: string;
    product: {
        name: string;
        imageUrl: string;
    }
}

export default function Success({ customerName, product }: SuccesProps) {
    return (
        <>
            <Head>
                <title>Compra efetuada | Ignite Shop</title>

                <meta name="robots" content="noindex" />
            </Head>

            <SuccessContainer>
                <h1>Compra efetuada!</h1>

                <ImageContainer>
                    <Image src={product.imageUrl} width={120} height={110} alt="" />
                </ImageContainer>

                <p>
                    Uhuul <strong>{customerName}</strong>, sua <strong>{product.name}</strong> em breve estará à caminho da sua casa!
                </p>

                <Link href='/'>
                    Continuar comprando
                </Link>
            </SuccessContainer>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ query, params }) => {

    if (!query.session_id) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }

    const sessionId = String(query.session_id); //* Parâmetro devolvido pelo stripe para acessar os dados do comprador

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ['line_items', 'line_items.data.price.product']
    })

    const customerName = session.customer_details?.name;
    const product = session.line_items?.data[0].price?.product as Stripe.Product;


    return {
        props: {
            customerName,
            product: {
                name: product.name,
                imageUrl: product.images[0]
            }
        }
    }
}