/**
 * BLOCK: my-block
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './style.scss';
import './editor.scss?editor';
//import './searchproduct.scss';
//R14 dze
const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { withNotices } = wp.components;
const { apiFetch } = wp;

import { ProductsSpecificSelect } from './searchproduct.js';

const PRODUCT_DATA = {};

const blockAttributes = {
	productId: {
		type: 'number',
    default: 0
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
var product_cover = registerBlockType( 'abourgeons-18-fall/product-cover', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( '18 fall Product Cover' ), // Block title.
	icon: 'shield', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'my-block — CGB Block' ),
		__( 'CGB Example' ),
		__( 'create-guten-block' ),
	],

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	edit: withNotices( ( { attributes, setAttributes, isSelected, className, noticeOperations, noticeUI } ) => {
		// Creates a <p class='wp-block-cgb-block-my-block'></p>.
    const onSelectProduct = ( product ) => {
      if ( product ) {
        PRODUCT_DATA[product.id]= product;
        setAttributes( { productId: product.id } );
        return;
      }
    };

		return (
			<div className={ className }>
        { !attributes.productId && (
        <ProductsSpecificSelect onSelectProduct= { onSelectProduct } />
        ) }
        { attributes.productId && (
          <ProductTile productId={ attributes.productId }/>
      ) }
			</div>
		);
	}),

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	save: function(  { attributes, className } ) {
    const { productId } = attributes;
		return (
			<div className={ className }>
        { productId && (
          <ProductTile productId={ productId }
             />
      ) }
			</div>
		);
	}
}
 );

/**
 *
 *
 * @todo Add the functionality and everything.
 */
export class ProductTile extends React.Component {

	/**
	 * Constructor.
	 */
	constructor( props ) {
		super( props );
	}

/*  fetch( ) {
    if(this.props.productId) {
      apiFetch( {
        path: '/wc/v2/products/' + this.props.productId
      }).then( (product) => {
          PRODUCT_DATA[ this.props.productId ] = product;
          this.setState ( {
            product: product
          } );

        }
      );
    }
  }*/

	/**
	 * Render the product specific select screen.
   <ProductSpecificSelectedProducts
     columns={ this.props.attributes.columns }
     productIds={ this.state.selectedProducts }
     addOrRemoveProduct={ this.addOrRemoveProduct.bind( this ) }
   />
	 */
	render() {
    /*if(!this.state || !this.state.product) {
      this.fetch();
    }
    console.log(product_cover);*/
    var product = PRODUCT_DATA[ this.props.productId ];
		return (
			<div className="wc-products-list-card wc-products-list-card--specific">
        { product && (  <img src={ product.images[0].src } />
        )}
			</div>
		);
	}
}
