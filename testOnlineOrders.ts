import { wixClient } from './src/lib/wixClient.ts';

async function run() {
    try {
        console.log("Checking for onlineOrders module...");
        // @ts-ignore
        if (wixClient.onlineOrders) {
            console.log("onlineOrders module found!");
            // @ts-ignore
            console.log("Methods available:", Object.keys(wixClient.onlineOrders));
        } else {
            console.log("onlineOrders module NOT found.");
        }
    } catch (e: any) {
        console.error("Error:", e);
    }
}

run();
