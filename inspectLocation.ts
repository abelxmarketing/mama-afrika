
import { wixClient } from './src/lib/wixClient';

async function inspectLocation() {
    try {
        const locations = await wixClient.reservationLocations.queryReservationLocations().find();
        console.log("FULL LOCATIONS DATA:");
        console.log(JSON.stringify(locations.items, null, 2));
    } catch (error) {
        console.error("Inspection Error:", error);
    }
}

inspectLocation();
