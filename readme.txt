=== Blocks for Eventbrite ===
Contributors:      jonwaldstein
Donate link:       https://www.paypal.com/paypalme/jonwaldstein
Tags:              eventbrite, events, block, gutenberg, tickets
Requires at least: 6.6
Tested up to:      6.9
Stable tag:        1.1.5
Requires PHP:      7.0.0
License:           GPL-2.0-or-later
License URI:       https://www.gnu.org/licenses/gpl-2.0.html

Display Eventbrite events with a modern design without importing them into WordPress. The embedded checkout integration allows visitors to register and pay without ever leaving your website.

== Description ==

**The simplest way to showcase Eventbrite events on your WordPress site.**

This plugin helps bridge the gap between WordPress and Eventbrite, while retaining the great user experience that Eventbrite provides.  Your events live on Eventbrite where they belong — this plugin simply displays them with a beautiful, modern design.

### Why Choose Blocks for Eventbrite?

**🪶 Truly Lightweight**
Unlike traditional event plugins, we don't create WordPress posts, custom tables, or complex database structures. Your events are fetched directly from Eventbrite and intelligently cached for blazing-fast performance.

**🛒 Seamless Checkout Experience**
Using Eventbrite's embedded checkout, visitors can register and pay without ever leaving your website (SSL required). No redirects, no friction — just conversions.

**🎨 Beautiful Out of the Box**
Modern card-based design with clean typography, subtle shadows, and smooth hover effects. Each event displays the image, date, venue, price, and a quick-details tooltip — all styled to look great on any theme.

**⚡ Smart Caching**
Events are cached using WordPress transients, refreshing every minute. Your site stays fast while always showing up-to-date event information.

### Features

* **Native Gutenberg Block** — Just add the block and paste your API key
* **Embedded Checkout** — Let visitors register without leaving your site
* **Event Status Filter** — Display live, draft, or all events
* **Flexible Sorting** — Order by start date or event name (ascending/descending)
* **Event Name Filter** — Show only events matching specific keywords
* **Limit Events Displayed** — Control exactly how many events appear
* **Custom Button Styling** — Match your brand with custom colors and text
* **Date & Time Formatting** — Use WordPress formatting or customize your own
* **Quick Details Tooltip** — Visitors can preview event summaries instantly
* **Venue Information** — Automatically displays location details when available
* **Live Editor Preview** — See exactly how your events will look while editing
* **Translation Ready** — Fully internationalized for global sites
* **No Database Bloat** — Zero custom posts, zero custom tables

### Perfect For

* Event organizers who manage events on Eventbrite
* Businesses that host regular workshops, classes, or meetups
* Nonprofits promoting fundraisers and community events
* Anyone who wants events on WordPress without the maintenance headache

== Installation ==

1. Upload the plugin files to `/wp-content/plugins/blocks-for-eventbrite`, or install directly through the WordPress plugins screen
2. Activate the plugin through the 'Plugins' screen
3. Create or edit a page/post and add the "Events Card" block from the Eventbrite category
4. Enter your Eventbrite API token key in the block settings panel
5. Click 'Save Api Key' — if valid, you'll see your organization name confirmed
6. Customize the display options to your liking
7. Publish and watch your events appear beautifully!

== Frequently Asked Questions ==

= What do I need to use this plugin? =

Just an Eventbrite account with organizer permissions. The plugin connects directly to your Eventbrite organization to pull your events.

= Where do I get an API key? =

Log into Eventbrite and visit [eventbrite.com/platform/api-keys](https://www.eventbrite.com/platform/api-keys/) to generate your private token.

= Will this slow down my site? =

No! Events are cached locally and only refreshed once per minute. Your pages load from cache, not from Eventbrite's servers on every request.

= Does the checkout really work without leaving my site? =

Yes — as long as your site has an SSL certificate (https://), visitors can complete their registration and payment in a modal overlay. No redirects needed.

= Can I display events from multiple Eventbrite accounts? =

Each block connects to one Eventbrite account. You can add multiple blocks with different API keys if needed.

= Does this create posts or custom post types? =

No. That's the beauty of this plugin — your WordPress database stays clean. Events are fetched from Eventbrite and displayed dynamically.

= Can I filter which events are shown? =

Absolutely. Filter by event status (live/draft/all), sort order, event name keywords, and limit the total number displayed.

= Will this work with my theme? =

The plugin uses a self-contained design that works well with most themes. The card styling is intentionally neutral to blend with various designs.

= Is this plugin actively maintained? =

Yes! The plugin is maintained and updated for WordPress compatibility. Check the changelog for recent updates.

== Screenshots ==

1. Event card block preview with many avialable settings
2. Event card block displaying events on a website
3. Embedded checkout modal for seamless registration

== Changelog ==

= 1.1.5: December 6, 2025 =
* Fix: resolved an issue with block default values

= 1.1.4: December 6, 2025 =
* Maintenance: updated for WordPress 6.9 compatibility

= 1.1.3: August 20, 2024 =
* Maintenance update and WordPress 6.6 compatibility verification

= 1.1.2: March 8, 2022 =
* Fix: Page size parameter now correctly set as number type

= 1.1.0: May 20, 2021 =
* New: Custom button text field
* New: Event number limit to control how many events display

= 1.0.10: April 12, 2021 =
* Fix: Corrected "grey" to "gray" in class names for consistency
* Fix: Added active text states for better accessibility
* Fix: Details link now has transparent background and no outline
* New: Additional CSS class names for easier custom styling

= 1.0.9: April 11, 2021 =
* Improved field labels and documentation

= 1.0.8: April 11, 2021 =
* New: Date and time formatting options using WordPress standards

= 1.0.7 =
* Fix: Resolved PHP error

= 1.0.6 =
* New: Full internationalization support

= 1.0.5 =
* Changed: Now fetches organization ID from /v3/users/me/organizations/ endpoint

= 1.0.4 =
* Fix: Restored name_filter functionality

= 1.0.3 =
* Changed: Events API now uses /v3/organizations/id/events/ endpoint for better reliability

= 1.0.2 =
* New: Name filter to show only events matching title keywords

= 1.0.1 =
* Fix: Venue details now display conditionally to prevent rendering issues

= 1.0.0 =
* Initial release

== Upgrade Notice ==

= 1.1.3 =
Maintenance update confirming WordPress 6.6 compatibility. Safe to update.

= 1.1.0 =
New features! You can now customize button text and limit the number of events displayed.
