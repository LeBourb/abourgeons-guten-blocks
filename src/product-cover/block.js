/**
 * BLOCK: my-block
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './style.scss';
import './editor.scss?editor';
import { default as edit } from './edit';
//import './searchproduct.scss';
//R14 dze
const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { apiFetch } = wp;
const { IconButton, PanelBody, RangeControl, ToggleControl, Toolbar, withNotices,SelectControl } = wp.components;
const { Fragment , Component } = wp.element;
const {
	BlockControls,
	MediaUpload,
	MediaPlaceholder,
	InspectorControls,
	mediaUpload,
} = wp.editor;

import { ProductsSpecificSelect, ProductVisual } from './../lib/product.js';

const PRODUCT_DATA = {};

const blockAttributes = {
	productId: {
		type: 'number',
    default: 0
	},
	isMultiProducts: {
		type: 'boolean',
		default: false
	},
	MultiMediaResponsive: {
		type: 'boolean',
		default: true
	},
	productIds: {
		type: 'array',
		default: []
	},
	media_id: {
		type: 'array',
		default: []
	},
	media_url: {
		type: 'array',
		default: []
	},
	backgroundColor: {
		type: 'string',
		default:'111E'
	},
	textColor: {
		type: 'string',
		default:'111E'
	},
	dimRatio: {
		type: 'number',
		default: 50,
	},
	isBackgroundFixed: {
		type: 'boolean',
		default: false
	},
	hlink: {
		type: 'string'
	},
	textAligned: {
		type: 'string',
		default: 'center'
	},
	imageAligned: {
		type: 'string',
		default: 'center'
	},
	widthPrct: {
		type: 'number',
		default: 100
	},
	heightPrct: {
		type: 'number',
		default: 100
	}
};

var product = null;

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
var product_cover = registerBlockType( 'abourgeons-guten/product-cover-block', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( '18 fall Product Cover' ), // Block title.
	icon: 'shield', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'my-block — CGB Block' ),
		__( 'CGB Example' ),
		__( 'create-guten-block' ),
	],

	attributes: blockAttributes,

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	edit: edit,

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	save: function(  { attributes, className } ) {
		return null;
	}
}
 );
