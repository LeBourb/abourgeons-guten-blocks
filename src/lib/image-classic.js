/**
 * External Dependencies
 */
import classnames from 'classnames';
import { merge } from 'lodash';
/**
 * WordPress Dependencies
 */
const { Component } = wp.element;
const { IconButton, Spinner } = wp.components;
const { __ } = wp.i18n;
const { BACKSPACE, DELETE } = wp.keycodes;
const { withSelect } = wp.data;
const { RichText , URLInputButton, MediaPlaceholder, MediaUpload } = wp.editor;

//const { URLInputButton } = wp.button;

//  Import CSS.
import './style.scss';
import './editor.scss?editor';

/**
 * When the display mode is 'Specific products' search for and add products to the block.
 *
 * @todo Add the functionality and everything.
 */
export class ClassicImage extends React.Component {

	/**
	 * Constructor.
	 */
	constructor( props ) {
		super( props );
    /*
		*/
		///this.onKeyDown = this.onKeyDown.bind( this );
		this.bindContainer = this.bindContainer.bind( this );
		this.onValid = this.onValid.bind( this );
		this.onCancel = this.onCancel.bind( this );
		this.setHLinkRef = this.setHLinkRef.bind( this );
		this.state = {
			imageSelected: false,
			button: '',
			headline: '',
			subtltle: '',
			hlink:null,
			post:null
		}
	}

	bindContainer( ref ) {
		this.container = ref;
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
			hlink: this.HLinkRef.props.url,
			subtitle: this.state.subtitle
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
			button: this.props.button,
			headline: this.props.headline,
			hlink: this.props.hlink,
			subtitle: this.props.subtitle
		});

		this.props.onCancel();
	}



	render() {
		const { media_url, alt, media_id, linkTo, link, isSelected, headline, button , onRemove, setAttributes , post, hlink, size, hasSubtitle, subtitle, rightaligned, onValidate, onCancel, edit} = this.props;

		let href, currenthlink;

		currenthlink = hlink;

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

		switch ( linkTo ) {
			case 'media':
				href = url;
				break;
			case 'attachment':
				href = link;
				break;
		}

		this.state = {
			button: button,
			headline: headline,
			subtitle: subtitle,
			hlink:hlink
		}
		// Disable reason: Image itself is not meant to be
		// interactive, but should direct image selection and unfocus caption fields
		// eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events
//'is-transient': url && 0 === url.indexOf( 'blob:' ),
		const className = classnames( {
			'rightaligned': rightaligned,
			'abourgeons_fall18abourgeons_fall18_render_responsivemultimedias':true,
			'image_classic-editor': true

		} );


		return (
			<div className="image-classic" tabIndex="-1">
				{ <div className="block-library-item__inline-menu">
					{ edit ? (	<div><IconButton
							icon="trash"
							onClick={ onRemove }
							className="blocks-carousel-item__remove"
							label={ __( 'Remove Image' ) }
						/>
						<MediaUpload
							onSelect={ onSelectImage }
							type="image"
							value={ media_id }
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
							icon="edit"
							onClick={ () => { edit();/*tthis.state.rightaligned = false;  this.container.classList.remove('rightaligned');*/ } }
							className="blocks-carousel-item__edit"
							label={ __( 'Edit' ) }
						/>
						<IconButton
							icon="align-left"
							onClick={ () => { setAttributes({rightaligned:false});/*this.state.rightaligned = false;  this.container.classList.remove('rightaligned');*/ } }
							className="blocks-carousel-item__alignleft"
							label={ __( 'Align Left' ) }
						/> <IconButton
							icon="align-right"
							onClick={ () => { setAttributes({rightaligned:true});/*this.state.rightaligned = true;  this.container.classList.add('rightaligned')*/ } }
							className="blocks-carousel-item__alignright"
							label={ __( 'Align Right' ) }
						/></div>  ) : ( <div>	<IconButton icon="no-alt"	onClick={ this.onCancel } className="blocks-carousel-item__cancel" label={ __( 'Cancel' ) } 	/>
					 	<IconButton	icon="yes" 	onClick={ this.onValid } className="blocks-carousel-item__valid" label={ __( 'Valid Modif' ) } />
						<URLInputButton
						 	url={ currenthlink }
							onChange={ ( url, post ) => { this.HLinkRef.props.url = url; this.HLinkRef.setState({url: url }) } }
						 	ref={ this.setHLinkRef }
					 	/>
				</div>
				) }
					</div>
				}
				{ ! media_url[size] ?  ( <MediaPlaceholder
							icon= 'edit'
							className={ 'mediaplaceholder' }
							labels={ {
								title: 'Select',
								name: __( 'an image' ),
							} }
							onSelect={ onSelectImage }
							accept="image/*"
							type="image"
						/> ) :
							( <div className={ className } ref={ this.bindContainer }>
									<div className="imagecontainer">
										<section className="slide-data-container smallenablediv">
											<picture>
												<img src={ media_url[size] } data-id={ media_id[size] } />
											</picture>
										</section>
									</div>
									<div className="textcontainer">

										<div className="offsettab" >
											{ edit ? <h3 className='headline'>{headline}</h3> :	<RichText
												tagName="h3"
												placeholder={ __(  'Enter Headline…' ) }
												value={ headline }
												className= {'headline'}
												onChange={ ( HeadlineText ) => { this.state.headline = HeadlineText }  }
												inlineToolbar
												/>
										 }
												{ hasSubtitle ? ( edit ? <h4 className="text">{subtitle}</h4> : <RichText
												tagName="h4"
												placeholder={ __(  'Enter Subtitle…' ) }
												value={ subtitle }
												className= {'subtitle'}
												onChange={ ( text ) => { this.state.subtitle = text }  }
												inlineToolbar
												/> )
												: '' }
												{ edit ? <div className="button">{button}</div> :
												<RichText
													tagName="div"
													placeholder={ __(  'Enter Button Text…' ) }
													value={ button }
													className= {'button'}
													onChange={ ( ButtonText ) => { this.state.button = ButtonText }  }
													inlineToolbar
												/>
										}
										</div>


									</div>
								</div>
							)
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
