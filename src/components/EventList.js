import PropTypes from 'prop-types';
import Event from './Event';
import styles from '../style.module.css';
import classNames from 'classnames/bind';

const cx = classNames.bind( styles );

export default function EventList( { events, attributes } ) {
	const {
		signUpButtonBackgroundColor,
		noEventsText,
		dateFormat,
		timeFormat,
	} = attributes;

	return (
		<div className={ cx( 'flex', 'flex-wrap', 'justify-center' ) }>
			{ events?.length > 0 ? (
				events.map( ( event ) => (
					<Event
						key={ event.id }
						id={ event.id }
						title={ event.name.text }
						description={ event.description.text }
						url={ event.url }
						summary={ event.summary }
						cost={ event.ticket_classes?.[ 0 ]?.cost?.display }
						startDate={ event.start.local }
						image={ event.logo?.original.url }
						status={ event.status }
						venue={ event.venue }
						colors={ {
							signUpButtonBackgroundColor,
						} }
						dateFormat={ dateFormat }
						timeFormat={ timeFormat }
					/>
				) )
			) : (
				<p className={ cx( 'text-base', 'text-orange-eventbrite' ) }>
					{ noEventsText }
				</p>
			) }
		</div>
	);
}

EventList.defaultProps = {
	events: [],
};

EventList.PropTypes = {
	events: PropTypes.array,
	attributes: PropTypes.object.isRequired,
	dateFormat: PropTypes.string.isRequired,
	timeFormat: PropTypes.string.isRequired,
};
