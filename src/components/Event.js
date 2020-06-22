import { useEffect } from '@wordpress/element';
import { format } from '@wordpress/date';
import Tippy, { useSingleton } from '@tippyjs/react';
import '../vendor/eventbrite';
import styles from '../style.module.css';
import classNames from 'classnames/bind';

const cx = classNames.bind( styles );

const baseButtonStyles = [
	'font-sans',
	'antialiased',
	'font-semibold',
	'text-sm',
	'py-1',
	'px-4',
	'rounded',
	'transition',
	'duration-300',
	'ease-in-out',
	'hover:opacity-90',
	'focus:opacity-90',
	'active:opacity-90',
];

const baseButtonLinkStyles = [
	'text-blue-700',
	'hover:text-black',
	'focus:text-black',
	'active:text-black',
	'underline',
	'font-sans',
	'antialiased',
	'font-semibold',
	'text-sm',
	'py-1',
	'transition',
	'duration-200',
	'ease-in-out',
];

export default function Event( {
	id,
	title,
	description,
	url,
	summary,
	cost,
	startDate,
	image,
	status,
	colors,
	venue,
	className,
} ) {
	const [ source, target ] = useSingleton();

	useEffect( () => {
		if ( ! id ) return;
		// eslint-disable-next-line no-undef
		EBWidgets.createWidget( {
			widgetType: 'checkout',
			eventId: id,
			modal: true,
			modalTriggerElementId: `eventbrite-widget-modal-trigger-${ id }`,
		} );
	}, [ id ] );

	const { signUpButtonBackgroundColor } = colors;

	return (
		<article
			className={ cx(
				'event__single',
				'max-w-xs',
				'w-full',
				'px-2',
				'mb-4',
				'h-full',
				'font-sans',
				className
			) }
		>
			<div>
				{ image ? (
					<img
						src={ image }
						className={ cx(
							'block',
							'h-32',
							'flex-none',
							'object-cover',
							'object-center',
							'rounded-t',
							'text-center',
							'w-full',
							'overflow-hidden',
							'border-none'
						) }
						alt={ title }
					/>
				) : null }
				<div
					className={ cx(
						'border-r',
						'border-b',
						'border-l',
						'border-grey-light',
						'bg-white',
						'rounded-b',
						'py-4',
						'px-2',
						'flex',
						'flex-col',
						'justify-between',
						'leading-normal',
						'shadow-md'
					) }
				>
					<div className={ cx( 'event__details', 'flex' ) }>
						<div className={ cx( 'event__details--left' ) }>
							<div
								className={ cx(
									'event__details--dateWrapper',
									'text-center'
								) }
							>
								<p
									className={ cx(
										'event__details--dateMonth',
										'text-sm',
										'text-orange-eventbrite',
										'uppercase',
										'my-0',
										'font-sans',
										'leading-tight',
										'whitespace-no-wrap'
									) }
								>
									<time>{ format( 'M', startDate ) }</time>
								</p>
								<p
									className={ cx(
										'event__details--dateDay',
										'text-xl',
										'text-grey-800',
										'my-0',
										'font-sans',
										'whitespace-no-wrap'
									) }
								>
									<time>{ format( 'd', startDate ) }</time>
								</p>
							</div>
						</div>
						<div
							className={ cx(
								'event__details--right',
								'event__details--right',
								'pl-2',
								'truncate',
								'pb-2',
								'pr-2',
								'w-full'
							) }
						>
							<div
								className={ cx(
									'event__details--rightInnerTop'
								) }
							>
								<h3
									className={ cx(
										'm-0',
										'text-black',
										'hover:text-blue-700',
										'font-semibold',
										'text-sm',
										'truncate',
										'duration-300',
										'transition-all'
									) }
								>
									{ url ? (
										<a
											href={ url }
											target="_blank"
											rel="noopener noreferrer"
										>
											{ title }
										</a>
									) : (
										title
									) }
								</h3>
								<div
									className={ cx(
										'event__details--dateWrapper'
									) }
								>
									<time
										className={ cx(
											'event__details--date',
											'font-sans',
											'text-grey-dark',
											'text-xs',
											'font-medium',
											'm-0'
										) }
									>
										{ format(
											'D, M d Y, g:ia',
											startDate
										) }
									</time>
								</div>
								{ venue && (
									<div
										className={ cx(
											'event__details--venue'
										) }
									>
										{ venue.name && (
											<p
												className={ cx(
													'font-sans',
													'text-grey-dark',
													'text-xs',
													'm-0',
													'truncate'
												) }
											>
												{ venue.name }
											</p>
										) }
										{ venue.address?.city &&
											venue.address?.region && (
												<p
													className={ cx(
														'font-sans',
														'text-grey-dark',
														'text-xs',
														'm-0',
														'truncate'
													) }
												>
													{ venue.address.city },{ ' ' }
													{ venue.address.region }
												</p>
											) }
									</div>
								) }
								{ cost && (
									<p
										className={ cx(
											'text-sm',
											'text-grey-dark',
											'flex',
											'items-center',
											'font-sans',
											'mb-2',
											'mt-0'
										) }
									>
										<span>{ cost }</span>
									</p>
								) }
							</div>
							<div
								className={ cx(
									'event__details--rightInnerBottom'
								) }
							>
								<div
									className={ cx(
										'event__details--buttonWrapper',
										'flex',
										'justify-between'
									) }
								>
									{ summary ? (
										<Tippy
											content={
												<p className={ cx( 'p-2' ) }>
													{ summary }
												</p>
											}
											singleton={ target }
										>
											<button
												className={ cx(
													baseButtonLinkStyles
												) }
											>
												Details
											</button>
										</Tippy>
									) : null }
									{ status === 'live' ? (
										<button
											id={ `eventbrite-widget-modal-trigger-${ id }` }
											type="button"
											className={ cx(
												baseButtonStyles,
												'text-white',
												'mr-2',
												{
													'bg-orange-eventbrite': ! signUpButtonBackgroundColor,
												}
											) }
											style={ {
												backgroundColor: signUpButtonBackgroundColor,
											} }
										>
											Sign up
										</button>
									) : null }
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Tippy
				singleton={ source }
				trigger="click"
				theme="light"
				animation="shift-away"
				className={ cx( 'blocks-for-eventbrite-css-wrapper' ) }
			/>
		</article>
	);
}
