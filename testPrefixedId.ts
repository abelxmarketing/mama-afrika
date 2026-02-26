import { wixClient } from './src/lib/wixClient.ts';

const STORES_APP_ID = '1380b703-9e81-ff05-f970-24eb30944337';

async function run() {
    try {
        const itemsRes = await wixClient.items.queryItems().limit(1).find();
        const item = itemsRes.items[0];
        const prefixedId = `item:${item._id}`;

        console.log(`Testing with Prefixed ID: ${prefixedId} and Stores App ID`);
        const checkoutRes = await wixClient.checkout.createCheckout({
            lineItems: [{
                quantity: 1,
                catalogReference: {
                    appId: STORES_APP_ID,
                    catalogItemId: prefixedId
                }
            }],
            channelType: 'WEB'
        });

        console.log("Items in response:", checkoutRes.lineItems?.length || 0);
        if (checkoutRes.lineItems?.length > 0) {
            console.log("SUCCESS! Prefixed ID was the key.");
        }
    } catch (e: any) {
        console.error("Error:", e.details || e.message);
    }
}

run();
