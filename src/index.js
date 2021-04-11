import { render } from '@wordpress/element';
import domReady from '@wordpress/dom-ready';

import EventList from './components/EventList';
import { getLocalizeData } from './utilities';
import './blocks/event-cards';

import 'tippy.js/themes/light.css';
import 'tippy.js/themes/light-border.css';
import 'tippy.js/animations/shift-away.css';
import './base.css';

const [ events, attributes, siteSettings ] = getLocalizeData(
	'events',
	'attributes',
	'siteSettings'
);

function App() {
	return (
		<EventList
			events={ events }
			attributes={ attributes }
			dateFormat={ siteSettings.dateFormat }
			timeFormat={ siteSettings.timeFormat }
		/>
	);
}

domReady( function() {
	if ( document.getElementById( 'root-blocks-for-eventbrite' ) ) {
		render(
			<App />,
			document.getElementById( 'root-blocks-for-eventbrite' )
		);
	}
} );
