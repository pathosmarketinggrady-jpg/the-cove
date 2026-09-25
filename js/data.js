/* ===========================================================================
   The Cove Social Club, data.js
   ---------------------------------------------------------------------------
   The single source of truth for the club's details, the recurring events
   calendar and the membership offer.

   Everything here is ALSO written into the HTML at build time, between marker
   comments, so the site is complete with JavaScript switched off and readable
   by search engines. If you change something here, change the matching block
   in the HTML. The markers are listed in README.md.

   NOTHING in this file is invented. Where a detail has not been supplied by
   the club it is marked `tba: true` and the page renders an honest "to be
   announced" chip rather than a guess.
   =========================================================================== */

var CLUB = {
  name:    "The Cove Social Club",
  short:   "The Cove",
  tagline: "Exclusivity. Elegance. Excellence.",

  address: {
    street:       "1349 N. Market Street",
    city:         "Jacksonville",
    region:       "FL",
    postal:       "32206",
    neighbourhood:"Historic Springfield"
  },

  phone:     "904.465.6568",
  phoneHref: "+19044656568",
  email:     "info@covesocial.com",

  maps: "https://www.google.com/maps/search/?api=1&query=1349+N+Market+Street+Jacksonville+FL+32206",

  /* All three checked and returning 200 on 7 September 2026. Note that neither
     covesocial.com nor the Linktree links to any social account, so these came
     from directory listings and search, then were verified individually. */
  social: {
    instagram: "https://www.instagram.com/covevip/",
    /* TWO Facebook pages exist under this name, with different account ids:
         /thecovevip/  -> account 61565948302505   (used here, has a vanity URL)
         /p/The-Cove-Social-Club-61577524895711/   (a duplicate)
       Ask the club which one they actually post from and retire the other. */
    facebook:  "https://www.facebook.com/thecovevip/",
    linktree:  "https://linktr.ee/covesocial"
  },

  /* joinit is live and checked. The raklet portal that the club's current site
     also links to is DEAD: both thecovevip.raklet.com/apply and /login return
     410 Gone, so neither appears anywhere on this site. If members still need
     a login, get the current URL from the club and add it back. */
  apply: "https://app.joinit.com/o/the-cove-social-club/",

  /* Opening hours.

     SATURDAY came from the club on 25 September 2026 and is the one day that
     is confirmed first-hand.

     THE OTHER SIX are the hours that were already listed for the club online,
     carried over on the owner's instruction. They are NOT first-hand: the old
     covesocial.com is gone (the domain now serves this site), there is no
     Wayback snapshot of it, and Visit Jacksonville and the Jax Chamber list no
     hours at all. They come from third-party directory data (Yelp / Apple
     Maps), which two separate searches returned identically.

     Treat them as unverified, for two reasons. The same listings put SATURDAY
     at 6 AM to 10 PM, which the club has now contradicted outright, and they
     still advertise the cigar lounge the club has confirmed does not exist. A
     6 AM open also looks more like café hours than club hours. Get all seven
     confirmed by the owner and correct anything that is wrong.

     To change a day, edit it here AND in the HOURS block in every footer AND
     in the openingHoursSpecification in index.html. The markers are listed in
     README.md. */
  hours: {
    monday:    "6 AM to 4 PM",
    tuesday:   "6 AM to 4 PM",
    wednesday: "6 AM to 4 PM",
    thursday:  "6 AM to 4 PM",
    friday:    "6 AM to 11 PM",
    saturday:  "12 to 3 PM",
    sunday:    "10 AM to 6 PM"
  }
};

/* The footers print the week grouped rather than as seven rows, because
   Monday through Thursday share one set of hours. Keep this in step with
   CLUB.hours above. */
var HOURS_GROUPED = [
  { days: "Mon to Thu", hours: "6 AM to 4 PM" },
  { days: "Friday",     hours: "6 AM to 11 PM" },
  { days: "Saturday",   hours: "12 to 3 PM" },
  { days: "Sunday",     hours: "10 AM to 6 PM" }
];

/* --------------------------------------------------------------- EVENTS
   `day` drives the "tonight at the cove" highlight, so it must stay one of
   the seven English day names. `cadence` is what the card prints. */
var EVENTS = [
  {
    id: "wednesday-pour",
    day: "Wednesday",
    name: "The Wednesday Pour",
    cadence: "Every Wednesday",
    note: "Wine, small plates, music and conversation. A different theme every week.",
    accent: "wine",

    /* The club supplied a strapline and four rotating wine themes, and both
       were built as a feature band on the home and events pages. The club
       then asked for that band to be removed, so NEITHER of the two fields
       below is rendered anywhere on the site any more. They are kept here so
       the information is not lost, and so the themes are to hand if they are
       ever wanted back, most likely folded into the note above. */
    strapNotRendered: ["Wine", "Small Plates", "Music", "Conversation"],
    themesNotRendered: ["Cabernet Night", "Rosé Evening", "Old World vs. New World", "Bubbles"]
  },
  {
    id: "trivia",
    day: "Thursday",
    name: "Trivia Night",
    cadence: "Every Thursday",
    accent: "steel"
  },
  {
    id: "latin-night",
    day: "Friday",
    name: "Latin Night",
    cadence: "Last Friday of every month",
    accent: "ember",
    monthly: true
  },
  {
    id: "saturday-day-party",
    day: "Saturday",
    name: "Saturday Day Party",
    cadence: "Every Saturday",
    with: null,              /* DJ name not yet supplied by the club */
    withTba: true,
    accent: "brass"
  },
  {
    id: "sunday-brunch",
    day: "Sunday",
    name: "Sunday Brunch Day Party",
    cadence: "Every Sunday",
    with: "DJ Zenergy",
    accent: "brass"
  }
];

/* Start times have not been supplied for any recurring event. While this is
   true the pages print an honest note instead of inventing a time. Set to
   false once real times are added to each event above as `time: "7 PM"`. */
var TIMES_TBA = true;

/* ----------------------------------------------------------- MEMBERSHIP */
var MEMBERSHIP = {
  cohort:       "Fall Membership Cohort",
  status:       "Now open",
  annualFull:   1000,
  annualOffer:  800,
  discountPct:  20,
  registration: 175,
  registrationNote:
    "The one-time registration fee covers the required background check and administrative processing.",
  privileges: [
    "10% off dining at Petronita’s",
    "Priority reservations at Petronita’s",
    "Complimentary or discounted admission to select events hosted by The Cove",
    "Exclusive member pricing on venue rentals",
    "Complimentary member drink at select Cove events",
    "Access to members-only events and experiences",
    "Exclusive networking and social events",
    "Private member seating in designated areas",
    "Opportunities to connect with fellow members in an intimate social-club environment"
  ],
  terms:
    "Membership is subject to application, background screening, approval, and The Cove Social Club membership terms and policies."
};

/* -------------------------------------------------------------- SPACES */
/* Four spaces, matching the four cards in venue.html. There is NO cigar
   lounge: the club's current site still advertises a "Stx + Stones Cigar
   Lounge", but the club has confirmed it does not exist, so it appears
   nowhere here. Do not add it back from the old copy. */
var SPACES = [
  {
    name: "ONESpace Showroom",
    blurb: "A gallery-style showroom for exhibitions, launches, pop-ups and seated dinners."
  },
  {
    name: "The Lounge",
    blurb: "Exposed brick, leather chesterfields and a fireplace. The room the club is built around."
  },
  {
    name: "The Lab Café",
    blurb: "The artisan café at the front of the club, open to members and guests through the day."
  },
  {
    name: "The Event Floor",
    blurb: "A flexible floor for receptions, networking, performances and private hire."
  }
];

var TICKER = [
  "Members Club", "Event Venue", "Artisan Café",
  "Gallery Showroom", "Historic Springfield", "Jacksonville"
];
