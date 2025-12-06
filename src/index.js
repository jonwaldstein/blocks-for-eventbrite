import { createRoot } from '@wordpress/element';
import domReady from '@wordpress/dom-ready';

import EventList from './components/EventList';
import { getLocalizeData, getDefaultAttributes } from './utilities';
import './blocks/event-cards';

import 'tippy.js/themes/light.css';
import 'tippy.js/themes/light-border.css';
import 'tippy.js/animations/shift-away.css';
import './base.css';

const [ events, attributes ] = getLocalizeData( 'events', 'attributes' );

function App() {
	return <EventList events={ events } attributes={ getDefaultAttributes( attributes ) } />;
}

domReady( function() {
    const root = document.getElementById( 'root-blocks-for-eventbrite' );
	if ( root ) {
		createRoot( root ).render( <App /> );
	}
} );
