## Blocks for Eventbrite

_Gutenberg blocks that display eventbrite events._

Managing events on WordPress can be a challenge. These days we have many great solutions for managing our events outside of WordPress like Eventbrite. This plugin helps bridge the gap between the two platforms while retaining the great user interface and experience that Eventbrite provides.

### Features:

- Utilizes Eventbrite's _embedded checkout_ experience meaning if your website is secure with an SSL, the sign up button will let users pay and/or signup without leaving your website.
- Provides an event _status_ selector to choose between live, draft, and all events.
- Provides an _order by_ selector to choose the order you would like your events to be displayed in.
- Provides ability to change the _sign up_ button color & text
- Provides an _event name filter_ to filter by event title keywords
- Provides an _event number limit_ field to only display a specific number of events
- Gives users ability to view event description summary by clicking _details_
- Gives users ability to click on title and navigate to appropriate Eventbrite url
- Saves events in WordPress cache (transients) every 1 minute upon page request.

### Installation on WordPress

1. Upload the plugin files to the `/wp-content/plugins/blocks-for-eventbrite` directory, or install the plugin through the WordPress plugins screen directly.
2. Activate the plugin through the 'Plugins' screen in WordPress
3. In gutenberg, add one of our blocks and insert your Eventbrite api token key in the block settings.
4. Click 'Save Api Key`.
5. If your api key is valid it will be saved to your block and your events will be displayed on the front-end of your site!

### Frequently Asked Questions

1. What are the requirements to use this plugin?
   First, you need to have an Eventbrite account. This account should be an organizer that has permission to manage events. Then you just need to grab your api key so the block can fetch your events.

2. Where do I get an api key?
   As long as you have an Eventbrite account you can get the api token key [here](https://www.eventbrite.com/platform/api-keys/): https://www.eventbrite.com/platform/api-keys/
