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
const { RichText , URLInputButton, MediaUpload, MediaPlaceholder } = wp.editor;
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
			button: '',
			headline: '',
			subtitle: '',
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
		const { media_url, alt, media_id, linkTo, link, isSelected, headline, button , onRemove, setAttributes , post, hlink, hasSubtitle, subtitle, aligned, edit, onValidate, onCancel, MultiMediaResponsive, size } = this.props;

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

		this.state = {
			button: button,
			headline: headline,
			subtitle: subtitle,
			hlink:hlink,
			size:( MultiMediaResponsive ? size : 0 )
		}


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


		const style = !MultiMediaResponsive ? backgroundImageStyles( url ) : null;
		// Disable reason: Image itself is not meant to be
		// interactive, but should direct image selection and unfocus caption fields
		// eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events

		const className = classnames( {
			'is-selected': isSelected,
			'is-transient': url && 0 === url.indexOf( 'blob:' ),
			'is-center': aligned == 'center' ? true : false,
			'is-left': aligned == 'left' ? true : false,
			'is-right': aligned == 'right' ? true : false,
			'is-featuring': !MultiMediaResponsive,
			'abourgeons_fall18abourgeons_fall18_render_imagefeaturing': true,
		 	'image-featuring-editor':true
		} );


		//{ href ? <a href={ href }>{ img }</a> : img }
		// Disable reason: Each block can be selected by clicking on it and we should keep the same saved markup
		/* eslint-disable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/onclick-has-role, jsx-a11y/click-events-have-key-events
		onChange={ ( HeadlineText ) => setAttributes( { headline: HeadlineText } ) }



				onChange={ ( ButtonText ) => setAttributes( { button: ButtonText } ) }
				onChange={ ( url, post ) => setAttributes( { hlink: url } ) }



		*/
		const fctOnChange = ( url, post ) => { this.HLinkRef.props.url = url; this.HLinkRef.setState({url: url }); };
		var editcmd = null;
		if(edit) {
			editcmd = (<div> <IconButton
					icon="edit"
					onClick={ () => { edit();} }
					className="blocks-carousel-item__edit"
					label={ __( 'Edit' ) }
				/>
			<IconButton
					icon="align-left"
					onClick={ () => { setAttributes({aligned:'left'}); } }
					className="blocks-carousel-item__alignleft"
					label={ __( 'Align Left' ) }
				/> <IconButton
					icon="align-center"
					onClick={ () => { setAttributes({aligned:'center'}); } }
					className="blocks-carousel-item__aligncenter"
					label={ __( 'Align Center' ) }
				/><IconButton
					icon="align-right"
					onClick={ () => { setAttributes({aligned:'right'}); } }
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

		const offset = (<div className="textcontainer"><div className="offsettab">
					{ edit ?  <h3 className={'headline'}>{ headline }</h3>  : <RichText
					tagName="h3"
					placeholder={ __(  'Enter Headline…' ) }
					value={ headline }
					className= {'headline'}
					onChange={ ( HeadlineText ) => { this.state.headline = HeadlineText }  }
					inlineToolbar
				/>
				}
				{ 	hasSubtitle ? ( edit ? <h4 className={'subtitle'}>{ subtitle }</h4> : <RichText
						tagName="h4"
						placeholder={ __(  'Subtitle…' ) }
						value={ subtitle }
						className= {'subtitle'}
						onChange={ ( text ) => { this.state.subtitle = text }  }
						inlineToolbar
						/>
					) : ''
				}	{ edit ? <div className={'button'}>{ button }</div> : <RichText
						tagName="div"
						placeholder={ __(  'Enter Button Text…' ) }
						value={ button }
						className= {'button'}
						onChange={ ( ButtonText ) => { this.state.button = ButtonText }  }
						inlineToolbar
					/>
					}
			</div></div>);

		/*	if(MultiMediaResponsive)
				return '';
*/

		return (
			<div className={ className } tabIndex="-1" ref={ this.bindContainer } >
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
						/> ) : (  <div className={ 'block-img' } data-id={ id } style={ style }  >
											{ MultiMediaResponsive ? ( <div className="imagecontainer">
										<section className="slide-data-container smallenablediv">
											<picture>
												<img src={ media_url[size] } data-id={ media_id[size] } />
											</picture>
										</section>
									</div> ) : ('') }
									{ offset }
								</div>
							)
						}
				</div>
		);
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
