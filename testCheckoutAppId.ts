import { wixClient } from './src/lib/wixClient.ts';

const STORES_APP_ID = '1380b703-9e81-ff05-f970-24eb30944337';
const RESTAURANTS_APP_ID = '21118222-96ee-a059-923b-01057cf53f7a';

async function testCheckout(appId: string) {
    try {
        console.log(`\n--- Testing Checkout with App ID: ${appId} ---`);
        const itemsRes = await wixClient.items.queryItems().limit(1).find();
        if (itemsRes.items.length === 0) return console.log("No items found.");

        const item = itemsRes.items[0];
        console.log(`Using item: ${item.name} (${item._id})`);

        const checkoutRes = await wixClient.checkout.createCheckout({
            lineItems: [{
                quantity: 1,
                catalogReference: {
                    appId: appId,
                    catalogItemId: item._id
                }
            }],
            channelType: 'WEB'
        });

        console.log("Checkout created. ID:", checkoutRes?._id);
        console.log("Line Items in response:", checkoutRes?.lineItems?.length || 0);
        if (checkoutRes?.lineItems) {
            console.log("First line item details:", JSON.stringify(checkoutRes.lineItems[0], null, 2));
        }
    } catch (e: any) {
        console.error(`Error with ${appId}:`, e.message);
    }
}

async function run() {
    await testCheckout(STORES_APP_ID);
    await testCheckout(RESTAURANTS_APP_ID);
}

run();
