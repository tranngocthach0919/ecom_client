'use client'
import { createContext, useEffect, useReducer, useState } from "react";
import { AddToCart } from "src/apis/carts/add-to-cart-api";
import { fetchCarts } from "src/apis/carts/cart-list-api";
import { deleteCart } from "src/apis/carts/delete-cart";
import { updateCartQty } from "src/apis/carts/update-cart-api";
import { CartItemProps } from "src/types/cart";

export type CartContextItemProps = {
  id?: string;
  quantity: number;
  attribute?: string;
  salePrice?: string;
  images?: string[];
  product: {
    id: string;
    name?: string;
    images?: string[];
    salePrice?: string;
  }
};


interface CartContextProps {
  cartItems: CartContextItemProps[];
  dispatch: React.Dispatch<CartAction>;
  addToCart: (product: CartContextItemProps) => void;
  updateCartItem: (product: CartContextItemProps) => void;
  deleteCartItem: (id: string) => void;
}

type CartAction =
  | { type: "ADD_TO_CART"; payload: CartContextItemProps }
  | { type: "UPDATE_CART_ITEM"; payload: CartContextItemProps }
  | { type: "DELETE_CART_ITEM"; payload: string }
  | { type: "SET_CART_ITEMS"; payload: CartContextItemProps[] };

export const CartContext = createContext<CartContextProps>({
  cartItems: [],
  dispatch: () => { },
  addToCart: () => { },
  updateCartItem: () => { },
  deleteCartItem: () => { },
});

export const CartTriggerContext = createContext<{
  trigger: number;
  setTrigger: React.Dispatch<React.SetStateAction<number>>;
} | undefined>(undefined);

function cartReducer(state: CartContextItemProps[], action: CartAction) {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingProductIndex = state.findIndex(
        (item) => item.product.id === action.payload.product.id
      );

      if (existingProductIndex !== -1) {
        const updatedCart = [...state];
        const newQuantity = updatedCart[existingProductIndex].quantity + action.payload.quantity;

        if (newQuantity > 10) {
          updatedCart[existingProductIndex].quantity = 10;
          return updatedCart;
        } else {
          updatedCart[existingProductIndex].quantity = newQuantity;
          return updatedCart;
        }
      } else {
        return [
          ...state,
          {
            ...action.payload
          },
        ];
      }
    }
    case "UPDATE_CART_ITEM": {
      return state.map((item) =>
        item.product.id === action.payload.product.id &&
          item.attribute === action.payload.attribute
          ? { ...item, ...action.payload }
          : item
      );
    }
    case "DELETE_CART_ITEM": {
      return [...state.filter(cart => cart.id !== action.payload)]
    }
    case "SET_CART_ITEMS": {
      return action.payload;
    }
    default:
      return state;
  }
}

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, dispatch] = useReducer(cartReducer, []);
  const [trigger, setTrigger] = useState(0);

  useEffect(() => {
    const fetchCartsData = async () => {
      try {
        const cartsList = await fetchCarts();
        dispatch({ type: "SET_CART_ITEMS", payload: cartsList });
      } catch (error) {
        console.error("Failed to fetch carts:", error);
      }
    };

    fetchCartsData();
  }, [trigger]);

  const addToCart = async (product: CartContextItemProps) => {
    try {
      dispatch({ type: "ADD_TO_CART", payload: product });
      const addCartResponse = await AddToCart({
        productId: product.product.id,
        quantity: product.quantity,
      });

      if (addCartResponse) {
        const cartsList = await fetchCarts();
        cartsList.map(async (cart: CartItemProps) => {
          if (cart.quantity > 10) {
            console.log("Cart quantity is greater than 10");
            await updateCartQty({ productId: product.product.id, quantity: 10 })
          }
        })
        dispatch({ type: "SET_CART_ITEMS", payload: cartsList });
        setTrigger(prev => prev + 1);
      }
    } catch (error) {
      throw new Error("Failed to add to cart:", error);
    }
  };

  const updateCartItem = async (body: CartContextItemProps) => {
    try {
      const isUpdated = await updateCartQty({
        productId: body.product.id,
        quantity: body.quantity,
      });
      if (isUpdated) {
        const cartsList = await fetchCarts();
        dispatch({ type: "SET_CART_ITEMS", payload: cartsList });
        // dispatch({ type: "UPDATE_CART_ITEM", payload: body });
        setTrigger(prev => prev + 1);
      }
    } catch (err) {
      throw new Error("Error updating cart item:", err);
    }
  };

  const deleteCartItem = async (id: string) => {
    try {
      const isDeleted = await deleteCart(id);
      if (isDeleted) {
        dispatch({ type: "DELETE_CART_ITEM", payload: id });
        setTrigger(prev => prev + 1);
      }
    } catch (error) {
      throw new Error("Failed to delete cart item", error);
    }
  };


  return (
    <CartContext.Provider value={{ cartItems, dispatch, addToCart, updateCartItem, deleteCartItem }}>
      <CartTriggerContext.Provider value={{ trigger, setTrigger }}>
        {children}
      </CartTriggerContext.Provider>
    </CartContext.Provider>
  );
};
