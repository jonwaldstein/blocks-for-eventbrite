import { React, Fragment, useState } from '@wordpress/element';
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
	Icon,
	close,
} from '@wordpress/components';
import { InspectorControls, BlockControls, JustifyContentControl } from '@wordpress/block-editor';
import { dispatch, select } from '@wordpress/data';
import axios from 'axios';
import { __ } from '@wordpress/i18n';
import { getLocalizeData } from '../utilities';
import Event from '../components/Event';
import styles from '../style.module.css';
import classNames from 'classnames/bind';
import EventList from "./EventList";

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
		itemJustification,
	} = attributes;

	const [ apiKeyState, setApiKeyState ] = useState( apiKey );
	const [ apiKeyLoading, setApiKeyLoading ] = useState( false );
	const [ apiKeyError, setApiKeyError ] = useState( false );
	const [ organizationName, setOrganizationName ] = useState( false );

	const defaultColors = [ { name: 'orange', color: '#d6472b' } ];

	const mockEvents = [
		{
			id: '1',
			name: {
				text: 'Test Event 1'
			},
			url: 'http://example.com',
			description: {
				text: 'Test description'
			},
			summary: 'Test summary',
			ticket_classes: [
				{
					cost: {
						display: '$25',
					}
				}
			],
			start: {
				local: new Date(2022,3, 26).toString(),
			},
			logo: {
				original: {
					url: assets?.placeholderImage
						? assets?.placeholderImage
						: 'https://placekitten.com/500/500'
				}
			},
			status: 'live',
			venue: {
				name: 'Test Venue',
				address: {
					city: 'Providence',
					region: 'RI',
				}
			},
		},
		{
			id: '2',
			name: {
				text: 'Test Event 2'
			},
			url: 'http://example.com',
			description: {
				text: 'Test 2 description'
			},
			summary: 'Test summary',
			ticket_classes: [
				{
					cost: {
						display: '$65',
					}
				}
			],
			start: {
				local: new Date(2022,9, 14).toString(),
			},
			logo: {
				original: {
					url: assets?.placeholderImage
						? assets?.placeholderImage
						: 'https://placekitten.com/500/500'
				}
			},
			status: 'live',
			venue: {
				name: 'Test Venue',
				address: {
					city: 'Providence',
					region: 'RI',
				}
			},
		},
	]

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
								<>
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
								</>
							}
							onChange={ ( newApiKey ) => {
								setApiKeyState( newApiKey );
							} }
						/>
					</PanelRow>
					{ apiKeyError && (
						<PanelRow className={ cx( 'text-red-700' ) }>
							{ apiKeyError }
						</PanelRow>
					) }
					{ organizationName && (
						<PanelRow className={ cx( 'text-green-700' ) }>
							{ __(
								'Organization name',
								'blocks-for-eventbrite'
							) }
							: { organizationName }
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
				<PanelBody title="Eventbrite Event Layout">
					<PanelRow>
						<SelectControl
							label="Position"
							value={ itemJustification }
							options={ [
								{
									label: __(
										'Left',
										'blocks-for-eventbrite'
									),
									value: 'left',
								},
								{
									label: __(
										'Right',
										'blocks-for-eventbrite'
									),
									value: 'right',
								},,
								{
									label: __(
										'Center',
										'blocks-for-eventbrite'
									),
									value: 'center',
								},,
								{
									label: __(
										'Space Between',
										'blocks-for-eventbrite'
									),
									value: 'space-between',
								},
							] }
							onChange={ ( next ) => {
								let justification;
								switch(next) {
									case 'left':
										justification = 'start';
										break;
									case 'right':
										justification = 'end';
										break;
									case 'space-between':
										justification = 'between';
										break;
									default:
										justification = next;
								}
								setAttributes( { itemJustification: justification } );
							} }
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
			<BlockControls>
				<JustifyContentControl
					value={ itemJustification }
					onChange={ ( next ) => {
						let justification;
						switch(next) {
							case 'left':
								justification = 'start';
								break;
							case 'right':
								justification = 'end';
								break;
							case 'space-between':
								justification = 'between';
								break;
							default:
								justification = next;
						}
						setAttributes( { itemJustification: justification } );
					} }
				/>
			</BlockControls>
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
					<div className={cx('flex', 'flex-row', 'blocks-for-eventbrite-css-wrapper', 'items-center' )}>
						<EventList events={ mockEvents } attributes={ attributes } />
					</div>
				) }
			</Fragment>
		</Fragment>
	);
}
