import { getSettings as getDateSettings } from '@wordpress/date';
import { __ } from '@wordpress/i18n';

const defaults = {
	signUpButtonText: () => __( 'Sign Up', 'blocks-for-eventbrite' ),
	noEventsText: () => __( 'There are no events at this time. Please check back for upcoming events.', 'blocks-for-eventbrite' ),
	dateFormat: () => getDateSettings()?.formats?.date || 'F j, Y',
	timeFormat: () => getDateSettings()?.formats?.time || 'g:i a',
};

export default function getDefaultAttributes( attributes = {} ) {
	return {
		...attributes,
		signUpButtonText: attributes.signUpButtonText || defaults.signUpButtonText(),
		noEventsText: attributes.noEventsText || defaults.noEventsText(),
		dateFormat: attributes.dateFormat || defaults.dateFormat(),
		timeFormat: attributes.timeFormat || defaults.timeFormat(),
	};
}

