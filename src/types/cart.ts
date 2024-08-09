export type CartItemProps = {
    id: string;
    attribute: string;
    quantity: number;
    product: {
        id?: string;
        name?: string;
        images?: string[];
        salePrice?: string;
    }
}

export type AddToCartProps = {
    productId: string;
    quantity: number;
    attribute?: string;
}