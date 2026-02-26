'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useCartStore } from '@/store/useCartStore';

interface MenuItemCardProps {
    item: any;
    globalVariants?: any[];
    menuId?: string;
    sectionId?: string;
}

export default function MenuItemCard({ item, globalVariants = [], menuId, sectionId }: MenuItemCardProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const addItemIdToCart = useCartStore((state) => state.addItem);

    // We'll store the selected variant ID. Default to the active/visible variant or the first one.
    const itemVariants = item.priceVariants?.variants || [];
    const hasItemVariants = itemVariants.length > 0;

    const [selectedVariantId, setSelectedVariantId] = useState<string | null>(
        hasItemVariants ? itemVariants[0].variantId : null
    );

    const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (delta: number) => {
        setQuantity(prev => Math.max(1, prev + delta));
    };

    // Parse Image
    const imageUrl = item.image ? (typeof item.image === 'string' ? item.image : item.image.url) : null;
    const displayUrl = imageUrl?.startsWith('wix:image://')
        ? `https://static.wixstatic.com/media/${imageUrl.split('/')[3]}`
        : imageUrl;

    // Determine Price Display for the Card
    const hasModifiers = item.modifierGroups && item.modifierGroups.length > 0;

    let basePrice = item.priceInfo?.price ? parseFloat(item.priceInfo.price) : 0;
    let fallbackMinPrice = 0;

    if (basePrice === 0 && hasItemVariants) {
        // If there's no base price, calculate min price from variants
        const variantPrices = itemVariants.map((v: any) => parseFloat(v.price || 0));
        fallbackMinPrice = Math.min(...variantPrices);
        basePrice = fallbackMinPrice;
    }

    let displayPrice = 'Preis auf Anfrage';
    if (item.priceInfo?.formattedPrice && item.priceInfo.price > 0) {
        displayPrice = (hasModifiers || hasItemVariants) ? `Ab ${item.priceInfo.formattedPrice}` : item.priceInfo.formattedPrice;
    } else if (hasItemVariants && fallbackMinPrice > 0) {
        displayPrice = `Ab ${fallbackMinPrice.toFixed(2)}€`;
    }

    // Calculate current price in Modal based on selections and quantity
    const calculateCurrentPrice = () => {
        let price = basePrice;
        if (hasItemVariants && selectedVariantId) {
            const selectedVariant = itemVariants.find((v: any) => v.variantId === selectedVariantId);
            if (selectedVariant && selectedVariant.price) {
                price = parseFloat(selectedVariant.price);
            }
        }
        // modifiers logic would go here

        return (price * quantity).toFixed(2);
    };

    const currentPriceCalculated = parseFloat(calculateCurrentPrice());

    const handleAddToCart = () => {
        let selectedVariantName = '';

        if (hasItemVariants && selectedVariantId) {
            const variantObj = globalVariants.find(gv => gv._id === selectedVariantId);
            if (variantObj) {
                selectedVariantName = variantObj.name;
            }
        }

        addItemIdToCart({
            itemId: item._id,
            name: item.name?.en || item.name || 'Unbekanntes Gericht',
            price: currentPriceCalculated / quantity, // Base price per unit
            quantity: quantity,
            variantId: selectedVariantId || undefined,
            variantName: selectedVariantName || undefined,
            imageUrl: displayUrl || undefined,
            menuId,
            sectionId
        });

        // Close modal after adding
        setIsModalOpen(false);
        // Reset quantity
        setQuantity(1);
    };

    return (
        <>
            {/* Card */}
            <div
                className="group relative rounded-3xl overflow-hidden bg-white/5 border border-white/10 hover:border-orange-500/50 transition-all duration-300 cursor-pointer flex flex-col h-full"
                onClick={() => setIsModalOpen(true)}
            >
                <div className="h-64 w-full bg-zinc-900 relative overflow-hidden flex-shrink-0">
                    {displayUrl ? (
                        <img src={displayUrl} alt={item.name?.en || item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center opacity-20">
                            <span className="text-4xl text-white font-bold">MAMA AFRIKA</span>
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                        <h3 className="text-2xl font-bold tracking-wide text-white">{item.name?.en || item.name}</h3>
                        <span className="text-lg font-bold text-orange-500 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full whitespace-nowrap ml-2">
                            {displayPrice}
                        </span>
                    </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                    <p className="text-white/70 line-clamp-3 text-sm font-light leading-relaxed mb-6 flex-grow">
                        {item.description?.en || item.description || "Ein klassisches afrikanisches Gericht, frisch zubereitet."}
                    </p>

                    <button
                        className="w-full py-3 rounded-xl bg-white/10 group-hover:bg-orange-500 group-hover:text-black text-white font-bold transition-all border border-white/10 hover:border-transparent mt-auto"
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent duplicate modal opens
                            setIsModalOpen(true);
                        }}
                    >
                        Wählen & Hinzufügen
                    </button>
                </div>
            </div>

            {/* Modal Overlay */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
                        onClick={() => setIsModalOpen(false)}
                    ></div>

                    {/* Modal Content */}
                    <div className="relative bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
                        {/* Modal Header Image */}
                        <div className="h-48 sm:h-64 relative bg-black flex-shrink-0">
                            {displayUrl ? (
                                <img src={displayUrl} alt={item.name?.en || item.name} className="w-full h-full object-cover" />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                                    <span className="text-3xl text-white font-bold">MAMA AFRIKA</span>
                                </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent"></div>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-4 right-4 bg-black/50 hover:bg-black text-white rounded-full p-2 transition-colors backdrop-blur-md border border-white/10"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 pb-24 overflow-y-auto">
                            <h2 className="text-3xl font-bold text-white mb-2">{item.name?.en || item.name}</h2>
                            <p className="text-gray-400 mb-8">{item.description?.en || item.description}</p>

                            {/* Options / Variants */}
                            {hasItemVariants || hasModifiers ? (
                                <div className="space-y-6">
                                    {/* Handle Wix Variants (e.g. Size/Type) */}
                                    {hasItemVariants && (
                                        <div className="bg-black/50 p-5 rounded-2xl border border-white/5">
                                            <h4 className="text-lg font-semibold text-orange-500 mb-4">Größe/Art wählen <span className="text-gray-500 text-sm font-normal ml-2">Erforderlich</span></h4>
                                            <div className="space-y-3">
                                                {itemVariants.map((variantObj: any) => {
                                                    const mappedGlobalVariant = globalVariants.find(gv => gv._id === variantObj.variantId);
                                                    const varName = mappedGlobalVariant ? mappedGlobalVariant.name : 'Unbekannt';

                                                    return (
                                                        <label key={variantObj.variantId} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 cursor-pointer border border-transparent hover:border-white/10 transition-colors">
                                                            <div className="flex items-center">
                                                                <input
                                                                    type="radio"
                                                                    name="item-variant"
                                                                    className="w-5 h-5 text-orange-500 bg-zinc-950 border-gray-700 focus:ring-orange-500 focus:ring-offset-zinc-900"
                                                                    checked={selectedVariantId === variantObj.variantId}
                                                                    onChange={() => setSelectedVariantId(variantObj.variantId)}
                                                                />
                                                                <span className="ml-3 text-white">{varName}</span>
                                                            </div>
                                                            <span className="text-gray-400 text-sm">{variantObj.priceInfo?.formattedPrice || `${variantObj.price}€`}</span>
                                                        </label>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}

                                    {/* Wix Modifiers Placeholder (e.g. Extras) */}
                                    {hasModifiers && (
                                        <div className="bg-black/50 p-5 rounded-2xl border border-white/5">
                                            <h4 className="text-lg font-semibold text-orange-500 mb-4">Extras <span className="text-gray-500 text-sm font-normal ml-2">Optional</span></h4>
                                            <div className="space-y-3">
                                                {/* TODO: Modifiers not fully mapped inside items yet. We might need wixClient.modifierGroups logic here if we encounter real modifier data */}
                                                <p className="text-gray-400 text-sm p-3">Weitere Extras werden nachgeladen.</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="bg-black/50 p-6 rounded-2xl border border-white/5 text-center">
                                    <p className="text-gray-400">Keine weiteren Anpassungen für dieses Gericht verfügbar.</p>
                                </div>
                            )}
                        </div>

                        {/* Modal Footer (Sticky) */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-zinc-900/95 backdrop-blur-xl border-t border-white/10 flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                {/* Quantity Selector */}
                                <div className="flex items-center bg-black rounded-lg border border-white/10 px-2 py-1">
                                    <button
                                        className="text-gray-400 hover:text-white px-2 py-1 text-xl transition-colors"
                                        onClick={() => handleQuantityChange(-1)}
                                    >
                                        −
                                    </button>
                                    <span className="text-white font-semibold px-4">{quantity}</span>
                                    <button
                                        className="text-orange-500 hover:text-orange-400 px-2 py-1 text-xl transition-colors"
                                        onClick={() => handleQuantityChange(1)}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            <button
                                onClick={handleAddToCart}
                                className="flex-grow ml-4 bg-orange-500 hover:bg-orange-400 hover:shadow-[0_0_20px_rgba(249,115,22,0.4)] text-black font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg flex justify-between items-center group"
                            >
                                <span>In den Warenkorb</span>
                                <span className="bg-black/20 px-3 py-1 rounded-lg text-sm group-hover:bg-black/30 transition-colors">
                                    {calculateCurrentPrice()}€
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
