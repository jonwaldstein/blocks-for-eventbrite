import { Fragment, useState } from '@wordpress/element';
import {
	SelectControl,
	TextControl,
	__experimentalNumberControl as NumberControl,
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
import { __ } from '@wordpress/i18n';
import { getLocalizeData } from '../utilities';
import Event from '../components/Event';
import styles from '../style.module.css';
import classNames from 'classnames/bind';

const cx = classNames.bind( styles );

const [ assets ] = getLocalizeData( 'assets' );

export default function EditBlock( { attributes, setAttributes } ) {
	const {
		signUpButtonBackgroundColor,
		signUpButtonText,
		apiKey,
		status,
		orderBy,
		noEventsText,
		dateFormat,
		timeFormat,
		nameFilter,
		pageSize,
	} = attributes;

	const [ apiKeyState, setApiKeyState ] = useState( apiKey );
	const [ apiKeyLoading, setApiKeyLoading ] = useState( false );
	const [ apiKeyError, setApiKeyError ] = useState( false );
	const [ organizationName, setOrganizationName ] = useState( false );

	const defaultColors = [ { name: 'orange', color: '#d6472b' } ];

	const testApiKey = () => {
		setApiKeyLoading( true );
		axios
			.get(
				`https://www.eventbriteapi.com/v3/users/me/organizations/?token=${ apiKeyState }`
			)
			.then( ( response ) => {
				setApiKeyLoading( false );
				setOrganizationName( response.data.organizations?.[ 0 ].name );
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
									{ __(
										'Get api token',
										'blocks-for-eventbrite'
									) }{ ' ' }
									<a
										href="https://www.eventbrite.com/platform/api-keys"
										target="_blank"
										rel="noopener noreferrer"
										className={ cx( 'text-blue-500' ) }
									>
										{ __(
											'here',
											'blocks-for-eventbrite'
										) }
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
					{ organizationName && (
						<PanelRow>
							<p className={ cx( 'text-green-700' ) }>
								{ __(
									'Organization name',
									'blocks-for-eventbrite'
								) }
								: { organizationName }
							</p>
						</PanelRow>
					) }
					<PanelRow>
						<Button
							isSecondary
							isBusy={ apiKeyLoading }
							onClick={ () => testApiKey( apiKeyState ) }
						>
							{ __( 'Save Api Key', 'blocks-for-eventbrite' ) }
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
								{
									label: __(
										'Live',
										'blocks-for-eventbrite'
									),
									value: 'live',
								},
								{
									label: __(
										'Draft',
										'blocks-for-eventbrite'
									),
									value: 'draft',
								},
								{
									label: __( 'All', 'blocks-for-eventbrite' ),
									value: 'all',
								},
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
									label: __(
										'Start Date Ascending',
										'blocks-for-eventbrite'
									),
									value: 'start_asc',
								},
								{
									label: __(
										'Start Date Descending',
										'blocks-for-eventbrite'
									),
									value: 'start_desc',
								},
								{
									label: __(
										'Name Ascending',
										'blocks-for-eventbrite'
									),
									value: 'name_asc',
								},
								{
									label: __(
										'Name Descending',
										'blocks-for-eventbrite'
									),
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
							label={ __(
								'No events message',
								'blocks-for-eventbrite'
							) }
							help={ __(
								'This is the text that displays in place of your events when there are none to display.',
								'blocks-for-eventbrite'
							) }
							value={ noEventsText }
							onChange={ ( newNoEventsText ) =>
								setAttributes( {
									noEventsText: newNoEventsText,
								} )
							}
						/>
					</PanelRow>
					<PanelRow>
						<TextControl
							label={ __(
								'Event name filter',
								'blocks-for-eventbrite'
							) }
							help={ __(
								'This will only display the events based on these event title keywords.',
								'blocks-for-eventbrite'
							) }
							value={ nameFilter }
							onChange={ ( newNameFilter ) =>
								setAttributes( {
									nameFilter: newNameFilter,
								} )
							}
						/>
					</PanelRow>
					<PanelRow>
						<NumberControl
							label={ __(
								'Event number limit',
								'blocks-for-eventbrite'
							) }
							help={ __(
								'This will only display the number of events you have defined.',
								'blocks-for-eventbrite'
							) }
							value={ pageSize }
							onChange={ ( newPageSize ) =>
								setAttributes( {
									pageSize: Number( newPageSize ),
								} )
							}
						/>
					</PanelRow>
				</PanelBody>
				<PanelBody
					title={ __(
						'Eventbrite Button Settings',
						'blocks-for-eventbrite'
					) }
				>
					<PanelRow>
						<label htmlFor="secondButtonBackgroundColor">
							{ __(
								'Signup button background color',
								'blocks-for-eventbrite'
							) }
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
					<PanelRow>
						<TextControl
							label="Signup Button Text"
							value={ signUpButtonText }
							onChange={ ( newSignUpButtonText ) =>
								setAttributes( {
									signUpButtonText: newSignUpButtonText,
								} )
							}
						/>
					</PanelRow>
				</PanelBody>
				<PanelBody
					title={ __(
						'Eventbrite Date Settings',
						'blocks-for-eventbrite'
					) }
				>
					<PanelRow>
						<TextControl
							label="Date Format"
							value={ dateFormat }
							help={
								<a
									href="https://wordpress.org/support/article/formatting-date-and-time/"
									target="_blank"
									rel="noopener noreferrer"
									className={ cx( 'text-blue-500' ) }
								>
									{ __(
										'Documentation on date and time formatting.',
										'blocks-for-eventbrite'
									) }
								</a>
							}
							onChange={ ( newDateFormat ) =>
								setAttributes( {
									dateFormat: newDateFormat,
								} )
							}
						/>
					</PanelRow>
					<PanelRow>
						<TextControl
							label="Time Format"
							value={ timeFormat }
							help={
								<a
									href="https://wordpress.org/support/article/formatting-date-and-time/"
									target="_blank"
									rel="noopener noreferrer"
									className={ cx( 'text-blue-500' ) }
								>
									{ __(
										'Documentation on date and time formatting.',
										'blocks-for-eventbrite'
									) }
								</a>
							}
							onChange={ ( newTimeFormat ) =>
								setAttributes( {
									timeFormat: newTimeFormat,
								} )
							}
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
								{ __(
									'An Api Token Key is required. Please enter your Eventbrite Api Token Key in the block settings.',
									'blocks-for-eventbrite'
								) }
							</span>
						</div>
					</div>
				) : (
					<div className="blocks-for-eventbrite-css-wrapper">
						<p className={ cx( 'font-sans', 'text-center' ) }>
							{ __(
								'This is a static preview of how your event card will look.  Each event pulled from your Eventbrite account will be displayed in this format on the frontend of your website.',
								'blocks-for-eventbrite'
							) }
						</p>
						<Event
							className={ cx( 'mx-auto' ) }
							title={ __(
								'Event Title',
								'blocks-for-eventbrite'
							) }
							description={ 'Event description' }
							summary={ 'Event description summary' }
							cost={ '$25' }
							startDate={ new Date() }
							dateFormat={ dateFormat }
							timeFormat={ timeFormat }
							image={
								assets?.placeholderImage
									? assets?.placeholderImage
									: 'https://placekitten.com/500/500'
							}
							status={ 'live' }
							colors={ {
								signUpButtonBackgroundColor,
							} }
							signUpButtonText={ signUpButtonText }
							venue={ {
								name: __(
									'Venue name',
									'blocks-for-eventbrite'
								),
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
