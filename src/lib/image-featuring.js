/**
 * External Dependencies
 */
import classnames from 'classnames';

/**
 * WordPress Dependencies
 */
const { Component } = wp.element;
const { IconButton, Spinner } = wp.components;
const { __ } = wp.i18n;
const { BACKSPACE, DELETE } = wp.keycodes;
const { withSelect } = wp.data;
const { RichText , URLInputButton, MediaUpload } = wp.editor;
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
		this.onImageClick = this.onImageClick.bind( this );
		this.setHLinkRef = this.setHLinkRef.bind( this );
		this.onValid = this.onValid.bind( this );
		this.onCancel = this.onCancel.bind( this );
		this.state = {
			imageSelected: false,
			button: '',
			headline: '',
			hlink:null,
			post:null
		}
	}

	bindContainer( ref ) {
		this.container = ref;
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

	onImageClick() {
		/*if ( ! this.props.isSelected ) {
			this.props.onSelect();
		}*/

		if(!this.state.imageSelected) {
			this.setState( {
				imageSelected: true,

			} );
		}
	}

	onValid () {
		this.state.imageSelected = false;

		this.props.setAttributes({
			button: this.state.button,
			headline: this.state.headline,
			hlink: this.HLinkRef.props.url
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
			imageSelected: false,
			button: this.props.button,
			headline: this.props.headline,
			hlink: this.props.hlink
		});
	}

	render() {
		const { media_url, alt, media_id, linkTo, link, isSelected, headline, button , onRemove, setAttributes , post, hlink } = this.props;

		let href, currenthlink;

		currenthlink = hlink;
		const url = media_url[0] ? media_url[0]  : null ;
		const id = media_id[0] ? media_id[0] : null ;


		switch ( linkTo ) {
			case 'media':
				href = url;
				break;
			case 'attachment':
				href = link;
				break;
		}

		const onSelectImage = ( media ) => {
			var url = this.props.media_url.slice(0);
			var id = this.props.media_id.slice(0);
			if ( ! media || ! media.url ) {
				url[0] = null;
				id[0] = null;
				setAttributes( { media_url: url, media_id: id } );
				return;
			}
			url[0] = media.url;
			id[0] = media.id;
			setAttributes( { media_url: url, media_id: id } );

		};


		const style = backgroundImageStyles( url );
		// Disable reason: Image itself is not meant to be
		// interactive, but should direct image selection and unfocus caption fields
		// eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events

		const className = classnames( {
			'is-selected': isSelected,
			'is-transient': url && 0 === url.indexOf( 'blob:' ),
		} );


		//{ href ? <a href={ href }>{ img }</a> : img }
		// Disable reason: Each block can be selected by clicking on it and we should keep the same saved markup
		/* eslint-disable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/onclick-has-role, jsx-a11y/click-events-have-key-events
		onChange={ ( HeadlineText ) => setAttributes( { headline: HeadlineText } ) }



				onChange={ ( ButtonText ) => setAttributes( { button: ButtonText } ) }
				onChange={ ( url, post ) => setAttributes( { hlink: url } ) }


		*/
		const editcmd = (
			<div className="block-library-item__inline-menu">
				<MediaUpload
					onSelect={ onSelectImage }
					type="image"
					value={ id }
					render={ ( { open } ) => (
						<IconButton
							className="components-toolbar__control"
							label={ __( 'Edit image' ) }
							icon="edit"
							onClick={ open }
						/>
					) }
				/>
				<IconButton icon="no-alt"	onClick={ this.onCancel } className="blocks-carousel-item__cancel" label={ __( 'Cancel' ) } 	/>
			 	<IconButton	icon="yes" 	onClick={ this.onValid } className="blocks-carousel-item__valid" label={ __( 'Valid Modif' ) } />
			 	<URLInputButton
				 	url={ currenthlink }
					onChange={ ( url, post ) => { this.HLinkRef.props.url = url; this.HLinkRef.setState({url: url }) } }
				 	ref={ this.setHLinkRef }
				 />
		 </div>) ;
		return (
			<div className={ "abourgeons_fall18abourgeons_fall18_render_imagefeaturing image-featuring-editor" } tabIndex="-1" ref={ this.bindContainer }>
						{ this.state.imageSelected ? editcmd : <div className="block-library-item__inline-menu"> <IconButton
								icon="no-alt"
								onClick={ onRemove }
								className="blocks-carousel-item__remove"
								label={ __( 'Remove Image' ) }
							/>
							</div>
						}


				{ <div src={ url } alt={ alt } className={ 'block-img textcontainer' } data-id={ id } style={ style }  onClick={ this.onImageClick } >

							<section className="offsettab" ref={ this.bindContainer }>
									{ this.state.imageSelected ? <RichText
									tagName="h3"
									placeholder={ __(  'Enter Headline…' ) }
									value={ headline }
									className= {'headline'}
									onChange={ ( HeadlineText ) => { this.state.headline = HeadlineText }  }
									inlineToolbar
								/>  : <h3 className={'headline'}>{ headline }</h3>
								}

										{ this.state.imageSelected ? <RichText
										tagName="div"
										placeholder={ __(  'Enter Button Text…' ) }
										value={ button }
										className= {'button'}
										onChange={ ( ButtonText ) => { this.state.button = ButtonText }  }
										inlineToolbar
									/>  : <div className={'button'}>{ button }</div>
									}

							</section>
					</div>
				}
			</div>
		);
		/* eslint-enable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/onclick-has-role, jsx-a11y/click-events-have-key-events */
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
