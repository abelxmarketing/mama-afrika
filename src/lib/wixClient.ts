import { createClient, OAuthStrategy } from '@wix/sdk';
import { items, menus, sections, itemVariants } from '@wix/restaurants';
import { checkout, currentCart, cart } from '@wix/ecom';
import { redirects } from '@wix/redirects';
import { reservations, timeSlots, reservationLocations } from '@wix/table-reservations';

export const wixClient = createClient({
    modules: {
        items,
        menus,
        sections,
        itemVariants,
        checkout,
        currentCart,
        cart,
        redirects,
        reservations,
        timeSlots,
        reservationLocations
    },
    auth: OAuthStrategy({
        clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID || '',
    }),
});
