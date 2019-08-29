
//  Import CSS.
import './style.scss';
import './editor.scss?editor';

/**
 * External dependencies
 */

import * as classnames from 'classnames'

/**
 * WordPress dependencies
 */
const { IconButton, PanelBody, RangeControl, ToggleControl, Toolbar, withNotices } = wp.components;
const { Fragment } = wp.element;
//import { __ } from '@wordpress/i18n';
const { __ } = wp.i18n;
const { createBlock } = wp.blocks;
const {
	BlockControls,
	InspectorControls,
	MediaPlaceholder,
	MediaUpload,
	RichText,
} = wp.editor;

const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks

const { Button } = wp.components;

const blockAttributes = {
	productIds: {
		type: 'array',
		default: []
	}
};

export const name = 'abourgeons-guten/products-grid';

import { ProductsSpecificSelect, ProductTile } from './../lib/product.js';

registerBlockType( name, {
//export const settings = {
	title: __( 'Template 2018 FALL Product Grid 01' ),

	description: __( 'Add a full-width image, and layer text over it — great for headers.' ),

	icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M4 4h7V2H4c-1.1 0-2 .9-2 2v7h2V4zm6 9l-4 5h12l-3-4-2.03 2.71L10 13zm7-4.5c0-.83-.67-1.5-1.5-1.5S14 7.67 14 8.5s.67 1.5 1.5 1.5S17 9.33 17 8.5zM20 2h-7v2h7v7h2V4c0-1.1-.9-2-2-2zm0 18h-7v2h7c1.1 0 2-.9 2-2v-7h-2v7zM4 13H2v7c0 1.1.9 2 2 2h7v-2H4v-7z" /><path d="M0 0h24v24H0z" fill="none" /></svg>,

	category: 'common',

	attributes: blockAttributes,

	/*getEditWrapperProps( attributes ) {
		const { align } = attributes;
		if ( -1 !== validAlignments.indexOf( align ) ) {
			return { 'data-align': align };
		}
	},*/



	edit: withNotices( ( { attributes, setAttributes, isSelected, className, noticeOperations, noticeUI } ) => {
		const { productIds } = attributes;


	/*	const classes = classnames.default(
			className,
			{
				'has-img-on-right': hasImgonRight,
			}
		);*/

		const onSelectProduct= (index,  ) => {
			return () => {
				if ( product ) {
					//PRODUCT_DATA[product.id]= product;
					var productIds = this.props.attributes.productIds.slice();
					productIds[index] = product.id;
					setAttributes( { productIds: productIds } );
					return;
				}
			}
		};

		const onAddItem= () => {
			//PRODUCT_DATA[product.id]= product;
			return () => {
				var productIds = attributes.productIds.slice();
				productIds.push(null);
				setAttributes( { productIds: productIds } );
			};
		};

		const controls = (
			<Fragment>
				<BlockControls>
					<Toolbar>
							<IconButton
									className="components-toolbar__control"
									label={ __( 'Add Items' ) }
									icon="plus"
									onClick={ onAddItem() }
								/>
					</Toolbar>
				</BlockControls>
			</Fragment>
		);

		return (
				<Fragment>
					{ controls }
					  <div className={"abourgeons-guten-products-grid"}>
		 		{ productIds.map( ( productId, index ) => (
				<div className={"col-xs-12 col-sm-6 col-md-4 col-lg-3"}>
				{	productId !== null ? <ProductTile productId={ productId }/> :<ProductsSpecificSelect onSelectProduct= { ( product ) => {
					var productIds = attributes.productIds.slice();
					productIds[index] = product.id;
					setAttributes( { productIds: productIds } ); } } /> }
				</div>
				))}
			</div>
				</Fragment>
		)
	}	),

	save( { attributes, className } ) {
		return null;
	},

});
