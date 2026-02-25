'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/store/useCartStore';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toggleCart, getTotalItems } = useCartStore();
  const cartItemCount = getTotalItems();

  return (
    <header className="fixed w-full top-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold tracking-wider text-white">
          MAMA <span className="text-orange-500">AFRIKA</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8">
          <Link href="/" className="text-sm font-medium text-white/80 hover:text-white transition-colors">Home</Link>
          <Link href="/menu" className="text-sm font-medium text-white/80 hover:text-white transition-colors">Menu</Link>
          <Link href="/reservations" className="text-sm font-medium text-white/80 hover:text-white transition-colors">Reservations</Link>
          <Link href="/contact" className="text-sm font-medium text-white/80 hover:text-white transition-colors">Contact</Link>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          {/* Cart Icon */}
          <button
            onClick={toggleCart}
            className="relative p-2 text-white/80 hover:text-orange-500 transition-colors group"
            aria-label="Open Cart"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-orange-500 text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                {cartItemCount}
              </span>
            )}
          </button>

          {/* Desktop RSVP Button */}
          <Link
            href="/reservations"
            className="hidden md:flex items-center justify-center px-6 py-2 bg-orange-500 text-black font-bold text-sm rounded-full hover:bg-orange-400 transition-all shadow-lg hover:shadow-orange-500/20"
          >
            Tisch Reservieren
          </Link>

          {/* Hamburger Menu Toggle */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Mesh Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-black border-b border-white/10 animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col p-6 space-y-4">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-medium text-white hover:text-orange-500 transition-colors border-b border-white/5 pb-2">Home</Link>
            <Link href="/menu" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-medium text-white hover:text-orange-500 transition-colors border-b border-white/5 pb-2">Menu</Link>
            <Link href="/reservations" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-medium text-white hover:text-orange-500 transition-colors border-b border-white/5 pb-2">Reservations</Link>
            <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-medium text-white hover:text-orange-500 transition-colors border-b border-white/5 pb-2">Contact</Link>
            <Link
              href="/reservations"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-4 w-full py-4 bg-orange-500 text-black font-bold rounded-xl text-center shadow-lg"
            >
              Tisch Reservieren
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
