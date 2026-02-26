import { wixClient } from './src/lib/wixClient.ts';

async function run() {
    try {
        console.log("Fetching catalogs to find correct App ID...");
        // In some versions of the SDK, you can query catalogs
        // But let's try to just query one item and check all its properties again
        const itemsRes = await wixClient.items.queryItems().limit(1).find();
        const item = itemsRes.items[0];
        console.log("FULL ITEM OBJECT:", JSON.stringify(item, null, 2));

        // Let's also try to create a checkout with a slightly different structure
        // Some users report that 'catalogId' is needed instead of 'appId'? (Unlikely)

    } catch (e: any) {
        console.error("Error:", e);
    }
}

run();
