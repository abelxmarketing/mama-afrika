import { wixClient } from './src/lib/wixClient.ts';

const RESTAURANTS_APP_ID = '21118222-96ee-a059-923b-01057cf53f7a';

async function run() {
    try {
        console.log(`\n--- Testing Add to Cart Flow ---`);
        const itemsRes = await wixClient.items.queryItems().limit(1).find();
        const item = itemsRes.items[0];

        console.log("Adding to cart...");
        const cartRes = await wixClient.currentCart.addToCurrentCart({
            lineItems: [{
                quantity: 1,
                catalogReference: {
                    appId: RESTAURANTS_APP_ID,
                    catalogItemId: item._id
                }
            }]
        });

        console.log("Cart created/updated. Items:", cartRes.lineItems.length);
        if (cartRes.lineItems.length > 0) {
            console.log("Creating checkout from cart...");
            const checkoutRes = await wixClient.currentCart.createCheckoutFromCurrentCart({
                channelType: 'WEB'
            });
            console.log("Checkout ID:", checkoutRes.checkout?._id);
            console.log("Line Items in checkout:", checkoutRes.checkout?.lineItems?.length);
        }
    } catch (e: any) {
        console.error(`Error:`, e.details || e.message);
    }
}

run();
