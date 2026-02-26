import { wixClient } from './src/lib/wixClient.ts';

const POTENTIAL_APP_ID = '215238eb-22a5-4c36-9e7b-e7c08025e04e';

async function run() {
    try {
        console.log(`\n--- Testing Checkout with POTENTIAL App ID: ${POTENTIAL_APP_ID} ---`);
        const itemsRes = await wixClient.items.queryItems().limit(1).find();
        const item = itemsRes.items[0];

        const checkoutRes = await wixClient.checkout.createCheckout({
            lineItems: [{
                quantity: 1,
                catalogReference: {
                    appId: POTENTIAL_APP_ID,
                    catalogItemId: item._id
                }
            }],
            channelType: 'WEB'
        });

        console.log("Checkout created. ID:", checkoutRes?._id);
        console.log("Line Items in response:", checkoutRes?.lineItems?.length || 0);
    } catch (e: any) {
        console.error(`Error:`, e.details || e.message);
    }
}

run();
