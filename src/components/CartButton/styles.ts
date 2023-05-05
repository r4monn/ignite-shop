import { styled } from "@stitches/react";

export const CartButtonContainer = styled('button', {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
    borderRadius: 6,
    position: "relative",

    width: '3rem',
    height: '3rem',

    "&:disabled": {
        opacity: 0.6,
        cursor: "not-allowed",
    },

    svg: {
        fontSize: 24,
    },

    variants: {
        color: {
            gray: {
                background: '$gray800',
                color: '$gray500',
            },
            green: {
                background: '$green500',
                color: '$white',

                '&:not(:disabled):hover': {
                    backgroundColor: "$green300",
                },
            },
        },
    },
    
    defaultVariants: {
        color: 'gray',
    }
})