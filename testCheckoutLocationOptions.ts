import { wixClient } from './src/lib/wixClient.ts';

const RESTAURANTS_APP_ID = '21118222-96ee-a059-923b-01057cf53f7a';
const LOCATION_ID = '5597524c-3b09-4837-be0c-f9d77c7e174d';

async function run() {
    try {
        const itemsRes = await wixClient.items.queryItems().limit(1).find();
        const item = itemsRes.items[0];

        console.log(`Testing with Location ID in OPTIONS...`);
        const checkoutRes = await wixClient.checkout.createCheckout({
            lineItems: [{
                quantity: 1,
                catalogReference: {
                    appId: RESTAURANTS_APP_ID,
                    catalogItemId: item._id,
                    options: {
                        locationId: LOCATION_ID
                    }
                }
            }],
            channelType: 'WEB'
        });

        console.log("Items in response:", checkoutRes.lineItems?.length || 0);
        if (checkoutRes.lineItems?.length > 0) {
            console.log("SUCCESS! locationId in options was the key.");
        }
    } catch (e: any) {
        console.error("Error:", e.details || e.message);
    }
}

run();
