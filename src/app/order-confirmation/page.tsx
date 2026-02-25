'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/store/useCartStore';

export default function OrderConfirmationPage() {
    const { clearCart } = useCartStore();

    useEffect(() => {
        // Clear the cart when the user lands on the success page
        clearCart();
    }, [clearCart]);

    return (
        <main className="min-h-screen bg-black text-white flex items-center justify-center px-6 pt-32 pb-24">
            <div className="max-w-2xl w-full text-center space-y-8 animate-in fade-in zoom-in duration-700">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-orange-500/20 text-orange-500 mb-4 shadow-[0_0_50px_rgba(249,115,22,0.2)]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                </div>

                <div className="space-y-4">
                    <h1 className="text-5xl md:text-6xl font-black tracking-tight uppercase">Vielen <span className="text-orange-500">Dank!</span></h1>
                    <p className="text-xl text-white/70 font-light max-w-lg mx-auto leading-relaxed">
                        Deine Bestellung bei <span className="text-white font-bold">Mama Afrika</span> ist eingegangen und wird nun mit Liebe vorbereitet.
                    </p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm space-y-6">
                    <p className="text-sm text-white/50 uppercase tracking-[0.2em]">Was passiert als nächstes?</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                        <div className="space-y-2">
                            <div className="text-orange-500 font-bold">Bestätigung</div>
                            <p className="text-white/60">Du erhältst in Kürze eine E-Mail mit allen Details deiner Bestellung.</p>
                        </div>
                        <div className="space-y-2 border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6">
                            <div className="text-orange-500 font-bold">Zubereitung</div>
                            <p className="text-white/60">Unsere Köche fangen sofort an, deine authentischen Speisen frisch zuzubereiten.</p>
                        </div>
                        <div className="space-y-2 border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6">
                            <div className="text-orange-500 font-bold">Guten Appetit</div>
                            <p className="text-white/60">Deine Bestellung ist bald bereit für dich. Wir freuen uns auf deinen Besuch/deine Lieferung!</p>
                        </div>
                    </div>
                </div>

                <div className="pt-8">
                    <Link
                        href="/menu"
                        className="inline-flex items-center justify-center px-12 py-4 bg-orange-500 text-black font-black text-lg rounded-2xl hover:bg-orange-400 transition-all shadow-xl hover:shadow-orange-500/20 group"
                    >
                        Zurück zum Menü
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:-translate-x-1 transition-transform rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </Link>
                </div>

                <p className="text-white/30 text-xs pt-8">
                    Bei Fragen erreichst du uns jederzeit telefonisch oder über unser Kontaktformular.
                </p>
            </div>
        </main>
    );
}
