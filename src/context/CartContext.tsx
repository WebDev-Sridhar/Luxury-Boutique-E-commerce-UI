import React, { createContext, useContext, useReducer, useEffect, useCallback } from "react";
import type { Product, CartItem } from "@/types/product";

interface CartState {
  items: CartItem[];
  isCartOpen: boolean;
}

type CartAction =
  | { type: "ADD_ITEM"; payload: { product: Product; quantity: number; size?: string; color?: string } }
  | { type: "REMOVE_ITEM"; payload: { productId: string; size?: string; color?: string } }
  | { type: "UPDATE_QUANTITY"; payload: { productId: string; quantity: number; size?: string; color?: string } }
  | { type: "CLEAR_CART" }
  | { type: "OPEN_CART" }
  | { type: "CLOSE_CART" };

function getItemKey(productId: string, size?: string, color?: string) {
  return `${productId}-${size || "default"}-${color || "default"}`;
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const { product, quantity, size, color } = action.payload;
      const key = getItemKey(product.id, size, color);
      const existingIndex = state.items.findIndex(
        (item) => getItemKey(item.product.id, item.selectedSize, item.selectedColor) === key
      );

      if (existingIndex > -1) {
        const newItems = [...state.items];
        newItems[existingIndex] = {
          ...newItems[existingIndex],
          quantity: newItems[existingIndex].quantity + quantity,
        };
        return { ...state, items: newItems, isCartOpen: true };
      }

      return {
        ...state,
        items: [...state.items, { product, quantity, selectedSize: size, selectedColor: color }],
        isCartOpen: true,
      };
    }

    case "REMOVE_ITEM": {
      const { productId, size, color } = action.payload;
      const key = getItemKey(productId, size, color);
      return {
        ...state,
        items: state.items.filter(
          (item) => getItemKey(item.product.id, item.selectedSize, item.selectedColor) !== key
        ),
      };
    }

    case "UPDATE_QUANTITY": {
      const { productId, quantity, size, color } = action.payload;
      if (quantity <= 0) {
        const key = getItemKey(productId, size, color);
        return {
          ...state,
          items: state.items.filter(
            (item) => getItemKey(item.product.id, item.selectedSize, item.selectedColor) !== key
          ),
        };
      }
      const key = getItemKey(productId, size, color);
      return {
        ...state,
        items: state.items.map((item) =>
          getItemKey(item.product.id, item.selectedSize, item.selectedColor) === key
            ? { ...item, quantity }
            : item
        ),
      };
    }

    case "CLEAR_CART":
      return { ...state, items: [] };

    case "OPEN_CART":
      return { ...state, isCartOpen: true };

    case "CLOSE_CART":
      return { ...state, isCartOpen: false };

    default:
      return state;
  }
}

function loadCartFromStorage(): CartItem[] {
  try {
    const stored = localStorage.getItem("maison-cart");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

interface CartContextType {
  items: CartItem[];
  cartCount: number;
  subtotal: number;
  isCartOpen: boolean;
  addItem: (product: Product, quantity?: number, size?: string, color?: string) => void;
  removeItem: (productId: string, size?: string, color?: string) => void;
  updateQuantity: (productId: string, quantity: number, size?: string, color?: string) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: loadCartFromStorage(),
    isCartOpen: false,
  });

  useEffect(() => {
    localStorage.setItem("maison-cart", JSON.stringify(state.items));
  }, [state.items]);

  const cartCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = state.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const addItem = useCallback(
    (product: Product, quantity = 1, size?: string, color?: string) => {
      dispatch({ type: "ADD_ITEM", payload: { product, quantity, size, color } });
    },
    []
  );

  const removeItem = useCallback((productId: string, size?: string, color?: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: { productId, size, color } });
  }, []);

  const updateQuantity = useCallback(
    (productId: string, quantity: number, size?: string, color?: string) => {
      dispatch({ type: "UPDATE_QUANTITY", payload: { productId, quantity, size, color } });
    },
    []
  );

  const clearCart = useCallback(() => dispatch({ type: "CLEAR_CART" }), []);
  const openCart = useCallback(() => dispatch({ type: "OPEN_CART" }), []);
  const closeCart = useCallback(() => dispatch({ type: "CLOSE_CART" }), []);

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        cartCount,
        subtotal,
        isCartOpen: state.isCartOpen,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
