=== Blocks for Eventbrite ===
Contributors:      jonwaldstein
Tags:              block
Requires at least: 5.3.2
Tested up to:      5.4
Stable tag:        0.1.0
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

= 1.0.1 =
* fix: conditionally display venue details to prevent event from not displaying

= 1.0.0 =
* Release
