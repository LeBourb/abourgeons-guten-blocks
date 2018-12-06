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
	Button
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

		this.setLinkTo = this.setLinkTo.bind( this );
		this.setColumnsNumber = this.setColumnsNumber.bind( this );
		this.toggleMultiMediaResponsive = this.toggleMultiMediaResponsive.bind( this );
		this.toggleAutoplay = this.toggleAutoplay.bind( this );
		this.toggleMobileNoCarousel = this.toggleMobileNoCarousel.bind( this );
		this.onRemoveImage = this.onRemoveImage.bind( this );
		this.setImageAttributes = this.setImageAttributes.bind( this );
		this.addFiles = this.addFiles.bind( this );

		this.state = {
			selectedImage: null,
			options: {
				navigation : true,
    		singleItem : true,
    		transitionStyle : "fade"
			},
			size: 0,
			edit: null
		};

		this.$carousel = React.createRef();
	}

	onRemoveImage( index ) {
		return () => {
			const images = filter( this.props.attributes.images, ( img, i ) => index !== i );
			const { columns } = this.props.attributes;
			this.state.selectedImage = index -1;
			this.props.setAttributes( {
				images,
				columns: columns ? Math.min( images.length, columns ) : columns,
			} );
		};
	}

	setLinkTo( value ) {
		this.props.setAttributes( { linkTo: value } );
	}

	setColumnsNumber( value ) {
		this.props.setAttributes( { columns: value } );
	}

	toggleMultiMediaResponsive() {
		this.props.setAttributes( { MultiMediaResponsive: (this.props.attributes.MultiMediaResponsive ? false : true) } );
	}

	toggleMobileNoCarousel() {
		this.props.setAttributes( { MobileNoCarousel: ( this.props.attributes.MobileNoCarousel ? false : true) } );
	}

	toggleAutoplay() {
		this.props.setAttributes( { Autoplay: ( this.props.attributes.Autoplay ? false : true) } );
	}

	getMultiMediaResponsiveHelp( checked ) {
		return checked ? __( 'Thumbnails are cropped to align and accepts button text and hyberlinks !' ) : __( 'Classic carousel of images.' );
	}

	getAutoplayHelp( checked ) {
		return checked ? __( 'Autoplay is active !' ) : __( 'Autoplay.' );
	}

	getMobileNoCarouselHelp( checked ) {
		return checked ? __( 'Carousel is not active on Mobile device !' ) : __( ' Carousel is active on Mobile device' );
	}

	setImageAttributes( index, new_images ) {
		const {  setAttributes , attributes } = this.props;
		const { images } =  attributes;
		if ( ! images[ index ] ) {
			return;
		}
		this.state.selectedImage = index;
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
		const { images, columns = defaultColumnsNumber( attributes ), align, MultiMediaResponsive, MobileNoCarousel, linkTo, Autoplay } = attributes;

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


		return (
			<Fragment>
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
							checked={ !! MultiMediaResponsive }
							onChange={ this.toggleMultiMediaResponsive }
							help={ this.getMultiMediaResponsiveHelp }
						/>
						<ToggleControl
							label={ __( 'Autoplay' ) }
							checked={ !! Autoplay }
							onChange={ this.toggleAutoplay }
							help={ this.getAutoplayHelp }
						/>
						<ToggleControl
							label={ __( 'Carousel with Mobile devises' ) }
							checked={ !! MobileNoCarousel }
							onChange={ this.toggleMobileNoCarousel }
							help={ this.getMobileNoCarouselHelp }
						/>
						<SelectControl
							label={ __( 'Link To' ) }
							value={ linkTo }
							onChange={ this.setLinkTo }
							options={ linkOptions }
						/>
					{ !!MultiMediaResponsive ? <SelectControl
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
				{ this.state.edit !== null ? (  MultiMediaResponsive  ? (	<ClassicImage
					media_url={ images[this.state.edit].media_url ? images[this.state.edit].media_url : [] }
					media_id={ images[this.state.edit].media_id ? images[this.state.edit].media_id : [] }
					size={this.state.size}
					onRemove={ '' }
					onValidate={ () => this.setState( { selectedImage: this.state.edit, edit: null } )  }
					onCancel={ () => this.setState({edit: null}) }
					setAttributes={ ( attrs ) => this.setImageAttributes( this.state.edit, attrs ) }
					headline={ images[this.state.edit].headline }
					button={ images[this.state.edit].button }
					hlink={ images[this.state.edit].hlink }
					textAligned= { images[this.state.edit].textAligned }
					edit={ null }
				/> ) :	(
				<FeaturingImage
				media_url={ images[this.state.edit].media_url ? images[this.state.edit].media_url : [] }
				alt={ images[this.state.edit].alt }
				media_id={ images[this.state.edit].media_id ? images[this.state.edit].media_id : [] }
				onRemove={ '' }
				onValidate={ () => this.setState( { selectedImage: this.state.edit, edit: null } ) }
				onCancel={ () => this.setState({edit: null}) }
				setAttributes={ ( attrs ) => this.setImageAttributes( this.state.edit, attrs ) }
				headline={ images[this.state.edit].headline }
				button={ images[this.state.edit].button }
				hlink={images[this.state.edit].hlink}
				textAligned= { images[this.state.edit].textAligned }
				edit={ null }
				size={this.state.size}
				MultiMediaResponsive={MultiMediaResponsive}
			/> ) ) : (	<ul
				    className={ ` ${className}  align owl-theme owl-carousel ` }
						ref={this.$carousel}
				>	{ images.map( ( img, index ) => (
								<FeaturingImage
								media_url={ img.media_url ? img.media_url : [] }
								alt={ img.alt }
								media_id={ img.media_id ? img.media_id : [] }
								onRemove={ this.onRemoveImage( index ) }
								onValidate={ null }
								onCancel={ null }
								setAttributes={ ( attrs ) => this.setImageAttributes( index, attrs ) }
								headline={ img.headline }
								size={this.state.size}
								button={ img.button }
								hlink={img.hlink}
								textAligned= { img.textAligned ? img.textAligned : 'center'  }
								edit={ () => this.setState({edit: index}) }
								MultiMediaResponsive={MultiMediaResponsive}
							/>
					) ) }
						<div className="blocks-carousel-item has-add-item-button">
							<Button isDefault
											onClick={ () => {
												this.props.attributes.images.push([]);
												this.state.selectedImage= this.props.attributes.images.length - 1;
												this.props.setAttributes( {
													images:  this.props.attributes.images.slice()
												} );
											 } }>
        				Click me!
    					</Button>
						</div>
				</ul> )	}
			</Fragment>
		);
	}
}
/*
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
*/

export default withNotices( carouselEdit );
