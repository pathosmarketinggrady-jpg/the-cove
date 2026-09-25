# The Cove Social Club

A five-page static website for The Cove Social Club, 1349 N. Market Street,
Jacksonville FL 32206.

Plain HTML, CSS and JavaScript. No framework, no build step to view it, no CDN,
no web fonts. Extract the folder, double-click `index.html`, and the whole site
works, styled, with no internet connection.

---

## The pages

| File | What it is |
|---|---|
| `index.html` | Home. Hero, the weekly calendar, the Fall Cohort offer, the spaces |
| `events.html` | The full events calendar and the wider programme |
| `venue.html` | The four spaces, private hire, location |
| `membership.html` | The Fall Membership Cohort offer, pricing, privileges, terms |
| `inquire.html` | Contact details and the enquiry form |

Plus `css/styles.css`, `js/data.js`, `js/main.js`, and `assets/`.

---

## What is still missing, and where it is marked

Nothing on this site is invented. Two details had not been supplied when it
was built, and each renders an honest "to be announced" chip rather than a
guess. Search the HTML for `class="tba"` to find all of them.

1. **Start times for every recurring event.** No time appears anywhere on the
   site. Both the home page and the events page instead carry a line pointing
   people at the phone. When times arrive, add a `time:` field to each event in
   `js/data.js`, add it to the matching card in the HTML, set `TIMES_TBA` to
   `false`, and delete the two "start times are being confirmed" notes.
2. **The Saturday DJ's name.** `saturday-day-party` in `js/data.js` has
   `with: null` and `withTba: true`.


---

## Link audit, 7 September 2026

Every outbound link on the site was requested and checked, not assumed.

| Link | Result |
|---|---|
| `instagram.com/covevip/` | **Live.** Confirmed as "The Cove Social Club (@covevip)", 1,920 followers |
| `facebook.com/thecovevip/` | **Live.** Page title "The Cove Social Club \| Jacksonville FL", account `61565948302505` |
| `linktr.ee/covesocial` | **Live**, 200 |
| `app.joinit.com/o/the-cove-social-club/` | **Live**, 200, page mentions The Cove |
| Google Maps address link | **Live**, 200, opens the correct search |
| `tel:+19044656568` | Correct E.164 format for (904) 465-6568 |
| `mailto:info@covesocial.com` | Correct, matches the club's published address |
| ~~`thecovevip.raklet.com/login`~~ | **DEAD — 410 Gone. Removed from the site.** |
| ~~`thecovevip.raklet.com/apply`~~ | **DEAD — 410 Gone. Not used.** |

**Two things came out of this audit that the club needs to decide.**

**1. There are two Facebook pages with the same name.**

- `facebook.com/thecovevip/` — account `61565948302505`, has a vanity URL
- `facebook.com/p/The-Cove-Social-Club-61577524895711/` — account `61577524895711`

Both are live and both are titled "The Cove Social Club | Jacksonville FL".
The site links to the first. Ask the club which they actually post from, and
merge or retire the other, because right now followers are being split.

**2. The member login portal is gone.**

The club's current site links members to `thecovevip.raklet.com`. Both the
login and the apply URLs there return **410 Gone**, which means the account was
deliberately closed rather than merely broken. The "Member login" link has been
removed from every footer rather than shipped dead. If members still need a
login, get the working URL and add it back to the footers and to `CLUB` in
`js/data.js`.

Also worth knowing: **neither covesocial.com nor the Linktree links to any
social account at all.** The handles above were found through directory
listings and search, then verified one by one. Adding social icons to the
existing site would help people find the accounts.

---

## Conflicts found in the existing material

These were flagged rather than silently resolved.

**1. Six of the seven published opening hours are unverified. Get them checked.**

Opening hours are now live in every footer, on the enquiry page, and in the
home page's `openingHoursSpecification`:

| Day | Published | Source |
|---|---|---|
| Mon to Thu | 6 AM to 4 PM | Directory data, **unverified** |
| Friday | 6 AM to 11 PM | Directory data, **unverified** |
| Saturday | 12 to 3 PM | **The club, 25 September 2026** |
| Sunday | 10 AM to 6 PM | Directory data, **unverified** |

Only Saturday came from the club. The other six were carried over on the
owner's instruction as "the old hours that were already listed", and they need
confirming, because:

- **The old site is gone.** `covesocial.com` now 302-redirects to
  `the-cove-t4l7.vercel.app`, which serves this site, so the previous
  WordPress hours could not be read off it. There is **no Wayback snapshot**
  of it either.
- Visit Jacksonville and the Jax Chamber list **no hours at all**, and Yelp
  returns 403 to direct fetching. The six days come from third-party directory
  data (Yelp / Apple Maps) that two separate searches returned identically.
  **No page was opened to confirm them.**
- **The same listings put Saturday at 6 AM to 10 PM**, which the club has now
  contradicted outright. If Saturday was that wrong, the rest may be too.
- Those listings also still advertise the **cigar lounge that does not exist**
  (see point 4), so they are known to be stale.
- A **6 AM open** reads more like café hours than club hours, and Monday to
  Thursday closing at 4 PM still sits oddly beside Thursday trivia and
  Wednesday evening wine service. The enquiry page carries a line saying event
  nights can run later than the listed times.

To correct a day, edit it in `CLUB.hours` **and** `HOURS_GROUPED` in
`js/data.js`, **and** in the `HOURS` block in all six footers and the enquiry
page's Hours card, **and** in the `openingHoursSpecification` in `index.html`.
The footers print the week grouped, because Monday to Thursday currently
share one set of hours; if that stops being true, the grouping has to change.

**2. The second membership application portal is dead.**
`app.joinit.com/o/the-cove-social-club/` is linked from the current membership
page and is live. The other portal the club links to, `thecovevip.raklet.com`,
returns 410 Gone on both `/apply` and `/login`. Only the joinit link is used
here, and it is the only one recorded in `js/data.js`.

**3. `thecovevip.com` does not resolve.**
Visit Jacksonville still lists it as the club's official website. Either
reclaim the domain and point it at this site, or ask them to update the listing
to `covesocial.com`.

**4. There is no cigar lounge.**
covesocial.com advertises a "private cigar lounge" on the home page and a
"future Stx + Stones Cigar Lounge" on the Linktree. **The club has confirmed it
does not exist.** Every reference has been removed from this site: the venue
page, the venue meta description, the home page marquee and `SPACES` in
`js/data.js`. **Their current live site still advertises it and should be
corrected too**, along with the Linktree bio.

**5. Stale dates in the current copy.**
The existing membership page advertises the Affluent Lounge as "launching
2025". That claim was not carried over. Confirm its real status before adding
anything about it.

**6. Jaguars watch parties were removed after the build.**
The owner's brief asked for Sunday football watch parties from 13 September,
and they were built. **The club then asked for them to be taken off**, so every
trace has been removed: the section on the home and events pages, the footer
links, the `SEASON` entry in `js/data.js` and the kickoff countdown in
`js/main.js`. If they are ever reinstated, note that using an NFL team name in
event marketing is a trademark question; "Sunday Football" avoids it.

**7. The Wednesday Pour feature band was removed after the build.**
The club supplied a strapline ("Wine, Small Plates, Music, Conversation") and
four rotating wine themes (Cabernet Night, Rosé Evening, Old World vs. New
World, Bubbles). These were built as a feature band on the home and events
pages, and **the club then asked for it to be taken off** because they did not
like the look of it.

The band is gone from both pages, along with its CSS. The Wednesday Pour itself
is untouched and still sits in the weekly calendar. The strapline and the four
themes now appear nowhere on the site; they are preserved in `js/data.js` as
`strapNotRendered` and `themesNotRendered` so nothing is lost. If they are
wanted back, the least intrusive place is the event card's `note`.

(The strapline was supplied as "A Wednesday nights at the cove" and was set as
"Wednesday nights at The Cove", which reads as the intended line.)

---

## Editing the calendar

**`js/data.js` is the single source of truth.** Every event, the membership
pricing, the address and the phone number are written there once.

The calendar is **also** written into the HTML as real markup, so it is
readable with JavaScript switched off, indexable by search engines, and
printable. After editing `js/data.js`, update the matching block in the HTML
between its marker comments:

- `<!-- WEEK:START -->` … `<!-- WEEK:END -->` in `index.html` **and** `events.html`
- `<!-- OFFER:START -->` and `<!-- PRIVILEGES:START -->` in `membership.html`
- `<!-- SPACES:START -->` in `venue.html`
- `<!-- HOURS:START -->` … `<!-- HOURS:END -->` in the footer of **all six**
  HTML files, plus a second one on `inquire.html` for the Hours contact card.
  The home page also carries the hours in its `openingHoursSpecification`
  structured data, which is a third place to keep in step.

Keep the two in step. If a price changes in one and not the other, the page
shows one number and the data file says another.

### Adding an event

Copy an existing `<article class="ev">` block. Three things matter:

- **`data-day`** must be one of the seven English day names. It is what lights
  tonight's card.
- **`data-monthly`** on a card means "only light this on the *last* such weekday
  of the month". Latin Night uses it. Without it, a monthly event would light
  every week and tell people something untrue.
- **`--acc` and `--acc-t`** set inline choose the card's accent. The available
  pairs are `--wine`, `--steel`, `--ember`, `--teal` and `--brass`, each with a
  matching `-t` tint for text.

---

## The design

**Midnight and brass.** A near-black neutral ground, brushed brass for rules and
numerals, and the club's own photography carrying the warmth. The supplied
wordmark is off-white on transparent, drawn for a dark page, so the site is
built around it rather than the other way round.

The ground is neutral rather than warm on purpose: the club photography is
already heavily warm, and a brown-black under it turned everything muddy.

Three type families, each with one job:

| Token | Face | Used for |
|---|---|---|
| `--display` | Futura / Century Gothic / Avenir Next | Headings and labels, uppercase, wide tracking. Club signage. |
| `--serif` | Optima / Candara / Palatino | Event names and pull quotes, echoing the serif in the logo |
| `--body` | Helvetica Neue / system sans | Anything read in paragraphs |

**One accent per recurring night**, so the calendar is legible at a glance
instead of five identical cards: wine for the Pour, steel for trivia, ember for
Latin Night, brass for the weekend day parties. Each is
set inline on the card with `--acc` and `--acc-t`, so one declaration re-tints a
whole block.

**The brass paint tone is not a text colour.** `--brass` at `#C89A54` is for
rules, hairlines and outlined numerals. Text sitting on the dark ground uses
`--brass-t` at `#E5C68E`, which clears WCAG AA comfortably.

---

## What the JavaScript does, and does not do

`js/main.js` is progressive enhancement only. Switch JavaScript off and you lose
the tonight highlight, the marquee, the animation and the enquiry form's
convenience. You lose no content. It adds:

- the sticky header that shrinks on scroll
- the mobile menu sheet, which closes on Escape, on a click outside, and on any link
- **the tonight highlight**, which lights the card matching the visitor's own
  weekday, rechecked every minute so a page left open overnight does not keep
  lighting yesterday
- the marquee
- the enquiry form handoff
- the fade-in on scroll

Anything already on screen when the page loads is shown immediately rather than
waiting on the scroll observer. That is deliberate: these pages hide most of
their content at opacity 0 until it is revealed, so an observer that fails to
fire would not cost an animation, it would cost the page.

---

## The enquiry form

**It does not post anywhere.** A static site has no server. Rather than ship a
button that silently does nothing, the form hands the message to the visitor's
own mail program, pre-addressed to `info@covesocial.com` and pre-filled.

That works, but it is not ideal: it depends on the visitor having a mail client
configured, and nothing is logged. **Once the site is hosted, swap it for a real
form service.** Formspree, Netlify Forms and Basin all work with no backend:

1. Give the `<form>` an `action` pointing at the service and `method="post"`.
2. Delete the `inquiry()` block in `js/main.js`.

Until then the phone number and email address are on every page, and the
enquiry page leads with them.

---

## Going live

There is no build step, so any static host works: Netlify, Vercel, Cloudflare
Pages, GitHub Pages. Put these files at the **root**, so `index.html` is at the
top level rather than inside a folder.

The current site is WordPress on `covesocial.com`. This is a replacement, not a
theme or a plugin; it cannot be dropped into the existing install. Point the
domain at the new host when you are ready to switch.

### Do these before flipping the domain

**1. Connect the enquiry form to something real.** This is the one thing that
will lose business if it is missed. The form currently hands the message to the
visitor's own mail client. On a live site, use a form service, which needs no
backend:

  - Give the `<form>` an `action` pointing at Formspree / Netlify Forms / Basin,
    and `method="post"`.
  - Delete the `inquiry()` block in `js/main.js`.

Until that is done, a visitor with no mail client configured gets nothing when
they press Send, and nothing is logged anywhere.

**2. Keep the old URLs alive.** The WordPress site used different paths from
this one. `_redirects` (Netlify, Cloudflare Pages) and `vercel.json` (Vercel)
both ship with 301s from every old path to its replacement:

  | Old | New |
  |---|---|
  | `/upcoming-events/` | `/events.html` |
  | `/venue/` | `/venue.html` |
  | `/membership/` | `/membership.html` |
  | `/inquire/` | `/inquire.html` |

  On any other host, set the equivalent 301s up by hand. Skip this and every
  existing Google result, Linktree link and directory listing lands on a 404.

**3. Submit the sitemap.** `sitemap.xml` and `robots.txt` are included and
point at `covesocial.com`. Add the sitemap in Google Search Console once the
domain is switched.

**4. Check the canonical URLs match how your host serves the files.** Every
page declares a canonical and an `og:url` using the `.html` extension, for
example `https://covesocial.com/events.html`. If you enable clean URLs, so the
page is served at `/events` instead, **update the canonical and `og:url` on all
five pages to match**, or search engines will be told the authoritative version
is at an address that redirects. `vercel.json` currently sets `cleanUrls: true`;
either turn that off or update the tags.

### Still outstanding at launch

Neither of these blocks going live, but both are visible on the site as an
honest "to be announced" rather than a guess:

  - **Start times** for all five recurring events
  - **The Saturday DJ's name**

And see the conflicts section above: **six of the seven published opening hours
are unverified directory data** and should be confirmed with the owner, and
there are **two Facebook pages** splitting the club's followers.

---

## Photography

Six photographs, all re-encoded smaller for the web.

`assets/week.jpg` sits beside "The week ahead" on the home page: the record
player on the vintage tea cart. Supplied as a **19 MB PNG** at 4578 x 6400 and
rebuilt as a 1100 x 1375 JPEG at 145 KB. Two deliberate crops were made: the
pale light-leak band down the left edge was trimmed off, and the framing was
pulled in to 4:5 so it matches the membership figure opposite it. That crop
also drops the club wordmark that was overlaid on the original, which the site
does not need, since the mark is already in the header and the hero.

`assets/hero.jpg` is the home page hero: the mirror wall, ring chandeliers and
green velvet sofa. Supplied by the club at 7008 x 4672 and resized to 2400 x
1600 at quality 82, which brings a 7 MB original down to 474 KB without any
visible loss at the size it is displayed. **Do not put the original in the
folder** — it alone would be four times the weight of the whole rest of the
site.

The other four came from the club's current website: the lounge, the showroom
set for dinner, the café window, and a dressed table.

The hero's scrim is two stacked gradients rather than one flat wash, tuned
specifically to this photograph. Its left side is already dark, so the
left-to-right gradient is deliberately lighter than it would need to be for a
brighter image. **If you swap the hero photo, re-check the scrim** in
`.hero::after`, or the headline may end up sitting on something too pale to
read against.

Four images is enough for five pages but it is thin. The layout has room for
more: `.space__fig` on the venue page takes any number of spaces, and the
events page would carry a photograph per recurring night if they exist. Shots
of a live Wednesday Pour, a full Saturday day party and a busy Sunday brunch
would each earn their place.

---

## Browser support

Tested in Chromium at 1440px, 500px and mobile widths. Uses CSS grid, custom
properties, `clamp()`, `aspect-ratio` and `IntersectionObserver`, all standard
for years. Older browsers lose the layout polish and the fade-in, not the
content.

Accessibility: skip link, visible focus rings, labelled icon buttons, the mobile
sheet is keyboard-operable and closes on Escape, decorative marks are hidden
from screen readers, form fields are properly labelled, and the "to be
announced" chips are readable words rather than icons. It honours
`prefers-reduced-motion`. It also prints: the header, marquee and buttons drop
away and the calendar prints on white.

---

## Related

Petronita's, the Southern and Latin restaurant, shares the building at 1349 N.
Market Street and the phone number 904.465.6568. Cove members receive 10% off
dining there and priority reservations. The two sites are deliberately built to
look nothing alike: Petronita's is warm cream and gold, The Cove is midnight and
brass.
