import { wixClient } from './src/lib/wixClient';

async function run() {
    try {
        const itemsRes = await wixClient.items.queryItems().find();
        const item = itemsRes.items[0];
        console.log("ITEM FOR CHECKOUT:", JSON.stringify({
            id: item._id,
            name: item.name,
            // Check for potential catalog reference or app context
        }, null, 2));

        // Let's see if we can discover the appId from the item or catalog
        // Often it's in a hidden field or we can guess based on the module
    } catch (e) {
        console.error(e);
    }
}

run();
