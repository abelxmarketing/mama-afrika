import { wixClient } from './src/lib/wixClient.ts';

const RESTAURANTS_APP_ID = '21118222-96ee-a059-923b-01057cf53f7a';

async function run() {
    try {
        const itemsRes = await wixClient.items.queryItems().limit(1).find();
        const item = itemsRes.items[0];

        // Let's test if providing the price or metadata helps
        const checkoutRes = await wixClient.checkout.createCheckout({
            lineItems: [{
                quantity: 1,
                catalogReference: {
                    appId: RESTAURANTS_APP_ID,
                    catalogItemId: item._id,
                    // Some apps require options even if empty
                    options: {}
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
