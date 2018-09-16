/**
 * External Dependencies
 */
import { filter, pick } from 'lodash';

/**
 * WordPress dependencies
 */
const { Component, Fragment } = wp.element;
const { __ } = wp.i18n;
const {
	IconButton,
	DropZone,
	FormFileUpload,
	PanelBody,
	RangeControl,
	SelectControl,
	ToggleControl,
	Toolbar,
	withNotices,
} = wp.components;
const {
	BlockControls,
	MediaUpload,
	MediaPlaceholder,
	InspectorControls,
	mediaUpload,
} = wp.editor;

/**
 * Internal dependencies
 */
import { carouselSelectImage , CarouselSpecificSelect } from './carousel-image';

import React from 'react';

import 'owl.carousel';
import 'owl.carousel/src/scss/owl.carousel.scss';
import 'owl.carousel/src/scss/owl.theme.default.scss';

const MAX_COLUMNS = 8;
const linkOptions = [
	{ value: 'attachment', label: __( 'Attachment Page' ) },
	{ value: 'media', label: __( 'Media File' ) },
	{ value: 'none', label: __( 'None' ) },
];

export function defaultColumnsNumber( attributes ) {
	return Math.min( 3, attributes.images.length );
}

class carouselEdit extends Component {
	constructor() {
		super( ...arguments );

		this.onSelectImage = this.onSelectImage.bind( this );
		this.onSelectImages = this.onSelectImages.bind( this );
		this.setLinkTo = this.setLinkTo.bind( this );
		this.setColumnsNumber = this.setColumnsNumber.bind( this );
		this.toggleImageCrop = this.toggleImageCrop.bind( this );
		this.onRemoveImage = this.onRemoveImage.bind( this );
		this.setImageAttributes = this.setImageAttributes.bind( this );
		this.addFiles = this.addFiles.bind( this );
		this.uploadFromFiles = this.uploadFromFiles.bind( this );

		this.state = {
			selectedImage: null,
		};

		this.$carousel = React.createRef();
	}

	onSelectImage( index ) {
		return () => {
			if ( this.state.selectedImage !== index ) {
				this.setState( {
					selectedImage: index,
				} );
			}
		};
	}

	onRemoveImage( index ) {
		return () => {
			const images = filter( this.props.attributes.images, ( img, i ) => index !== i );
			const { columns } = this.props.attributes;
			this.setState( { selectedImage: null } );
			this.props.setAttributes( {
				images,
				columns: columns ? Math.min( images.length, columns ) : columns,
			} );
		};
	}

	onSelectImages( image ) {
		this.props.attributes.images.push(image);
		this.props.setAttributes( {
			images:  this.props.attributes.images.slice()
		} );
	}

	setLinkTo( value ) {
		this.props.setAttributes( { linkTo: value } );
	}

	setColumnsNumber( value ) {
		this.props.setAttributes( { columns: value } );
	}

	toggleImageCrop() {
		this.props.setAttributes( { imageCrop: ! this.props.attributes.imageCrop } );
	}

	getImageCropHelp( checked ) {
		return checked ? __( 'Thumbnails are cropped to align.' ) : __( 'Thumbnails are not cropped.' );
	}

	setImageAttributes( index, attributes ) {
		const { attributes: { images }, setAttributes } = this.props;
		if ( ! images[ index ] ) {
			return;
		}
		setAttributes( {
			images: [
				...images.slice( 0, index ),
				{
					...images[ index ],
					...attributes,
				},
				...images.slice( index + 1 ),
			],
		} );
	}

	uploadFromFiles( event ) {
		this.addFiles( event.target.files );
	}

	addFiles( files ) {
		const currentImages = this.props.attributes.images || [];
		const { noticeOperations, setAttributes } = this.props;
		mediaUpload( {
			allowedType: 'image',
			filesList: files,
			onFileChange: ( images ) => {
				setAttributes( {
					images: currentImages.concat( images ),
				} );
			},
			onError: noticeOperations.createErrorNotice,
		} );
	}

	componentDidUpdate( prevProps ) {
		// Deselect images when deselecting the block
		if ( ! this.props.isSelected && prevProps.isSelected ) {
			this.setState( {
				selectedImage: null,
				captionSelected: false,
			} );
		}

		const options = {
		//	autoplay: autoplay,
		//	items: itemsPerPage,
			slideBy: 'page'
		};

		var carousel = $(this.$carousel.current);

		if (carousel) {
			carousel.trigger('destroy.owl.carousel');
		}
		carousel.owlCarousel(options);

	}

	componentDidMount () {

		const options = {
		//	autoplay: autoplay,
		//	items: itemsPerPage,
			slideBy: 'page'
		};

		var carousel = $(this.$carousel.current);

		if (carousel) {
			carousel.trigger('destroy.owl.carousel');
		}

		carousel.owlCarousel(options);

			//	this.$carousel = $('.owl-theme').owlCarousel(options);


	}

	render() {
		const { attributes, isSelected, className, noticeOperations, noticeUI } = this.props;
		const { images, columns = defaultColumnsNumber( attributes ), align, imageCrop, linkTo } = attributes;

		const dropZone = (
			<DropZone
				onFilesDrop={ this.addFiles }
			/>
		);

		// destroy before re-render
		var carousel = $(this.$carousel.current);
		if (carousel) {
			carousel.trigger('destroy.owl.carousel');
		}

		const controls =  (
			<BlockControls>
				{ !! images.length && (
					<Toolbar>
						<MediaUpload
							onSelect={ this.onSelectImages }
							type="image"
							carousel
							value={ images.map( ( img ) => img.id ) }
							render={ ( { open } ) => (
								<IconButton
									className="components-toolbar__control"
									label={ __( 'Edit carousel' ) }
									icon="edit"
									onClick={ open }
								/>
							) }
						/>
					</Toolbar>
				) }
			</BlockControls>
		);

		if ( images.length === 0 ) {
			return (
				<Fragment>
					{ controls }
					<MediaPlaceholder
						icon="format-carousel"
						className={ className }
						labels={ {
							title: __( 'carousel' ),
							name: __( 'images' ),
						} }
						onSelect={ this.onSelectImages }
						accept="image/*"
						type="image"
						notices={ noticeUI }
						onError={ noticeOperations.createErrorNotice }
					/>
				</Fragment>
			);
		}

		return (
			<Fragment>
				{ controls }
				<InspectorControls>
					<PanelBody title={ __( 'carousel Settings' ) }>
						{ images.length > 1 && <RangeControl
							label={ __( 'Columns' ) }
							value={ columns }
							onChange={ this.setColumnsNumber }
							min={ 1 }
							max={ Math.min( MAX_COLUMNS, images.length ) }
						/> }
						<ToggleControl
							label={ __( 'Crop Images' ) }
							checked={ !! imageCrop }
							onChange={ this.toggleImageCrop }
							help={ this.getImageCropHelp }
						/>
						<SelectControl
							label={ __( 'Link To' ) }
							value={ linkTo }
							onChange={ this.setLinkTo }
							options={ linkOptions }
						/>
					</PanelBody>
				</InspectorControls>


				<ul
				    className={ ` ${className}  align owl-theme owl-carousel ` }
						ref={this.$carousel}
				>

					{ images.map( ( img, index ) => (
						<div className="blocks-carousel-item" key={ img.id || img.url }>
							<CarouselSpecificSelect
								url={ img.url }
								alt={ img.alt }
								id={ img.id }
								isSelected={ isSelected && this.state.selectedImage === index }
								onRemove={ this.onRemoveImage( index ) }
								onSelect={ this.onSelectImage( index ) }
								setAttributes={ ( attrs ) => this.setImageAttributes( index, attrs ) }
								caption={ img.caption }
							/>
					</div>
					) ) }

						<div className="blocks-carousel-item has-add-item-button">
							<MediaPlaceholder
								icon="format-carousel"
								className=''
								labels={ {
									title: __( 'carousel' ),
									name: __( 'images' ),
								} }
								onSelect={ this.onSelectImages }
								accept="image/*"
								type="image"
								notices={ noticeUI }
								onError={ noticeOperations.createErrorNotice }
							/>
						</div>

				</ul>
			</Fragment>
		);
	}
}


export default withNotices( carouselEdit );
