import { wixClient } from './src/lib/wixClient.ts';

const RESTAURANTS_NEW_ORDER_APP_ID = '9a5d83fd-8570-482e-81ab-cfa88942ee60';

async function run() {
    try {
        console.log("Fetching menu structure to get IDs...");
        const menusRes = await wixClient.menus.queryMenus().limit(1).find();
        const menu = menusRes.items[0];
        const sectionId = menu.sectionIds[0];

        const itemsRes = await wixClient.items.queryItems().limit(1).find();
        const item = itemsRes.items[0];

        console.log(`Using Menu: ${menu._id}, Section: ${sectionId}, Item: ${item._id}`);

        const checkoutRes = await wixClient.checkout.createCheckout({
            lineItems: [{
                quantity: 1,
                catalogReference: {
                    appId: RESTAURANTS_NEW_ORDER_APP_ID,
                    catalogItemId: item._id,
                    options: {
                        menuId: menu._id,
                        sectionId: sectionId
                    }
                }
            }],
            channelType: 'WEB'
        });

        console.log("Checkout created. ID:", checkoutRes?._id);
        console.log("Line Items in response:", checkoutRes?.lineItems?.length || 0);
        if (checkoutRes.lineItems?.length > 0) {
            console.log("SUCCESS! This structure works.");
        }
    } catch (e: any) {
        console.error("Error:", e.details || e.message);
    }
}

run();
