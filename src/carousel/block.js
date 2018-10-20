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
	MultiMediaResponsive: {
		type: 'boolean',
		default: true,
	},
	linkTo: {
		type: 'string',
		default: 'none',
	},
	rightaligned: {
		type: 'array',
		default: [],
	}
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
	},
});
