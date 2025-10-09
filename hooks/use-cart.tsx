import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { CartItem, Product } from '@/constants/types';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getItemQuantity: (productId: string) => number;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const getItemIndex = useCallback((productId: string) => 
    items.findIndex(item => item.id === productId)
  , [items]);

  const addToCart = useCallback((product: Product) => {
    setItems(prevItems => {
      const itemIndex = getItemIndex(product.id);
      
      if (itemIndex > -1) {
        // Item exists, update quantity
        const newItems = [...prevItems];
        newItems[itemIndex] = {
          ...newItems[itemIndex],
          quantity: newItems[itemIndex].quantity + 1
        };
        return newItems;
      }
      
      // Add new item with quantity 1
      return [...prevItems, { ...product, quantity: 1 }];
    });
  }, [getItemIndex]);

  const removeFromCart = useCallback((productId: string) => {
    setItems(prevItems => {
      const itemIndex = getItemIndex(productId);
      
      if (itemIndex > -1) {
        if (prevItems[itemIndex].quantity > 1) {
          // Decrease quantity if more than 1
          const newItems = [...prevItems];
          newItems[itemIndex] = {
            ...newItems[itemIndex],
            quantity: newItems[itemIndex].quantity - 1
          };
          return newItems;
        }
        // Remove item if quantity is 1
        return prevItems.filter(item => item.id !== productId);
      }
      
      return prevItems;
    });
  }, [getItemIndex]);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const getCartTotal = useCallback(() => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }, [items]);

  const getItemQuantity = useCallback((productId: string) => {
    const item = items.find(item => item.id === productId);
    return item ? item.quantity : 0;
  }, [items]);

  return (
    <CartContext.Provider 
      value={{
        items,
        addToCart,
        removeFromCart,
        clearCart,
        getCartTotal,
        getItemQuantity
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
