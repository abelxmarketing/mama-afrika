import { wixClient } from './src/lib/wixClient.ts';

async function run() {
    try {
        console.log("Fetching items to check structure...");
        const itemsRes = await wixClient.items.queryItems().limit(1).find();
        if (itemsRes.items.length === 0) {
            console.log("No items found.");
            return;
        }
        const item = itemsRes.items[0];
        console.log("ITEM FOR CHECKOUT:", JSON.stringify(item, null, 2));
    } catch (e) {
        console.error("Error:", e);
    }
}

run();
