<?php

/**
 * Plugin Name:     Blocks for Eventbrite
 * Description:     Gutenberg blocks that display eventbrite events
 * Version:         1.0.3
 * Author:          Jon Waldstein
 * Author URI:      https://jonwaldstein.com
 * License:         GPL-2.0-or-later
 * License URI:     https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:     sandtrail-studios
 *
 * @package         sandtrail-studios
 */

// Exit if accessed directly.
if (!defined('ABSPATH')) {
    exit;
}

// Setup constants
define('BLOCKS_FOR_EVENTBRITE_SCRIPT_ASSET_PATH', dirname(__FILE__) . '/build/index.asset.php');
define('BLOCKS_FOR_EVENTBRITE_SCRIPT_ASSET', require(BLOCKS_FOR_EVENTBRITE_SCRIPT_ASSET_PATH));
define('BLOCKS_FOR_EVENTBRITE_INDEX_JS', 'build/index.js');
define('BLOCKS_FOR_EVENTBRITE_LOCALIZED_SCRIPT_NAME', 'blocksForEventbrite');
define('BLOCKS_FOR_EVENTBRITE_SCRIPT_NAME', 'blocks-for-eventbrite-script');

/**
 * Registers all block assets so that they can be enqueued through the block editor
 * in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/tutorials/block-tutorial/applying-styles-with-stylesheets/
 */
add_action('init', function () {

    if (!file_exists(BLOCKS_FOR_EVENTBRITE_SCRIPT_ASSET_PATH)) {
        throw new Error(
            'Block script not found.  Please contact support.'
        );
    }

    if (!function_exists('register_block_type')) {
        // Gutenberg is not active.
        return;
    }

    wp_register_script(
        BLOCKS_FOR_EVENTBRITE_SCRIPT_NAME,
        plugins_url(BLOCKS_FOR_EVENTBRITE_INDEX_JS, __FILE__),
        BLOCKS_FOR_EVENTBRITE_SCRIPT_ASSET['dependencies'],
        BLOCKS_FOR_EVENTBRITE_SCRIPT_ASSET['version']
    );

    // mock our data in js for the editor
    wp_localize_script(
        BLOCKS_FOR_EVENTBRITE_SCRIPT_NAME,
        BLOCKS_FOR_EVENTBRITE_LOCALIZED_SCRIPT_NAME,
        [
            'events' => [],
            'attributes' => [],
            'assets' => [
                'placeholderImage' => plugins_url('src/img/placeholder.jpg', __FILE__),
            ],
        ]
    );

    register_block_type('blocks-for-eventbrite/events-card', array(
        'editor_script' => BLOCKS_FOR_EVENTBRITE_SCRIPT_NAME,
        'render_callback' => 'render_blocks_for_eventbrite_card',
        'attributes' => [
            'status' => [
                'type' => 'string',
                'default' => 'live',
            ],
            'orderBy' => [
                'type' => 'string',
                'default' => 'start_asc',
            ],
            'noEventsText' => [
                'type' => 'string',
                'default' => 'There are no events at this time. Please check back for upcoming events.'
            ]
        ]
    ));
});

/**
 * Add a block category for "Eventbrite Blocks" if it doesn't exist already.
 *
 * @param array $categories Array of block categories.
 *
 * @return array
 */

add_filter('block_categories', function ($categories) {
    $category_slugs = wp_list_pluck($categories, 'slug');

    return in_array('blocks-for-eventbrite', $category_slugs, true) ? $categories : array_merge(
        $categories,
        array(
            array(
                'slug'  => 'blocks-for-eventbrite',
                'title' => __('Blocks For Eventbrite', 'sandtrail-studios'),
                'icon'  => null,
            ),
        )
    );
});

/**
 * Render callback for eventbrite blocks event card
 *
 * @param object $attributes
 *
 */
function render_blocks_for_eventbrite_card($attributes)
{
    // do not render in the backend
    if (is_admin()) return;

    // set transient key based on the individual blocks
    $TRANSIENT_KEY = "blocks_for_eventbrite_{$attributes['id']}";

    // get transient based on current transient key
    $transient = get_transient($TRANSIENT_KEY);

    // if transient is empty or attributes have changed
    if (!$transient || $transient['attributes'] !== $attributes) {

        $status = $attributes['status'] ? $attributes['status'] : 'live';
        $orderBy = $attributes['orderBy'] ? $attributes['orderBy'] : 'start_asc';
        $nameFilter = $attributes['nameFilter'] ? $attributes['nameFilter'] : null;

        // make GET request to eventbrite api to get the user's organization ID
        $user_response = wp_remote_get("https://www.eventbriteapi.com/v3/users/me/?token={$attributes['apiKey']}");

        // decode fetched data to json
        $user_data = json_decode($user_response['body'], true);

        // make GET request to eventbrite api based on user's attribute settings
        $response = wp_remote_get("https://www.eventbriteapi.com/v3/organizations/{$user_data['id']}/events/?token={$attributes['apiKey']}&expand=ticket_classes,venue&status={$status}&order_by={$orderBy}&time_filter=current_future&name_filter={$nameFilter}");

        // decode fetched data to json
        $data = json_decode($response['body'], true);

        // set transient data with current transient key for 1 minute
        set_transient($TRANSIENT_KEY, [
            'events' => $data['events'],
            'attributes' => $attributes,
            'date' => date('Y-m-d')
        ], 60);

        // get transient based on current block
        $transient = get_transient($TRANSIENT_KEY);
    }

    // remove apiKey from attributes so it's not accessible on the front-end
    if (!empty($transient['attributes']['apiKey'])) {
        unset($transient['attributes']['apiKey']);
    }

    // enqueue our script for the front-end
    wp_enqueue_script(BLOCKS_FOR_EVENTBRITE_SCRIPT_NAME);

    // access our transient data in js
    wp_localize_script(
        BLOCKS_FOR_EVENTBRITE_SCRIPT_NAME,
        BLOCKS_FOR_EVENTBRITE_LOCALIZED_SCRIPT_NAME,
        [
            'events' => $transient['events'],
            'attributes' => $transient['attributes'],
        ]
    );

    ob_start();

    // use js to render events in this div
    echo '<div id="root-blocks-for-eventbrite" class="blocks-for-eventbrite blocks-for-eventbrite-css-wrapper"></div>';

    return ob_get_clean();
}
