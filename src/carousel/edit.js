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
import { FeaturingImage } from './../lib/image-featuring';
import { ClassicImage } from './../lib/image-classic';

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
	return attributes.columns ? Math.min( 3, attributes.columns ) : 1;
}

class carouselEdit extends Component {
	constructor() {
		super( ...arguments );

		this.onSelectImages = this.onSelectImages.bind( this );
		this.setLinkTo = this.setLinkTo.bind( this );
		this.setColumnsNumber = this.setColumnsNumber.bind( this );
		this.toggleMultiMediaResponsive = this.toggleMultiMediaResponsive.bind( this );
		this.onRemoveImage = this.onRemoveImage.bind( this );
		this.onValidate = this.onValidate.bind( this );
		this.setImageAttributes = this.setImageAttributes.bind( this );
		this.addFiles = this.addFiles.bind( this );
		this.uploadFromFiles = this.uploadFromFiles.bind( this );

		this.state = {
			selectedImage: null,
			options: {
				navigation : true,
    		singleItem : true,
    		transitionStyle : "fade"
			},
			size: 0,
			MultiMediaResponsive: false
		};

		this.$carousel = React.createRef();
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

	onValidate( index ) {
		return () => {
			this.setState( { selectedImage: index } );
		};
	}

	onSelectImages( image ) {
		var imgs = [];
		if (this.state.MultiMediaResponsive)
		 	imgs[this.state.size] = image;
		else
			imgs[0] = image;


		this.props.attributes.images.push(imgs);
		this.setState({
			selectedImage: this.props.attributes.images.length - 1
		});
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

	toggleMultiMediaResponsive() {
		this.props.setAttributes( { MultiMediaResponsive: (this.state.MultiMediaResponsive ? 'false' : 'true') } );
	}

	getMultiMediaResponsiveHelp( checked ) {
		return checked ? __( 'Thumbnails are cropped to align and accepts button text and hyberlinks !' ) : __( 'Classic carousel of images.' );
	}

	setImageAttributes( index, new_images ) {
		const {  setAttributes , attributes } = this.props;
		const { images } =  attributes;
		if ( ! images[ index ] ) {
			return;
		}
		setAttributes( {
			images: [
				...images.slice( 0, index ),
				{
					...images[ index ],
					...new_images,
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
			} );
		}

		var carousel = $(this.$carousel.current);

		if (carousel) {
			carousel.trigger('destroy.owl.carousel');
		}
		carousel.owlCarousel(this.state.options);

	}

	componentDidMount () {
		var carousel = $(this.$carousel.current);

		if (carousel) {
			carousel.trigger('destroy.owl.carousel');
		}

		carousel.owlCarousel(this.state.options);
	}

	render() {
		const { attributes, isSelected, className, noticeOperations, noticeUI } = this.props;
		const { images, columns = defaultColumnsNumber( attributes ), align, MultiMediaResponsive, linkTo } = attributes;
		if( !!MultiMediaResponsive && MultiMediaResponsive === 'true') {
			this.state.MultiMediaResponsive = true;
		} else {
			this.state.MultiMediaResponsive = false;
		}
		const dropZone = (
			<DropZone
				onFilesDrop={ this.addFiles }
			/>
		);


		this.state.options = {
			items: columns,
			slideBy: 'page',
			animateIn: 'fadeIn',
			animateOut: 'fadeOut',
			slideBy: 'page',
			animateIn: 'fadeIn',
			animateOut: 'fadeOut',
			nav: true,
			dots: true,
			startPosition: this.state.selectedImage
		}

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
							value={ images.map( ( img ) => img.media_id ) }
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
							label={ __( 'Responsive Multi-Medias' ) }
							checked={ !! this.state.MultiMediaResponsive }
							onChange={ this.toggleMultiMediaResponsive }
							help={ this.getMultiMediaResponsiveHelp }
						/>
						<SelectControl
							label={ __( 'Link To' ) }
							value={ linkTo }
							onChange={ this.setLinkTo }
							options={ linkOptions }
						/>
					{ !!this.state.MultiMediaResponsive ? <SelectControl
		          label="Size"
		          value={ this.state.size }
		          options={ [
		            { label: 'Big', value: 0 },
		            { label: 'Medium', value: 1 },
		            { label: 'Small', value: 2 },
		          ] }
		          onChange={ ( size ) => { this.setState( { size } ) } }
		        /> : ''
		        }
					</PanelBody>
				</InspectorControls>


				<ul
				    className={ ` ${className}  align owl-theme owl-carousel ` }
						ref={this.$carousel}
				>

					{ images.map( ( img, index ) => (
							  this.state.MultiMediaResponsive  ? (	<ClassicImage
									media_url={ img.media_url ? img.media_url : [] }
									media_id={ img.media_id ? img.media_id : [] }
									size={this.state.size}
									onRemove={ this.onRemoveImage( index ) }
									onValidate={ this.onValidate( index ) }
									setAttributes={ ( attrs ) => this.setImageAttributes( index, attrs ) }
									headline={ img.headline }
									button={ img.button }
									hlink={ img.hlink }
								/> ) :	(
								<FeaturingImage
								media_url={ img.media_url ? img.media_url : [] }
								alt={ img.alt }
								media_id={ img.media_id ? img.media_id : [] }
								onRemove={ this.onRemoveImage( index ) }
								onValidate={ this.onValidate( index ) }
								setAttributes={ ( attrs ) => this.setImageAttributes( index, attrs ) }
								headline={ img.headline }
								button={ img.button }
								hlink={img.hlink}
							/>
						 )
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
