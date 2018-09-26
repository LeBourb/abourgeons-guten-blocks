/**
 * External dependencies
 */
import { filter, every } from 'lodash';

//  Import CSS.
import './style.scss';
import './editor.scss?editor';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { RichText, mediaUpload } = wp.editor;
const { createBlobURL } = wp.blob;

/**
 * Internal dependencies
 */
import { default as edit, defaultColumnsNumber } from './edit';

const blockAttributes = {
	images: {
		type: 'array',
		default: [],
		/*source: 'query',
		selector: 'ul.wp-block-carousel .blocks-carousel-item',
		query: {
			url: {
				source: 'attribute',
				selector: 'img',
				attribute: 'src',
			},
			link: {
				source: 'attribute',
				selector: 'img',
				attribute: 'data-link',
			},
			alt: {
				source: 'attribute',
				selector: 'img',
				attribute: 'alt',
				default: '',
			},
			id: {
				source: 'attribute',
				selector: 'img',
				attribute: 'data-id',
			},
			caption: {
				type: 'array',
				source: 'children',
				selector: 'figcaption',
			},
		},*/
	},
	columns: {
		type: 'number',
	},
	imageCrop: {
		type: 'boolean',
		default: true,
	},
	linkTo: {
		type: 'string',
		default: 'none',
	},
};

export const name = 'abourgeons-18-fall/carousel';

registerBlockType( name, {
	title: __( 'carousel' ),
	description: __( 'Display multiple images in an elegantly organized tiled layout.' ),
	icon: <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z" /><g><path d="M20 4v12H8V4h12m0-2H8L6 4v12l2 2h12l2-2V4l-2-2z" /><path d="M12 12l1 2 3-3 3 4H9z" /><path d="M2 6v14l2 2h14v-2H4V6H2z" /></g></svg>,
	category: 'common',
	keywords: [ __( 'images' ), __( 'photos' ) ],
	attributes: blockAttributes,
	supports: {
		align: true,
	},

	edit,

	save( { attributes } ) {
		return null;
		const { images, columns = defaultColumnsNumber( attributes ), imageCrop, linkTo } = attributes;
		const options = {
			items: columns,
			slideBy: 'page'
		}
		return (
			<ul className={ `columns-${ columns }  owl-theme owl-carousel owl-result ${ imageCrop ? 'is-cropped' : '' }` }  data-items={ columns } >
				{ images.map( ( image ) => {
					let href;
					href = image.hlink;

					//const img = <img src={ image.url } alt={ image.alt } data-id={ image.id } data-link={ image.link } className={ image.id ? `wp-image-${ image.id }` : null } />;
					const img = ( <div src={  image.url } alt={ image.alt } class={ `block-img img-lazy-load-rest`} data-id={ image.id } data-media-id={ image.id }>
						<section class="offsetab">
						{ image.headline ? <h3 className={'headline'}>{ image.headline }</h3>  : ''}
						{ image.button ? <div className="">	<h3 className={'center'}>{ image.button }</h3> </div> : ''	}
						</section>
					</div>);

					return (
						<div key={ image.id || image.url } className="blocks-carousel-item">
							 	<a href={ href }>{ img }

								</a>
						</div>
					);
				} ) }
			</ul>
		);
	},
});
