export type MakeOrderBody = {
    shippingAddress: string,
    shippingCity: string,
    recipientFirstName: string,
    recipientLastName: string,
    recipientPhone: string,
    recipientEmail: string,
    shippingMethod: string,
    paymentMethod: string,
    paymentStatus: PaymentStatus,
}

export type ListOrderRes = {
    id: string;
    items: [
        {
            id: string;
            orderId: string;
            productId: string;
            name: string;
            attribute: string;
            image: string;
            price: string;
            quantity: number;
        }
    ]
    shippingAddress: string;
    shippingCity: string;
    recipientFirstName: string;
    recipientLastName: string;
    recipientPhone: string;
    recipientEmail: string;
    shippingMethod: string;
    paymentMethod: string;
    paymentStatus: string;
    trackingNumber: string;
    status: string;
    created_at: string;
    updated_at: string;
}


export enum ShippingMethod {
    FREE = 'free',
    STANDARD = 'standard'
}

export enum PaymentStatus {
    PENDING = 'pending',
    PAID = 'paid',
    FAILED = 'failed'
}

export enum PaymentMethod {
    COD = 'cod',
    ZALO = 'zalo_pay'
}