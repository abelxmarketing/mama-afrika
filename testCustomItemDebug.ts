import { wixClient } from './src/lib/wixClient.ts';

async function run() {
    try {
        const checkoutRes = await wixClient.checkout.createCheckout({
            lineItems: [{
                quantity: 1,
                productName: { original: "Test Gericht" },
                price: { amount: "10.00" }
            }],
            channelType: 'WEB'
        });
        console.log("Success:", checkoutRes._id);
    } catch (e: any) {
        console.error(JSON.stringify(e, null, 2));
    }
}

run();
