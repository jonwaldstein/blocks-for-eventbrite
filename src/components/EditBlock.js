import { Fragment, useState } from '@wordpress/element';
import {
	SelectControl,
	TextControl,
	PanelBody,
	PanelRow,
	ColorPalette,
	Button,
	Spinner,
	Dashicon,
} from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';
import { dispatch, select } from '@wordpress/data';
import axios from 'axios';
import { getLocalizeData } from '../utilities';
import Event from '../components/Event';
import styles from '../style.module.css';
import classNames from 'classnames/bind';

const cx = classNames.bind( styles );

const [ assets ] = getLocalizeData( 'assets' );

export default function EditBlock( { attributes, setAttributes } ) {
	const {
		signUpButtonBackgroundColor,
		apiKey,
		status,
		orderBy,
		noEventsText,
	} = attributes;

	const [ apiKeyState, setApiKeyState ] = useState( apiKey );
	const [ apiKeyLoading, setApiKeyLoading ] = useState( false );
	const [ apiKeyError, setApiKeyError ] = useState( false );

	const defaultColors = [ { name: 'orange', color: '#d6472b' } ];

	const testApiKey = () => {
		setApiKeyLoading( true );
		axios
			.get(
				`https://www.eventbriteapi.com/v3/users/me/?token=${ apiKeyState }`
			)
			.then( ( response ) => {
				setApiKeyLoading( false );
				setAttributes( { apiKey: apiKeyState } );
				setApiKeyError( false );
				setAttributes( {
					id: select( 'core/editor' ).getCurrentPostId(),
				} );
				dispatch( 'core/editor' ).savePost();
			} )
			.catch( ( error ) => {
				setApiKeyLoading( false );
				setApiKeyError( error.response.data.error_description );
				setAttributes( { apiKey: null } );
			} );
	};

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title="Eventbrite Api Settings" initialOpen={ true }>
					<PanelRow>
						<TextControl
							label="Api Token Key"
							value={ apiKeyState }
							help={
								<p>
									Get api token{ ' ' }
									<a
										href="https://www.eventbrite.com/platform/api-keys"
										target="_blank"
										rel="noopener noreferrer"
										className={ cx( 'text-blue-500' ) }
									>
										here
									</a>
								</p>
							}
							onChange={ ( newApiKey ) => {
								setApiKeyState( newApiKey );
							} }
						/>
					</PanelRow>
					{ apiKeyError && (
						<PanelRow>
							<p className={ cx( 'text-red-700' ) }>
								{ apiKeyError }
							</p>
						</PanelRow>
					) }
					<PanelRow>
						<Button
							isSecondary
							isBusy={ apiKeyLoading }
							onClick={ () => testApiKey( apiKeyState ) }
						>
							Save Api Key
						</Button>
						<div className="jw-text-center">
							{ apiKeyLoading && <Spinner /> }
						</div>
					</PanelRow>
				</PanelBody>
				<PanelBody title="Eventbrite Event Setttings">
					<PanelRow>
						<SelectControl
							label="Status"
							value={ status }
							options={ [
								{ label: 'Live', value: 'live' },
								{ label: 'Draft', value: 'draft' },
								{ label: 'All', value: 'all' },
							] }
							onChange={ ( newStatus ) => {
								setAttributes( { status: newStatus } );
							} }
						/>
					</PanelRow>
					<PanelRow>
						<SelectControl
							label="Order By"
							value={ orderBy }
							options={ [
								{
									label: 'Start Date Ascending',
									value: 'start_asc',
								},
								{
									label: 'Start Date Descending',
									value: 'start_desc',
								},
								{
									label: 'Name Ascending',
									value: 'name_asc',
								},
								{
									label: 'Name Descending',
									value: 'name_desc',
								},
							] }
							onChange={ ( newOrderBy ) => {
								setAttributes( { orderBy: newOrderBy } );
							} }
						/>
					</PanelRow>
					<PanelRow>
						<TextControl
							label="No events message"
							help="This is the text that displays in place of your events when there are none to display."
							value={ noEventsText }
							onChange={ ( newNoEventsText ) =>
								setAttributes( {
									noEventsText: newNoEventsText,
								} )
							}
						/>
					</PanelRow>
				</PanelBody>
				<PanelBody title="Eventbrite Design Settings">
					<PanelRow>
						<label htmlFor="secondButtonBackgroundColor">
							Signup button background color
						</label>
					</PanelRow>
					<PanelRow>
						<ColorPalette
							id="secondButtonBackgroundColor"
							value={ signUpButtonBackgroundColor }
							onChange={ ( newColor ) =>
								setAttributes( {
									signUpButtonBackgroundColor: newColor,
								} )
							}
							colors={ defaultColors }
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>

			<Fragment>
				{ ! apiKey ? (
					<div
						className={ cx(
							'bg-red-900',
							'text-center',
							'py-4',
							'lg:px-4',
							'font-sans',
							'rounded'
						) }
					>
						<div
							className={ cx(
								'p-2',
								'items-center',
								'text-indigo-100',
								'bg-red-800',
								'lg:rounded-full',
								'flex',
								'lg:inline-flex'
							) }
							role="alert"
						>
							<div className={ cx( 'mr-8' ) }>
								<Dashicon icon="info" size={ 32 } />
							</div>
							<span
								className={ cx(
									'font-medium',
									'mr-2',
									'text-left',
									'flex-auto'
								) }
							>
								An Api Token Key is required. Please enter your
								Eventbrite Api Token Key in the block settings.
							</span>
						</div>
					</div>
				) : (
					<div className="blocks-for-eventbrite-css-wrapper">
						<p className={ cx( 'font-sans', 'text-center' ) }>
							This is a static preview of how your event card will
							look. Each event pulled from your Eventbrite account
							will be displayed in this format on the
							front&ndash;end of your website.
						</p>
						<Event
							className={ cx( 'mx-auto' ) }
							title={ 'Event Title' }
							description={ 'Event description' }
							summary={ 'Event description summary' }
							cost={ '$25' }
							startDate={ new Date() }
							image={
								assets?.placeholderImage
									? assets?.placeholderImage
									: 'https://placekitten.com/500/500'
							}
							status={ 'live' }
							colors={ {
								signUpButtonBackgroundColor,
							} }
							venue={ {
								name: 'Venue name',
								address: {
									city: 'Providence',
									region: 'RI',
								},
							} }
						/>
					</div>
				) }
			</Fragment>
		</Fragment>
	);
}
