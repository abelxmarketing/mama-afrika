import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { wixClient } from './src/lib/wixClient';

async function run() {
    try {
        console.log("Fetching Reservation Locations...");
        const res = await wixClient.reservationLocations.queryReservationLocations().find();
        console.log("FULL LOCATIONS DATA:", JSON.stringify(res.items, null, 2));

        if (res.items.length > 0) {
            const loc = res.items[0];
            console.log("ID:", loc._id);
            // Check for other ID fields
            console.log("KEYS:", Object.keys(loc));
        }
    } catch (e) {
        console.error("ERROR:", e);
    }
}

run();
