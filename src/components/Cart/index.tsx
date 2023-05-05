import * as Dialog from '@radix-ui/react-dialog';
import CartButton from "../CartButton";
import { CartClose, CartContent, CartProduct, CartProductDetails, CartProductImage, CartTotalDetais, TotalDetailsSum } from './styles';
import { X, FileX } from 'phosphor-react';
import Image from 'next/image';

export default function Cart() {
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
                        <FileX size={64} />

                        <p>Poxa, parece que seu carrinho está vazio :(</p>
                    
                        <CartProduct>
                            <CartProductImage>
                                <Image width={100} height={93} alt='' src='' />
                            </CartProductImage>
                            <CartProductDetails>
                                <p>Produto 1</p>
                                <strong>R$ 50,00</strong>
                                <button>Remover</button>
                            </CartProductDetails>
                        </CartProduct>
                    </section>

                    <CartTotalDetais>
                        <TotalDetailsSum>
                            <div>
                                <span>Quantidade</span>
                                <p>2 itens</p>
                            </div>
                            <div>
                                <span>Valor total</span>
                                <p>R$ 103,99</p>
                            </div>
                        </TotalDetailsSum>
                        <button>Finalizar Compra </button>
                    </CartTotalDetais>
                </CartContent>
            </Dialog.Portal>
        </Dialog.Root>
    )
}