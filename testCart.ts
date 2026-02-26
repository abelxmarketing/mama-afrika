import { wixClient } from './src/lib/wixClient.ts';

const RESTAURANTS_APP_ID = '21118222-96ee-a059-923b-01057cf53f7a';

async function testAddToCart() {
    try {
        console.log(`\n--- Testing Add to Cart with Wix Restaurants ---`);
        const itemsRes = await wixClient.items.queryItems().limit(1).find();
        if (itemsRes.items.length === 0) return console.log("No items found.");

        const item = itemsRes.items[0];
        console.log(`Using item: ${item.name} (${item._id})`);

        // Note: For headless carts, you often need the ecom module's currentCart
        // But wixClient must have 'currentCart' from '@wix/ecom'

        // Let's try to see if ecom has a cart method we can use
        // In our wixClient.ts we only imported { checkout }

        // Wait, if I use createCheckout directly, it might be that I need a different catalogItemId.
        // Some Wix apps use 'catalogItemId' as a string "appId:itemId"
    } catch (e: any) {
        console.error(`Error:`, e.message);
    }
}

run();
