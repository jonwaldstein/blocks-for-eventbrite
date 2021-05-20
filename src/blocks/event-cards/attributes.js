import { __ } from '@wordpress/i18n';

export default {
	id: {
		type: 'number',
	},
	apiKey: {
		type: 'string',
	},
	status: {
		type: 'string',
		default: 'live',
	},
	orderBy: {
		type: 'string',
		default: 'start_asc',
	},
	signUpButtonBackgroundColor: {
		type: 'string',
	},
	signUpButtonText: {
		type: 'string',
		default: __( 'Sign Up', 'blocks-for-eventbrite' ),
	},
	noEventsText: {
		type: 'string',
		default: __(
			'There are no events at this time. Please check back for upcoming events.',
			'blocks-for-eventbrite'
		),
	},
	nameFilter: {
		type: 'string',
	},
	dateFormat: {
		type: 'string',
		default: 'F j, Y',
	},
	timeFormat: {
		type: 'string',
		default: 'g:i a',
	},
	pageSize: {
		type: 'number',
		default: 50,
	},
};
