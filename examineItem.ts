import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { wixClient } from './src/lib/wixClient';

async function run() {
    try {
        console.log("CLIENT ID:", process.env.NEXT_PUBLIC_WIX_CLIENT_ID);
        const itemsRes = await wixClient.items.queryItems().limit(1).find();
        if (itemsRes.items.length > 0) {
            const item = itemsRes.items[0];
            console.log("FULL ITEM DATA:", JSON.stringify(item, null, 2));
        } else {
            console.log("No items found.");
        }
    } catch (e) {
        console.error("ERROR FETCHING ITEM:", e);
    }
}

run();
