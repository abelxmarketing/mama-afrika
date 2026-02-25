'use server';

import { wixClient } from '@/lib/wixClient';

/**
 * Fetch the first available reservation location ID.
 */
export async function getReservationLocationId() {
    try {
        const locations = await wixClient.reservationLocations.queryReservationLocations().find();
        return locations.items[0]?._id;
    } catch (error) {
        console.error("Error fetching reservation location:", error);
        return null;
    }
}

/**
 * Fetch available time slots for a specific date and party size.
 * Targets daytime slots (noon UTC) and filters for AVAILABLE status.
 */
export async function getAvailableSlots(dateString: string, partySize: number) {
    try {
        const reservationLocationId = await getReservationLocationId();
        if (!reservationLocationId) throw new Error("No reservation location found");

        // Set search to noon of the target day to ensure the API returns daytime slots
        const searchDate = new Date(dateString);
        searchDate.setHours(12, 0, 0, 0);

        const slotsRes = await wixClient.timeSlots.getTimeSlots(
            reservationLocationId,
            searchDate,
            partySize,
            { slotsAfter: 20, slotsBefore: 20 } as any
        );

        const allSlots = slotsRes.timeSlots || [];

        // Filter for AVAILABLE status only to exclude non-working hours or unavailable slots
        const availableSlots = allSlots.filter((slot: any) => slot.status === 'AVAILABLE');

        return { slots: availableSlots };
    } catch (error: any) {
        console.error("Error fetching available slots:", error);
        return { error: error.message || "Fehler beim Abrufen der Verfügbarkeit" };
    }
}

/**
 * Create a new table reservation using the Wix SDK.
 */
export async function createReservation(details: {
    slotId: string;
    startDate: string;
    partySize: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
}) {
    try {
        const reservationLocationId = await getReservationLocationId();
        if (!reservationLocationId) throw new Error("No reservation location found");

        const reservation = {
            heldSlotId: details.slotId,
            reservee: {
                firstName: details.firstName,
                lastName: details.lastName,
                email: details.email,
                phone: details.phone
            },
            details: {
                reservationLocationId,
                partySize: details.partySize,
                startDate: details.startDate,
                tableIds: []
            }
        };

        const reservationRes = await (wixClient.reservations as any).createReservation(reservation);

        return { success: true, reservation: reservationRes };
    } catch (error: any) {
        console.error("createReservation Failure:", error);
        return { error: error.message || "Fehler bei der Reservierung" };
    }
}
