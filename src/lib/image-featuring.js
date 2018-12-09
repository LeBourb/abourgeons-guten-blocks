/**
 * External Dependencies
 */
import classnames from 'classnames';
import React, { Fragment } from 'react';

/**
 * WordPress Dependencies
 */
const { Component } = wp.element;
const { IconButton, Spinner, PanelBody, ToggleControl, SelectControl, withFallbackStyles, RangeControl, BlockAlignmentToolbar, ResizableBox  } = wp.components;
const { __ } = wp.i18n;
const { BACKSPACE, DELETE } = wp.keycodes;
const { withSelect } = wp.data;
const { RichText , URLInputButton, MediaUpload, MediaPlaceholder, withColors, PanelColorSettings, ContrastChecker, InspectorControls } = wp.editor;
const { compose } = wp.compose;
//const { URLInputButton } = wp.button;

//  Import CSS.
import './style.scss';
import './editor.scss?editor';

/**
 * When the display mode is 'Specific products' search for and add products to the block.
 *
 * @todo Add the functionality and everything.
 */
export class FeaturingImage extends React.Component {

	/**
	 * Constructor.
	 */
	constructor( props ) {
		super( props );
    /*
		*/
		///this.onKeyDown = this.onKeyDown.bind( this );
		this.bindContainer = this.bindContainer.bind( this );
	//	this.onImageClick = this.onImageClick.bind( this );
		this.setHLinkRef = this.setHLinkRef.bind( this );
		this.onValid = this.onValid.bind( this );
		this.onCancel = this.onCancel.bind( this );
		this.state = {
			imageSelected: false,
			hlink:null,
			post:null,
			size: 0,
			width: 0,
			height: 0,
			refwidth: 0,
			refheight: 0
		}
	}

	bindContainer( ref ) {
		if(ref) {
			this.container = ref;
			this.state.width = ref.offsetWidth;
			this.state.height = ref.offsetHeight;
			this.state.refwidth = ref.parentElement.offsetWidth;
			this.state.refheight = ref.parentElement.offsetHeight;
		}
	}

	componentDidUpdate( prevProps ) {
		const { isSelected, image, url } = this.props;
	/*	if ( image && ! url ) {
			this.props.setAttributes( {
				url: image.source_url,
				alt: image.alt_text,
			} );
		}*/

		// unselect the caption so when the user selects other image and comeback
		// the caption is not immediately selected
	/*	if ( this.state.buttonSelected && ! isSelected && prevProps.isSelected ) {
			this.setState( {
				buttonSelected: false,
			} );
		}*/
	}

	/**
	 * Set the wrapper reference.
	 *
	 * @param node DOMNode
	 */
	setHLinkRef( node ) {
		this.HLinkRef = node;
	}

	/*onImageClick() {

		if(!this.state.imageSelected) {
			this.setState( {
				imageSelected: true,

			} );
		}
	}*/

	onValid () {
		this.state.imageSelected = false;

		this.props.setAttributes({
		});
		this.props.onValidate();

		 /*
		this.props.setAttributes({
				button: '',
				headline: ''
			});*/
	}

	onCancel () {
		this.setState({
		});

		this.props.onCancel();
	}

	render() {
		const { media_url, alt, media_id, linkTo, link, isSelected, onRemove, setAttributes , toggleSelection,  children , post, hlink, onValidate, onCancel, edit, MultiMediaResponsive, size , backgroundColor, isBackgroundFixed, textColor, textAligned, imageAligned, widthPrct, heightPrct } = this.props;

		let href, currenthlink;

		currenthlink = hlink;
		const url = media_url[size] ? media_url[size]  : null ;
		const id = media_id[size] ? media_id[size] : null ;


		switch ( linkTo ) {
			case 'media':
				href = url;
				break;
			case 'attachment':
				href = link;
				break;
		}

		this.state.size = ( MultiMediaResponsive ? size : 0 );

		const onSelectImage = ( media ) => {
			var url = this.props.media_url.slice(0);
			var id = this.props.media_id.slice(0);
			if ( ! media || ! media.url ) {
				url[size] = null;
				id[size] = null;
				setAttributes( { media_url: url, media_id: id } );
				return;
			}
			url[size] = media.url;
			id[size] = media.id;
			setAttributes( { media_url: url, media_id: id } );

		};


		const style = {
			width: ( !isSelected && widthPrct ) ? widthPrct + '%' : ''
		};

		const styleBackgroupdImage = {
			backgroundImage: !MultiMediaResponsive ?  `url(${ url })`  : '',
		};

		const styleBackgroupdColor = { backgroundColor: backgroundColor };
		const textstyle = { color: textColor ? textColor : 'black' };

		// Disable reason: Image itself is not meant to be
		// interactive, but should direct image selection and unfocus caption fields
		// eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events

		const className = classnames( 'text-aligned-' + textAligned , 'image-aligned-' + imageAligned, {
			'is-selected': isSelected,
			'is-transient': url && 0 === url.indexOf( 'blob:' ),
			'is-featuring': !MultiMediaResponsive,
			'abourgeons_fall18abourgeons_fall18_render_imagefeaturing': true,
		 	'image-featuring-editor':true,
			'background-image-fixed': isBackgroundFixed
		});



		const classNameBack = classnames(
			'has-background-dim'
		);

		//{ href ? <a href={ href }>{ img }</a> : img }
		// Disable reason: Each block can be selected by clicking on it and we should keep the same saved markup
		/* eslint-disable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/onclick-has-role, jsx-a11y/click-events-have-key-events
		onChange={ ( HeadlineText ) => setAttributes( { headline: HeadlineText } ) }



				onChange={ ( ButtonText ) => setAttributes( { button: ButtonText } ) }
				onChange={ ( url, post ) => setAttributes( { hlink: url } ) }



		*/
		const fctOnChange = ( url, post ) => { this.HLinkRef.props.url = url; this.HLinkRef.setState({url: url }); };
		var editcmd = null;
		/*if(edit) {
			editcmd = (<div> <IconButton
					icon="edit"
					onClick={ () => { edit();} }
					className="blocks-carousel-item__edit"
					label={ __( 'Edit' ) }
				/>
			<IconButton
					icon="align-left"
					onClick={ () => { setAttributes({textAligned:'left'}); } }
					className="blocks-carousel-item__alignleft"
					label={ __( 'Align Left' ) }
				/> <IconButton
					icon="align-center"
					onClick={ () => { setAttributes({textAligned:'center'}); } }
					className="blocks-carousel-item__aligncenter"
					label={ __( 'Align Center' ) }
				/><IconButton
					icon="align-right"
					onClick={ () => { setAttributes({textAligned:'right'}); } }
					className="blocks-carousel-item__alignright"
					label={ __( 'Align Right' ) }
				/></div>);
		} else {
			editcmd = (<div>
				<IconButton icon="no-alt"	onClick={ this.onCancel } className="blocks-carousel-item__cancel" label={ __( 'Cancel' ) } 	/>
				<IconButton	icon="yes" 	onClick={ this.onValid } className="blocks-carousel-item__valid" label={ __( 'Valid Modif' ) } />
				<URLInputButton url={ currenthlink } onChange={ fctOnChange } 	ref={ this.setHLinkRef }  />
		 	</div>);
		}
*/
	/*	const offset = (
			<Fragment>
					{ edit ?  <RichText.Content className={'headline'} tagName="h3" value={ headline } />  : <RichText
					tagName="h3"
					placeholder={ __(  'Enter Headline…' ) }
					value={ headline }
					className= {'headline'}
					onChange={ ( HeadlineText ) => { this.state.headline = HeadlineText }  }
					inlineToolbar
				/>
				}
				{ 	hasSubtitle ? ( edit ? <RichText.Content className={'subtitle'} tagName="h4" value={ subtitle } /> : <RichText
						tagName="h4"
						placeholder={ __(  'Subtitle…' ) }
						value={ subtitle }
						className= {'subtitle'}
						onChange={ ( text ) => { this.state.subtitle = text }  }
						inlineToolbar
						/>
					) : ''
				}	{ hasButton ? ( edit ? <RichText.Content className={'button'} tagName="div" value={ button } /> : <RichText
						tagName="div"
						placeholder={ __(  'Enter Button Text…' ) }
						value={ button }
						className= {'button'}
						onChange={ ( ButtonText ) => { this.state.button = ButtonText }  }
						inlineToolbar
					/> )
					: ''
					}
			</Fragment>
				);

		/*	if(MultiMediaResponsive)
				return '';
				<div className="block-library-item__inline-menu">{ editcmd } {
				<MediaUpload
					onSelect={ onSelectImage }
					type="image"
					value={ id }
					render={ ( { open } ) => (
						<IconButton
							className="components-toolbar__control"
							label={ __( 'Edit image' ) }
							icon="format-image"
							onClick={ open }
						/>
					) }
				/>
		}
				<IconButton
						icon="trash"
						onClick={ onRemove }
						className="blocks-carousel-item__remove"
						label={ __( 'Remove Image' ) }
					/>

				</div>
*/
		//var widthCpt = width ?  (width * widthPrct)/100 : 1;
		//var heightCpt = height ? (height * heightPrct)/100 : 1;
		var width = isSelected ? this.state.width : undefined;
		var height = isSelected ? this.state.height : undefined;
		const featureImage = (<div className={ className } tabIndex="-1" ref={ !isSelected ? this.bindContainer : null } style={style} >
			{ ! url ? ( <MediaPlaceholder
						icon= 'edit'
						className={ 'mediaplaceholder' }
						labels={ {
							title: 'Select',
							name: __( 'an image' ),
						} }
						onSelect={ onSelectImage }
						accept="image/*"
						type="image"
					/> ) : (  <div className={ 'block-img' } data-id={ id } style={styleBackgroupdImage}  >
										{ MultiMediaResponsive ? ( <div className="imagecontainer">
									<section className="slide-data-container smallenablediv">
										<picture>
											<img src={ media_url[size] } data-id={ media_id[size] } />
										</picture>
									</section>
								</div> ) : ('') }
								<div style={ styleBackgroupdColor } className={classNameBack}>
								</div>
								<div className="textcontainer" style={ textstyle } >
									<section className="offsettab">
										{ children ?  children : '' }
									</section>
								</div>
							</div>
						)
					}
			</div>);

		return isSelected ? ( <ResizableBox
			size={
				width && height ? {
					 width ,
					 height ,
				} : undefined
			}
			minHeight="50"
			minWidth="50"
			lockAspectRatio
			ref={ isSelected ? this.bindContainer : null }
			enable={ {
				top: false,
				right: true,
				bottom: true,
				left: false,
			} }
			className={ classnames('image-aligned-' + imageAligned) }
			onResizeStop={ ( event, direction, elt, delta ) => {
					var refwidth = this.state.refwidth;
					var refheight = this.state.refheight;
					var width = this.state.width;
					var height = this.state.height;
					var widthPrctN = ( width + delta.width ) / refwidth;
					var heightPrctN = ( height + delta.height ) / refheight;
					this.state.width +=  delta.width ;
					this.state.height += delta.height ;
					//toggleSelection( false );
					setAttributes( {
							widthPrct: parseInt(widthPrctN * 100 , 10),
							heightPrct: parseInt(heightPrctN * 100 , 10),
					} );
			} }
			onResizeStart={ (evt) => {
				/*if(!this.state.refwidth || !this.state.refheight) {
					this.state.refwidth = this.state.width * ( widthPrct / 100 );
					this.state.refheight = this.state.height * ( heightPrct / 100 );
				}
				this.state.width = evt.screenX;
				this.state.height = evt.screenY;
				*/
			} }
	>
				{featureImage}
			</ResizableBox> ) : featureImage;
		/* eslint-enable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/onclick-has-role, jsx-a11y/click-events-have-key-events

			 */
	}
}

function backgroundImageStyles( url ) {
	return url ?
		{ backgroundImage: `url(${ url })` } :
		undefined;
}



/*export default withSelect( ( select, ownProps ) => {
	const { getMedia } = select( 'core' );
	const { id } = ownProps;

	return {
		image: id ? getMedia( id ) : null,
	};
} )( carouselImage );*/





/**
 * When the display mode is 'Specific products' search for and add products to the block.
 *
 * @todo Add the functionality and everything.
 */
export class FeaturingImageToolbar extends Component {

	/**
	 * Constructor.
	 */
	constructor( ) {
		super( ...arguments );
		this.nodeRef = null;
		this.bindRef = this.bindRef.bind( this );
	}

	bindRef( node ) {
		if ( ! node ) {
			return;
		}
		this.nodeRef = node;
	}

	render() {
		const { setAttributes, MultiMediaResponsive, hasSubtitle, hasButton, size, setState, backgroundColor, isBackgroundFixed, textColor, textAligned} = this.props;
		const toggleMultiMediaResponsive = (MultiMediaResponsive) => {
			setAttributes( { MultiMediaResponsive: MultiMediaResponsive } );
		};

		const togglehasSubtitle = (hasSubtitle) => {
			setAttributes( { hasSubtitle: hasSubtitle } );
		};

		const togglehasButton = (hasButton) => {
			setAttributes( { hasButton: hasButton } );
		};



/*
<RangeControl
					label={ __( 'Background Opacity' ) }
					value={ dimRatio }
					onChange={ setDimRatio }
					min={ 0 }
					max={ 100 }
					step={ 10 }
				/>
*/
		/**/

		return (
			<Fragment>
				<PanelBody title={ __( 'Responsiveness Multi-Medias' ) }>
					<ToggleControl
						label={ __( 'Multi-Media Responsiveness' ) }
						checked={ !! MultiMediaResponsive }
						onChange={ toggleMultiMediaResponsive }
					/>
					{ MultiMediaResponsive ? <SelectControl
						label="Size"
						value={ size }
						options={ [
							{ label: 'Big', value: 0 },
							{ label: 'Medium', value: 1 },
							{ label: 'Small', value: 2 },
						] }
						onChange={ ( size ) => { setState( { size } ) } }
					/> : <ToggleControl
						label={ __( 'is Background Image Fixed' ) }
						checked={ !! isBackgroundFixed }
						onChange={ (isBackgroundFixed) => {	setAttributes( { isBackgroundFixed: isBackgroundFixed } ); }  }
					/>
					}
					{ hasSubtitle !== null ? <ToggleControl
						label={ __( 'has Subtitle' ) }
						checked={ !! hasSubtitle }
						onChange={ togglehasSubtitle }
					/> : '' }
					{ hasButton !== null ?  <ToggleControl
						label={ __( 'has Button' ) }
						checked={ !! hasButton }
						onChange={ togglehasButton }
					/>  : '' }
				</PanelBody>
			 <PanelColorSettings
			 		title={ __( 'Color Settings' ) }
			 		initialOpen={ false }
			 		colorSettings={ [
			 			{
			 				value: backgroundColor,
			 				onChange: (backgroundColor) => { setAttributes({backgroundColor: backgroundColor});  },
			 				label: __( 'Background Color' ),
			 			},
			 			{
			 				value: textColor,
			 				onChange: (textColor) => { setAttributes({textColor: textColor}); },
			 				label: __( 'Text Color' ),
			 			},
			 		] }
			 	>
			 	</PanelColorSettings>
			</Fragment>
		);
	}
}

/**
 * When the display mode is 'Specific products' search for and add products to the block.
 *
 * @todo Add the functionality and everything.
 */
export class FeaturingImagePanel extends Component {

	/**
	 * Constructor.
	 */
	constructor( ) {
		super( ...arguments );
	}

	render() {
		const { setAttributes, size, media_url, media_id, hlink, textAligned, imageAligned } = this.props;

		const url = media_url[size] ? media_url[size]  : null ;
		const id = media_id[size] ? media_id[size] : null ;
		const onSelectImage = ( media ) => {
			var url = this.props.media_url.slice(0);
			var id = this.props.media_id.slice(0);
			if ( ! media || ! media.url ) {
				url[size] = null;
				id[size] = null;
				setAttributes( { media_url: url, media_id: id } );
				return;
			}
			url[size] = media.url;
			id[size] = media.id;
			setAttributes( { media_url: url, media_id: id } );
		};
/*
<BlockAlignmentToolbar
	value={ textAligned }
	onChange={ ( nextAlign ) => {
		setAttributes( { textAligned: nextAlign } );
	} }
	controls={ [ 'left', 'center', 'right' ] }
/>
*/
		return (
		<Fragment>
			<MediaUpload
				onSelect={ onSelectImage }
				type="image"
				value={ id }
				render={ ( { open } ) => (
					<IconButton
						className="components-toolbar__control"
						label={ __( 'Edit image' ) }
						icon="format-image"
						onClick={ open }
					/>
				) }
			/>
			<IconButton
					icon="align-left"
					onClick={ () => { setAttributes({imageAligned:'left'}); } }
					className="blocks-carousel-item__alignleft"
					label={ __( 'Align Left' ) }
				/> <IconButton
					icon="align-center"
					onClick={ () => { setAttributes({imageAligned:'center'}); } }
					className="blocks-carousel-item__aligncenter"
					label={ __( 'Align Center' ) }
				/><IconButton
					icon="align-right"
					onClick={ () => { setAttributes({imageAligned:'right'}); } }
					className="blocks-carousel-item__alignright"
					label={ __( 'Align Right' ) }
				/>
				<IconButton
						icon="editor-alignleft"
						onClick={ () => { setAttributes({textAligned:'left'}); } }
						className="components-button components-icon-button components-toolbar__control"
						label={ __( 'Align Left' ) }
					/> <IconButton
						icon="editor-aligncenter"
						onClick={ () => { setAttributes({textAligned:'center'}); } }
						className="components-button components-icon-button components-toolbar__control"
						label={ __( 'Align Center' ) }
					/><IconButton
						icon="editor-alignright"
						onClick={ () => { setAttributes({textAligned:'right'}); } }
						className="components-button components-icon-button components-toolbar__control"
						label={ __( 'Align Right' ) }
					/>

			<URLInputButton url={ hlink } onChange={ (hlink) => { setAttributes({hlink:hlink}); } } 	 />
			</Fragment>
		);

	}
}
