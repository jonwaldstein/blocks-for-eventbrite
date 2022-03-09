<?php

/**
 * Plugin Name:     Blocks for Eventbrite
 * Description:     Gutenberg blocks that display eventbrite events
 * Version:         1.1.2
 * Author:          Jon Waldstein
 * Author URI:      https://jonwaldstein.com
 * License:         GPL-2.0-or-later
 * License URI:     https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:     blocks-for-eventbrite
 */

// Exit if accessed directly.
if (!defined('ABSPATH')) {
    exit;
}

// Setup constants
const BLOCKS_FOR_EVENTBRITE_SCRIPT_ASSET_PATH = __DIR__ . '/build/index.asset.php';
define("BLOCKS_FOR_EVENTBRITE_SCRIPT_ASSET", require(BLOCKS_FOR_EVENTBRITE_SCRIPT_ASSET_PATH));
const BLOCKS_FOR_EVENTBRITE_INDEX_JS = 'build/index.js';
const BLOCKS_FOR_EVENTBRITE_LOCALIZED_SCRIPT_NAME = 'blocksForEventbrite';
const BLOCKS_FOR_EVENTBRITE_SCRIPT_NAME = 'blocks-for-eventbrite-script';
// include class with no auto-loading
include_once('src/api/RenderBlocksForEventbriteCard.php');

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

    wp_set_script_translations(BLOCKS_FOR_EVENTBRITE_SCRIPT_NAME, 'blocks-for-eventbrite');

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
            ],
            'dateFormat' => [
                'type' => 'string',
                'default' => get_option('date_format')
            ],
            'timeFormat' => [
                'type' => 'string',
                'default' => get_option('time_format')
            ],
            'signUpButtonText' => [
                'type' => 'string',
                'default' => 'Sign Up'
            ],
            'pageSize' => [
                'type' => 'number',
                'default' => 50
            ],
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
                'title' => __('Blocks For Eventbrite', 'blocks-for-eventbrite'),
                'icon'  => null,
            ),
        )
    );
});

/**
 * Register block type callback render_callback
 *
 * @param $attributes
 * @return false|string|void
 */
function render_blocks_for_eventbrite_card($attributes)
{
    $blocks = new RenderBlocksForEventbriteCard($attributes);
    return $blocks->render();
}
