
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

import { FeaturingImage, FeaturingImageToolbar, FeaturingImagePanel  } from './../lib/image-featuring';
import { ProductNamePrice, ProductsSpecificSelect, ProductTileVariations } from './../lib/product';
import classnames from 'classnames';


class productCoverEdit extends Component {

  constructor() {
		super( ...arguments );

		this.state = {
			size: 0,
			edit: null
		};

	}

  render() {
    const { attributes, setAttributes, toggleSelection, isSelected, className, noticeOperations, noticeUI } = this.props;
    const { media_url, media_id, MultiMediaResponsive, productId, isMultiProducts, productIds, backgroundColor, textColor, dimRatio, isBackgroundFixed, hlink, textAligned, imageAligned, widthPrct, heightPrct } = attributes;
    const onSelectProduct = ( product ) => {
      if ( product ) {
				productIds.push(product.id);
        setAttributes( { productIds: productIds.slice() } );
        return;
      }
    };

		const mainClassName = classnames.default( className, {
			'is-selected': isSelected
		});


		this.setState = this.setState.bind( this );

    const controls = (
    <Fragment>
      <BlockControls>
        <Toolbar>
					<FeaturingImagePanel
						setAttributes={setAttributes}
						size={this.state.size}
						media_url={ media_url }
						media_id={ media_id }
						hlink={hlink}
						/>
        </Toolbar>
      </BlockControls>
      <InspectorControls>
				<FeaturingImageToolbar
						setAttributes={setAttributes}
						MultiMediaResponsive={MultiMediaResponsive}
						hasSubtitle={null}
						hasButton={null}
						size={this.state.size}
						setState={this.setState}
						backgroundColor= {backgroundColor}
						textColor={textColor}
						textAligned={textAligned}
						dimRatio={dimRatio}
						isBackgroundFixed = {isBackgroundFixed}
					/>
				<PanelBody title={ __( 'Add New Product' ) }>
					<ProductsSpecificSelect onSelectProduct= { onSelectProduct } />
				</PanelBody>
    </InspectorControls>
  </Fragment>
  );
  let state = {
     items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'],
   };
  //<ProductsSpecificSelect onSelectProduct= { onSelectProduct } />
  //
      //{ controls }
    return (
      <Fragment>
		    { controls }
        <div className={ mainClassName }>
            <FeaturingImage
            media_url={ media_url }
            media_id={ media_id }
            onRemove={  null }
            onValidate={ null }
            onCancel={ null }
            setAttributes={ setAttributes }
						toggleSelection = {toggleSelection}
            headline={ null }
						isSelected= {isSelected}
            size={this.state.size}
						backgroundColor= {backgroundColor}
						textColor={textColor}
						dimRatio={dimRatio}
						isBackgroundFixed={isBackgroundFixed}
            button={ null }
            textAligned= { textAligned  }
						imageAligned={ imageAligned }
            edit={ null }
						heightPrct = {heightPrct}
						widthPrct = {widthPrct}
            MultiMediaResponsive={ MultiMediaResponsive }
          >
					<ul className="products_list">
							{ productIds.map( ( productId, index ) => (
									<div class="product-over-details" data-id={index}>
										<ProductTileVariations  productId= { productId } />
									</div>
						)) }
					</ul>
          </FeaturingImage>
					<div className="products_list_footer">
						{ productIds.map( ( productId, index ) => (
								<strong>
									<ProductNamePrice productId= { productId } />
									<IconButton
											icon="trash"
											onClick={ () => { productIds.splice(index,1); setAttributes({productIds:productIds.slice()}); } }
											className="components-trash components-icon-trash components-toolbar__control"
											label={ __( 'Remove Product' ) }
										/>
								</strong>
						))}
					</div>
				</div>
      </Fragment>
    );
  }
}

export default withNotices( productCoverEdit );
