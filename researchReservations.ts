import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { wixClient } from './src/lib/wixClient';

async function run() {
    try {
        console.log("Fetching Reservation Locations...");
        const locations = await wixClient.reservationLocations.queryReservationLocations().find();
        console.log("LOCATIONS:", JSON.stringify(locations.items, null, 2));

        if (locations.items.length > 0) {
            const locId = locations.items[0]._id;
            console.log("Using Location ID:", locId);

            console.log("TimeSlots Keys:", Object.keys(wixClient.timeSlots));
            console.log("Reservations Keys:", Object.keys(wixClient.reservations));
        }
    } catch (e) {
        console.error("ERROR:", e);
    }
}

run();
