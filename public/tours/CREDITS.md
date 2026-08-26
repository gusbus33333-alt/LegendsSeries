# Legends Tours image credits

Every image in this folder was downloaded from Unsplash and is used under the
[Unsplash Licence](https://unsplash.com/license), which grants free commercial
use worldwide, with no payment and no attribution required.

They are stored here rather than hot-linked so the pages cannot break if
Unsplash removes or changes an image, and so there is a dated local copy on
record.

**Retrieved:** 25 August 2026

| File | Source |
|---|---|
| `nations-championship-2026-twickenham.jpg` | https://images.unsplash.com/photo-1574629810360-7efbbe195018 |
| `sa-rugby-experience-cape-town.jpg` | https://images.unsplash.com/photo-1544568100-847a948585b9 |
| `cresta-run-st-moritz.jpg` | https://images.unsplash.com/photo-1551524164-687a55dd1126 |
| `orient-express-rugby-journey.jpg` | https://images.unsplash.com/photo-1534430480872-3498386e7856 |
| `bethpage-black-golf.jpg` | https://images.unsplash.com/photo-1535131749006-b7f58c99034b |
| `golf-national-paris.jpg` | https://images.unsplash.com/photo-1592919505780-303950717480 |
| `dubai-7s-hospitality.jpg` | https://images.unsplash.com/photo-1512453979798-5ea266f8880c |
| `cresta-run-st-moritz-2027.jpg` | https://images.unsplash.com/photo-1551698618-1dfe5d97d256 |
| `orient-express-2026.jpg` | https://images.unsplash.com/photo-1467269204594-9661b134dd2b |
| `leeky-potato-golf-paris-2026.jpg` | https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa |

Two events reuse a file above rather than storing the same photo twice:
`legends-lounge-twickenham-2026` uses
`nations-championship-2026-twickenham.jpg`, and `pwc-cup-bethpage-black-2026`
uses `bethpage-black-golf.jpg`.

## Where these are referenced

Some tour images come from `lib/events.ts`, but the ones on the live Legends
Tours page are stored in the `image` column of the **`events` table** in
Supabase. Changing the code alone will not change those — update the database
row as well.

## Notes

- Photographer names are not recorded above because Unsplash's CDN strips IPTC
  metadata when it resizes an image. The licence does not require attribution,
  but if you want the names for the record, search the photo ID on unsplash.com
  and add them to this table.
- The Unsplash Licence covers the photographer's copyright only. It does not
  grant rights over identifiable people, logos or trademarks appearing in a
  photo — so avoid using a shot in a way that implies someone endorses us.
- Anything on Unsplash marked **Unsplash+** is a paid tier and is *not* covered
  by the free licence. None of the images here are Unsplash+.

## Adding a new image

Download it rather than hot-linking, drop it in this folder, and add a row above
with the source URL and the date. That record is what turns a query about an
image into a two-minute conversation.
