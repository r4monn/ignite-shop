import { Handbag } from "phosphor-react";
import { CartButtonContainer } from "./styles";
import { ComponentProps } from "react";

type CartButtonProps = ComponentProps<typeof CartButtonContainer>;

export default function CartButton({ ...rest }: CartButtonProps) {
    return (
        <CartButtonContainer {...rest}>
            <Handbag weight="bold" />
        </CartButtonContainer>
    )
}