import { wixClient } from './src/lib/wixClient.ts';

const RESTAURANTS_EXAMPLE_APP_ID = '898436cd-ee03-c0d1-f3b1-a64731a547a4';

async function run() {
    try {
        console.log(`\n--- Testing Checkout with App ID (Restaurant Example): ${RESTAURANTS_EXAMPLE_APP_ID} ---`);
        const itemsRes = await wixClient.items.queryItems().limit(1).find();
        const item = itemsRes.items[0];

        const checkoutRes = await wixClient.checkout.createCheckout({
            lineItems: [{
                quantity: 1,
                catalogReference: {
                    appId: RESTAURANTS_EXAMPLE_APP_ID,
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
