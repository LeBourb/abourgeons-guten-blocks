
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
import { ProductNamePrice, ProductsSpecificSelect } from './../lib/product';
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
    const { attributes, setAttributes, isSelected, className, noticeOperations, noticeUI } = this.props;
    const { media_url, media_id, MultiMediaResponsive, productId, isMultiProducts, productIds, backgroundColor, textColor, dimRatio, isBackgroundFixed, hlink, widthRatio, textAligned, imageAligned, height, width } = attributes;
    const onSelectProduct = ( product ) => {
      if ( product ) {
				productIds.push(product.id);
        setAttributes( { productIds: productIds.slice() } );
        return;
      }
    };

    const toggleMultiProducts = (isMultiProducts) => {
      setAttributes( { isMultiProducts: isMultiProducts } );
    };

    const toggleMultiMediaResponsive = (MultiMediaResponsive) => {
      setAttributes( { MultiMediaResponsive: MultiMediaResponsive } );
    };

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

		const mainClassName = classnames( className, {
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
						widthRatio={widthRatio}
						isBackgroundFixed = {isBackgroundFixed}
					/>
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
            headline={ null }
						isSelected= {isSelected}
            size={this.state.size}
						backgroundColor= {backgroundColor}
						textColor={textColor}
						dimRatio={dimRatio}
						widthRatio={widthRatio}
						isBackgroundFixed={isBackgroundFixed}
            button={ null }
            textAligned= { textAligned  }
						imageAligned={ imageAligned }
            edit={ null }
						width={ width}
						height={ height}
            MultiMediaResponsive={ MultiMediaResponsive }
          >
            <ul className="products_list">
							{ productIds.map( ( productId, index ) => (
									<li>
										{ productId ? <ProductNamePrice productId= { productId } /> : '' }
									</li>
							))}
						</ul>
          </FeaturingImage>
					<div>
						<h3>Add a new product to the list</h3>
						<ProductsSpecificSelect onSelectProduct= { onSelectProduct } />
					</div>
        </div>
      </Fragment>
    );
  }
}

export default withNotices( productCoverEdit );
