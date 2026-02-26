import { wixClient } from './src/lib/wixClient.ts';

async function run() {
    try {
        console.log("Testing Custom Line Item (no catalog reference)...");
        const checkoutRes = await wixClient.checkout.createCheckout({
            lineItems: [{
                quantity: 1,
                productName: { original: "Test Gericht" },
                price: { amount: "10.00" }
            }],
            channelType: 'WEB'
        });

        console.log("Checkout created. ID:", checkoutRes?._id);
        console.log("Line Items in response:", checkoutRes?.lineItems?.length || 0);
        if (checkoutRes?.lineItems?.length > 0) {
            console.log("SUCCESS! Custom item works.");
        }
    } catch (e: any) {
        console.error(`Error:`, e.details || e.message);
    }
}

run();
