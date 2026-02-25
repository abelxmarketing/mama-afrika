import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
    id: string;          // Unique ID for this cart entry (can be generated)
    itemId: string;      // Wix Item ID
    name: string;        // Name of the dish
    price: number;       // Price per unit (including selected variants)
    quantity: number;    // Selected quantity
    variantId?: string;  // The ID of the selected variant (if any)
    variantName?: string;// Display name of the selected variant (e.g. "Huhn")
    imageUrl?: string;   // Image URL for the cart display
}

interface CartStore {
    items: CartItem[];
    isOpen: boolean;
    addItem: (item: Omit<CartItem, 'id'>) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    toggleCart: () => void;
    setCartOpen: (isOpen: boolean) => void;
    getTotalPrice: () => number;
    getTotalItems: () => number;
}

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],
            isOpen: false,

            addItem: (newItem) => {
                set((state) => {
                    // Check if exactly the same item & variant is already in cart
                    const existingItemIndex = state.items.findIndex(
                        (i) => i.itemId === newItem.itemId && i.variantId === newItem.variantId
                    );

                    if (existingItemIndex > -1) {
                        // Increase quantity
                        const updatedItems = [...state.items];
                        updatedItems[existingItemIndex].quantity += newItem.quantity;
                        return { items: updatedItems, isOpen: true }; // Open cart when added
                    }

                    // Generate a local unique ID (combining item + variant + timestamp)
                    const newCartItem = {
                        ...newItem,
                        id: `${newItem.itemId}-${newItem.variantId || 'base'}-${Date.now()}`,
                    };

                    return { items: [...state.items, newCartItem], isOpen: true }; // Open cart when added
                });
            },

            removeItem: (id) => {
                set((state) => ({
                    items: state.items.filter((item) => item.id !== id),
                }));
            },

            updateQuantity: (id, quantity) => {
                set((state) => ({
                    items: state.items.map((item) =>
                        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
                    ),
                }));
            },

            clearCart: () => set({ items: [] }),

            toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

            setCartOpen: (isOpen) => set({ isOpen }),

            getTotalPrice: () => {
                return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
            },

            getTotalItems: () => {
                return get().items.reduce((total, item) => total + item.quantity, 0);
            },
        }),
        {
            name: 'mama-afrika-cart', // Unique name for local storage
        }
    )
);
