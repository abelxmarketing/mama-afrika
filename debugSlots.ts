
import { wixClient } from './src/lib/wixClient';

async function debugSlots() {
    try {
        const locations = await wixClient.reservationLocations.queryReservationLocations().find();
        const locId = locations.items[0]?._id;
        if (!locId) {
            console.log("No location found");
            return;
        }
        console.log("Location ID:", locId);

        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);

        console.log("Fetching slots for:", tomorrow.toISOString());

        const slotsRes = await wixClient.timeSlots.getTimeSlots(locId, tomorrow, 2);
        console.log("Total slots found:", slotsRes.timeSlots?.length);

        if (slotsRes.timeSlots && slotsRes.timeSlots.length > 0) {
            console.log("First slot sample:", JSON.stringify(slotsRes.timeSlots[0], null, 2));
            console.log("Last slot sample:", JSON.stringify(slotsRes.timeSlots[slotsRes.timeSlots.length - 1], null, 2));
        }
    } catch (error) {
        console.error("Debug Error:", error);
    }
}

debugSlots();
