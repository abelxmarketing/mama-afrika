import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-[#050505] border-t border-white/5 pt-16 pb-8 text-white/50 text-sm" aria-label="Footer">
            <div className="max-w-7xl mx-auto px-6">

                {/* Footer Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">

                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <h2 className="text-2xl font-bold tracking-widest text-white mb-3">
                            MAMA <span className="text-[var(--color-accent)]">AFRIKA</span>
                        </h2>
                        <p className="text-white/50 max-w-sm leading-relaxed mb-5">
                            Afrikanisches Restaurant in Hamburg – authentische westafrikanische Küche, herzliche Gastfreundschaft und unvergessliche Aromen seit 2018.
                        </p>
                        <div className="flex gap-3">
                            {/* Instagram */}
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                            </a>
                            {/* Facebook */}
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h3 className="text-white font-bold mb-4 uppercase tracking-widest text-xs">Navigation</h3>
                        <ul className="space-y-3">
                            <li><Link href="/" className="hover:text-white transition-colors">Startseite</Link></li>
                            <li><Link href="/menu" className="hover:text-white transition-colors">Speisekarte</Link></li>
                            <li><Link href="/reservations" className="hover:text-white transition-colors">Tisch reservieren</Link></li>
                            <li><Link href="/#ueber-uns" className="hover:text-white transition-colors">Über uns</Link></li>
                            <li><Link href="/#faq" className="hover:text-white transition-colors">FAQ</Link></li>
                            <li><Link href="/contact" className="hover:text-white transition-colors">Kontakt</Link></li>
                        </ul>
                    </div>

                    {/* Kontakt & Infos */}
                    <div>
                        <h3 className="text-white font-bold mb-4 uppercase tracking-widest text-xs">Kontakt & Infos</h3>
                        <ul className="space-y-3">
                            <li>
                                <address className="not-italic">
                                    Musterstraße 123<br />
                                    20099 Hamburg
                                </address>
                            </li>
                            <li><a href="tel:+494012345678" className="hover:text-white transition-colors">+49 40 123 456789</a></li>
                            <li><a href="mailto:info@mama-afrika.de" className="hover:text-white transition-colors">info@mama-afrika.de</a></li>
                            <li className="pt-2">
                                <strong className="text-white/70">Öffnungszeiten</strong><br />
                                Di – So: 12:00 – 22:00 Uhr<br />
                                Mo: Ruhetag
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p>&copy; {new Date().getFullYear()} Mama Afrika Hamburg. Alle Rechte vorbehalten.</p>
                    <p className="text-white/30 text-xs">
                        Afrikanisches Restaurant Hamburg | Westafrikanische Küche | Jollof Rice Hamburg
                    </p>
                </div>
            </div>
        </footer>
    );
}
