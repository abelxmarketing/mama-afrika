import { wixClient } from './src/lib/wixClient.ts';

const RESTAURANTS_APP_ID = '21118222-96ee-a059-923b-01057cf53f7a';

async function run() {
    try {
        const itemsRes = await wixClient.items.queryItems().limit(1).find();
        const item = itemsRes.items[0];

        const testCases = [
            { name: "Base ID only", ref: { appId: RESTAURANTS_APP_ID, catalogItemId: item._id } },
            { name: "With empty options", ref: { appId: RESTAURANTS_APP_ID, catalogItemId: item._id, options: {} } },
            { name: "With variantId null", ref: { appId: RESTAURANTS_APP_ID, catalogItemId: item._id, options: { variantId: null } } },
            { name: "As custom item with appId", ref: { appId: RESTAURANTS_APP_ID, catalogItemId: item._id }, extra: { productName: { original: item.name }, price: { amount: "7.50" } } }
        ];

        for (const tc of testCases) {
            console.log(`\n--- Testing: ${tc.name} ---`);
            const checkoutRes = await wixClient.checkout.createCheckout({
                lineItems: [{
                    quantity: 1,
                    catalogReference: tc.ref,
                    ...(tc.extra || {})
                }],
                channelType: 'WEB'
            });
            console.log("Items in response:", checkoutRes.lineItems?.length || 0);
        }
    } catch (e: any) {
        console.error("Error encountered.");
    }
}

run();
