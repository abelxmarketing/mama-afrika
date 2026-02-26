import { wixClient } from './src/lib/wixClient.ts';

const RESTAURANTS_NEW_APP_ID = '9187372c-96ee-aebb-b733-01057cf53f7a';

async function run() {
    try {
        console.log(`\n--- Testing Checkout with App ID (Restaurants New): ${RESTAURANTS_NEW_APP_ID} ---`);
        const itemsRes = await wixClient.items.queryItems().limit(1).find();
        const item = itemsRes.items[0];

        const checkoutRes = await wixClient.checkout.createCheckout({
            lineItems: [{
                quantity: 1,
                catalogReference: {
                    appId: RESTAURANTS_NEW_APP_ID,
                    catalogItemId: item._id
                }
            }],
            channelType: 'WEB'
        });

        console.log("Checkout created. ID:", checkoutRes?._id);
        console.log("Line Items in response:", checkoutRes?.lineItems?.length || 0);
    } catch (e: any) {
        console.error(`Error:`, e.message);
    }
}

run();
