'use server';

import { wixClient } from '@/lib/wixClient';

const RESTAURANTS_APP_ID = '1380b703-9e81-ff05-f970-24eb30944337';

export async function createCheckout(items: any[]) {
    try {
        console.log("Creating checkout for items:", items.length);

        // 1. Format items for Wix Checkout
        const lineItems = items.map(item => ({
            quantity: item.quantity,
            catalogReference: {
                appId: RESTAURANTS_APP_ID,
                catalogItemId: item.variantId || item.itemId, // Use variant if exists, else base item
            }
        }));

        // 2. Create the checkout
        const checkoutRes = await wixClient.checkout.createCheckout({
            lineItems,
            channelType: 'WEB'
        });

        const checkoutId = checkoutRes?._id;
        if (!checkoutId) throw new Error("Failed to create checkout ID");

        // 3. Create a redirect session to the Wix-managed checkout page
        const { redirectSession } = await wixClient.redirects.createRedirectSession({
            ecomCheckout: { checkoutId },
            callbacks: {
                postFlowUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/order-confirmation`
            }
        });

        if (!redirectSession?.fullUrl) throw new Error("Failed to generate redirect URL");

        return { url: redirectSession.fullUrl };
    } catch (error: any) {
        console.error("Checkout Error:", error);
        return { error: error.message || "An error occurred during checkout" };
    }
}
