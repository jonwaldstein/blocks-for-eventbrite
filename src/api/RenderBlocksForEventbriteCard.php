<?php
/**
 * The main render callback class
 */
class RenderBlocksForEventbriteCard
{
    public $attributes;
    private $transientKey;
    private $transient;

    /**
     * RenderBlocksForEventbriteCard constructor.
     * @param  array  $attributes
     */
    public function __construct(array $attributes)
    {
        $this->attributes = $attributes;
        $this->transientKey = $this->getTransientKey();
        $this->transient = get_transient($this->transientKey);
    }

    /**
     * Enqueue scripts
     * @return void
     */
    protected function enqueueScripts()
    {
        // enqueue our script for the front-end
        wp_enqueue_script(BLOCKS_FOR_EVENTBRITE_SCRIPT_NAME);

        // access our transient data in js
        wp_localize_script(
            BLOCKS_FOR_EVENTBRITE_SCRIPT_NAME,
            BLOCKS_FOR_EVENTBRITE_LOCALIZED_SCRIPT_NAME,
            [
                'events' => $this->transient['events'],
                'attributes' => $this->transient['attributes'],
            ]
        );
    }

    /**
     * Set transient key based on the individual blocks
     * @return string
     */
    protected function getTransientKey()
    {
        return "blocks_for_eventbrite_{$this->attributes['id']}";
    }

    /**
     * Set transient
     * @param mixed $transient
     * @return void
     */
    protected function setTransient($transient)
    {
        $this->transient = $transient;
    }

    /**
     * Fetch events
     * @return void
     */
    protected function fetchEvents()
    {
        $status = !empty($this->attributes['status']) ? $this->attributes['status'] : 'live';
        $orderBy = !empty($this->attributes['orderBy']) ? $this->attributes['orderBy'] : 'start_asc';
        $nameFilter = !empty($this->attributes['nameFilter']) ? $this->attributes['nameFilter'] : null;

        // make GET request to eventbrite api to get the user's organization ID
        $userResponse = wp_remote_get("https://www.eventbriteapi.com/v3/users/me/organizations?token={$this->attributes['apiKey']}");

        // decode fetched data to json
        $userData = json_decode(wp_remote_retrieve_body($userResponse), true);

        // get the organization id
        $userOrganization = $userData['organizations'][0]['id'];

        // build api call url
        $organizationEventsUrl = urldecode("https://www.eventbriteapi.com/v3/organizations/{$userOrganization}/events/?" . http_build_query(
            [
                'token' => $this->attributes['apiKey'],
                'expand' => 'ticket_classes,venue',
                'status' => $status,
                'order_by' => $orderBy,
                'time_filter' => 'current_future',
                'name_filter' => $nameFilter,
                'page_size' => $this->attributes['pageSize']
            ],
            '',
            '&'
        ));

        // make GET request to eventbrite api based on user's attribute settings
        $response = wp_remote_get($organizationEventsUrl);

        // decode fetched data to json
        $data = json_decode(wp_remote_retrieve_body($response), true);

        // set transient data with current transient key for 1 minute
        set_transient($this->transientKey, [
            'events' => $data['events'],
            'attributes' => $this->attributes,
            'date' => date('Y-m-d'),
        ], 60);

        // set transient based on current block
        $this->setTransient(get_transient($this->transientKey));
    }

    /**
     * Render cards
     * @return string|false|void
     */
    public function render()
    {
        // do not render in the backend
        if (is_admin()) {
            return;
        }

        // if transient is empty or attributes have changed then fetch events
        if (!$this->transient || $this->transient['attributes'] !== $this->attributes) {
            $this->fetchEvents();
        }

        // remove apiKey from attributes so it's not accessible on the front-end
        if (!empty($this->transient['attributes']['apiKey'])) {
            unset($this->transient['attributes']['apiKey']);
        }

        // enqueue scripts
        $this->enqueueScripts();

        // start buffer
        ob_start();

        // use js to render events in this div
        echo '<div id="root-blocks-for-eventbrite" class="blocks-for-eventbrite blocks-for-eventbrite-css-wrapper"></div>';

        // return clean buffer
        return ob_get_clean();
    }
}
