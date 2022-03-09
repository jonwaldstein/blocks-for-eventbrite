=== Blocks for Eventbrite ===
Contributors:      jonwaldstein
Donate link:       https://www.paypal.com/paypalme/jonwaldstein
Tags:              eventbrite, events, block
Requires at least: 5.3.2
Tested up to:      5.9.1
Stable tag:        1.1.2
Requires PHP:      7.0.0
License:           GPL-2.0-or-later
License URI:       https://www.gnu.org/licenses/gpl-2.0.html

Gutenberg blocks that display eventbrite events.

== Description ==
Managing events on WordPress can be a challenge.  These days we have many great solutions for managing our events outside of WordPress like Eventbrite.  This plugin helps bridge the gap between the two platforms while retaining the great user interface and experience that Eventbrite provides.

### Features:
- Utilizes Eventbrite's *embedded checkout* experience meaning if your website is secure with an SSL, the sign up button will let users pay and/or signup without leaving your website.
- Provides an event *status* selector to choose between live, draft, and all events.
- Provides an *order by* selector to choose the order you would like your events to be displayed in.
- Provides ability to change the *sign up* button color
- Gives users ability to view event description summary by clicking *details*
- Gives users ability to click on title and navigate to appropriate Eventbrite url
- Saves events in WordPress cache (transients) every 1 minute upon page request.

== Installation ==

1. Upload the plugin files to the `/wp-content/plugins/blocks-for-eventbrite` directory, or install the plugin through the WordPress plugins screen directly.
2. Activate the plugin through the 'Plugins' screen in WordPress
3. In gutenberg, add one of our blocks and insert your Eventbrite api token key in the block settings.
4. Click 'Save Api Key`.
5. If your api key is valid it will be saved to your block and your events will be displayed on the front-end of your site!

== Frequently Asked Questions ==

= What are the requirements to use this plugin? =
First, you need to have an Eventbrite account.  This account should be an organizer that has permission to manage events.  Then you just need to grab your api key so the block can fetch your events.

= Where do I get an api key? =
As long as you have an Eventbrite account you can get the api token key [here](https://www.eventbrite.com/platform/api-keys/):  https://www.eventbrite.com/platform/api-keys/

== Screenshots ==
1. Eventbrite Event Card

== Changelog ==

= 1.1.2: March 8, 2022 =
* fix: set pageSize to a number

= 1.1.0: May 20, 2021 =
* add: button text field to customize button text
* add: event number limit field to limit the number of events displayed

= 1.0.10: April 12, 2021 =
* fix: Replaced "grey" with "gray" in classnames
* fix: added active text states
* fix: adjusted details link style to remove outline and make background transparent
* add: added more css classnames to elements for users to customize elements

= 1.0.9: April 11, 2021 =
* fix: field labels and update readme

= 1.0.8: April 11, 2021 =
* add: date and time formatting options

= 1.0.7 =
* fix: php error

1.0.6 =
* add: Internationalization

= 1.0.5 =
* change: get organization id from /v3/users/me/organizations/ endpoint

= 1.0.4 =
* fix: bring back name_filter after removing by accident

= 1.0.3 =
* change: events api request to use /v3/organizations/id/events/ endpoint

= 1.0.2 =
* add: name_filter to eventbrite settings to filter by event title keywords

= 1.0.1 =
* fix: conditionally display venue details to prevent event from not displaying

= 1.0.0 =
* Release
