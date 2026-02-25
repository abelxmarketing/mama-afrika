'use client';

import { useCartStore } from '@/store/useCartStore';
import { useEffect, useState } from 'react';
import { createCheckout } from '@/app/actions/checkout';

export default function CartSidebar() {
    const { items, isOpen, setCartOpen, removeItem, updateQuantity, getTotalPrice } = useCartStore();
    const [isMounted, setIsMounted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Avoid hydration mismatch
    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleCheckout = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await createCheckout(items);
            if (result.url) {
                window.location.href = result.url;
            } else if (result.error) {
                setError(result.error);
            }
        } catch (err) {
            setError("Ein unerwarteter Fehler ist aufgetreten.");
        } finally {
            setIsLoading(false);
        }
    };

    if (!isMounted) return null;

    return (
        <>
            {/* Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] transition-opacity animate-in fade-in duration-300"
                    onClick={() => setCartOpen(false)}
                />
            )}

            {/* Sidebar Panel */}
            <div
                className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-zinc-950 z-[101] shadow-2xl transform transition-transform duration-500 ease-in-out border-l border-white/10 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                {/* Header */}
                <div className="p-6 border-b border-white/10 flex items-center justify-between bg-zinc-900/50">
                    <h2 className="text-2xl font-bold text-white flex items-center">
                        Warenkorb
                        <span className="ml-3 px-2 py-0.5 bg-orange-500 text-black text-xs font-black rounded-full uppercase tracking-tighter">
                            {items.length}
                        </span>
                    </h2>
                    <button
                        onClick={() => setCartOpen(false)}
                        className="p-2 text-white/50 hover:text-white transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Cart Items List */}
                <div className="flex-grow overflow-y-auto p-6 space-y-6">
                    {items.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-40">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            <p className="text-lg">Dein Warenkorb ist leer.</p>
                            <button
                                onClick={() => setCartOpen(false)}
                                className="text-orange-500 font-bold hover:underline"
                            >
                                Jetzt etwas leckeres finden
                            </button>
                        </div>
                    ) : (
                        items.map((item) => (
                            <div key={item.id} className="flex gap-4 group">
                                {/* Item Image */}
                                <div className="h-20 w-20 bg-zinc-900 rounded-xl overflow-hidden flex-shrink-0 border border-white/5">
                                    {item.imageUrl ? (
                                        <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-[10px] font-bold opacity-30">MAMA</div>
                                    )}
                                </div>

                                {/* Details */}
                                <div className="flex-grow">
                                    <div className="flex justify-between items-start mb-1">
                                        <h3 className="text-white font-bold leading-tight">{item.name}</h3>
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="text-white/30 hover:text-red-500 transition-colors p-1"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                    {item.variantName && (
                                        <p className="text-orange-500/80 text-xs font-semibold mb-2">{item.variantName}</p>
                                    )}

                                    <div className="flex items-center justify-between mt-auto">
                                        {/* Quantity Selector */}
                                        <div className="flex items-center bg-black rounded-lg border border-white/10 px-1 py-0.5">
                                            <button
                                                className="text-white/40 hover:text-white px-2 transition-colors"
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            >
                                                −
                                            </button>
                                            <span className="text-white text-sm font-bold min-w-[20px] text-center">{item.quantity}</span>
                                            <button
                                                className="text-orange-500 hover:text-orange-400 px-2 transition-colors font-bold"
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            >
                                                +
                                            </button>
                                        </div>
                                        <span className="text-white font-bold">{(item.price * item.quantity).toFixed(2)}€</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer with Subtotal & Checkout */}
                {items.length > 0 && (
                    <div className="p-6 bg-zinc-900 border-t border-white/10 space-y-4">
                        <div className="space-y-2">
                            <div className="flex justify-between text-white/60 text-sm">
                                <span>Zwischensumme</span>
                                <span>{getTotalPrice().toFixed(2)}€</span>
                            </div>
                            <div className="flex justify-between text-white/60 text-sm">
                                <span>Steuern & Gebühren</span>
                                <span className="text-[10px] uppercase tracking-widest bg-zinc-800 px-2 rounded">Berechnet im Checkout</span>
                            </div>
                            <div className="flex justify-between text-white text-xl font-black border-t border-white/5 pt-4 mt-2">
                                <span>Gesamt</span>
                                <span className="text-orange-500">{getTotalPrice().toFixed(2)}€</span>
                            </div>
                        </div>

                        {error && (
                            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-xs text-center animate-shake">
                                {error}
                            </div>
                        )}

                        <button
                            onClick={handleCheckout}
                            disabled={isLoading}
                            className={`w-full bg-orange-500 hover:bg-orange-400 text-black font-black py-4 rounded-2xl transition-all shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-orange-500/50 group flex justify-between items-center px-8 text-lg ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            <span>{isLoading ? 'Verarbeite...' : 'Zur Kasse'}</span>
                            {!isLoading && (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            )}
                        </button>
                        <p className="text-[10px] text-white/30 text-center uppercase tracking-widest">Sicherer Checkout powered by Wix</p>
                    </div>
                )}
            </div>
        </>
    );
}
