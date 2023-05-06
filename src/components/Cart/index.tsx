import * as Dialog from '@radix-ui/react-dialog';
import CartButton from "../CartButton";
import {
    CartClose,
    CartContent,
    CartProduct,
    CartProductDetails,
    CartProductImage,
    CartTotalDetais,
    TotalDetailsSum
} from './styles';
import { X, FileX } from 'phosphor-react';
import Image from 'next/image';
import useCart from '@/src/hooks/useCart';
import { useState } from 'react';
import axios from 'axios';

export default function Cart() {
    const { cartItems, removeCartItem, cartTotal } = useCart();
    const cartQuantity = cartItems.length;

    const formattedCartTotal = new Intl.NumberFormat('ptr-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(cartTotal);

    const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false);

    async function handleCheckout() {
        try {
            setIsCreatingCheckoutSession(true);
            const response = await axios.post(`/api/checkout`, {
                products: cartItems,
            })

            const { checkoutUrl } = response.data;
            window.location.href = checkoutUrl;
        } catch (error) {
            setIsCreatingCheckoutSession(false);

            alert('Falha ao redirecionar ao checkout!');
        }
    }

    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <CartButton />
            </Dialog.Trigger>

            <Dialog.Portal>
                <CartContent>
                    <CartClose>
                        <X size={24} weight='bold' />
                    </CartClose>

                    <h2>Sacola de compras</h2>

                    <section>
                        {cartQuantity <= 0 &&
                            <>
                                <FileX size={64} />
                                <p>Poxa, parece que seu carrinho está vazio :(</p>
                            </>
                        }

                        {cartItems.map((cartItem) => (
                            <CartProduct key={cartItem.id}>
                                <CartProductImage>
                                    <Image width={100} height={93} alt='' src={cartItem.imageUrl} />
                                </CartProductImage>
                                <CartProductDetails>
                                    <p>{cartItem.name}</p>
                                    <strong>{cartItem.price}</strong>
                                    <button onClick={() => removeCartItem(cartItem.id)}>Remover</button>
                                </CartProductDetails>
                            </CartProduct>
                        ))}

                    </section>

                    <CartTotalDetais>
                        <TotalDetailsSum>
                            <div>
                                <span>Quantidade</span>
                                <p>{cartQuantity} {cartQuantity === 1 ? 'item' : 'itens'}</p>
                            </div>
                            <div>
                                <span>Valor total</span>
                                <p>{formattedCartTotal}</p>
                            </div>
                        </TotalDetailsSum>
                        <button
                            disabled={isCreatingCheckoutSession || cartQuantity <= 0}
                            onClick={handleCheckout}
                        >
                            Finalizar Compra
                        </button>
                    </CartTotalDetais>
                </CartContent>
            </Dialog.Portal>
        </Dialog.Root>
    )
}