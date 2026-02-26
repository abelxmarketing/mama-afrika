import { wixClient } from './src/lib/wixClient.ts';

async function run() {
    try {
        console.log("Fetching menus to find hints...");
        const menusRes = await wixClient.menus.queryMenus().limit(1).find();
        console.log("MENU OBJECT:", JSON.stringify(menusRes.items[0], null, 2));

        console.log("\nFetching sections to find hints...");
        const sectionsRes = await wixClient.sections.querySections().limit(1).find();
        console.log("SECTION OBJECT:", JSON.stringify(sectionsRes.items[0], null, 2));
    } catch (e: any) {
        console.error("Error:", e);
    }
}

run();
