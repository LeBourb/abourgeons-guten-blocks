const { __ } = wp.i18n;
const { Toolbar, Dropdown, Dashicon } = wp.components;
const { apiFetch } = wp;

/**
 * Product data cache.
 * Reduces the number of API calls and makes UI smoother and faster.
 */
const PRODUCT_DATA = {};

/**
 * When the display mode is 'Specific products' search for and add products to the block.
 *
 * @todo Add the functionality and everything.
 */
export class ProductsSpecificSelect extends React.Component {

	/**
	 * Constructor.
	 */
	constructor( props ) {
		super( props );
    /*
		this.state = {
			selectedProducts: props.selected_display_setting || [],
		}*/
	}

	/**
	 * Render the product specific select screen.
   <ProductSpecificSelectedProducts
     columns={ this.props.attributes.columns }
     productIds={ this.state.selectedProducts }
     addOrRemoveProduct={ this.addOrRemoveProduct.bind( this ) }
   />
	 */
	render() {
		return (
			<div className="wc-products-list-card wc-products-list-card--specific">
				<ProductsSpecificSearchField
					addOrRemoveProductCallback={ this.props.onSelectProduct }
				/>
			</div>
		);
	}
}

/**
 * Product search area
 */
class ProductsSpecificSearchField extends React.Component {

	/**
	 * Constructor.
	 */
	constructor( props ) {
		super( props );

		this.state = {
			searchText: '',
			dropdownOpen: false,
		}

		this.updateSearchResults = this.updateSearchResults.bind( this );
		this.setWrapperRef = this.setWrapperRef.bind( this );
		this.handleClickOutside = this.handleClickOutside.bind( this );
		this.isDropdownOpen = this.isDropdownOpen.bind( this );
	}

	/**
	 * Hook in the listener for closing menu when clicked outside.
	 */
	componentDidMount() {
		document.addEventListener( 'mousedown', this.handleClickOutside );
	}

	/**
	 * Remove the listener for closing menu when clicked outside.
	 */
	componentWillUnmount() {
		document.removeEventListener( 'mousedown', this.handleClickOutside );
	}

	/**
	 * Set the wrapper reference.
	 *
	 * @param node DOMNode
	 */
	setWrapperRef( node ) {
		this.wrapperRef = node;
	}

	/**
	 * Close the menu when user clicks outside the search area.
	 */
	handleClickOutside( evt ) {
        if ( this.wrapperRef && ! this.wrapperRef.contains( event.target ) ) {
            this.setState( {
            	searchText: '',
            } );
        }
	}

	isDropdownOpen( isOpen ) {
		this.setState( {
			dropdownOpen: !! isOpen,
		} );
	}

	/**
	 * Event handler for updating results when text is typed into the input.
	 *
	 * @param evt Event object.
	 */
	updateSearchResults( evt ) {
		this.setState( {
			searchText: evt.target.value,
		} );
	}

	/**
	 * Render the product search UI.
	 */
	render() {
		const divClass = 'wc-products-list-card__search-wrapper';

		return (
			<div className={ divClass + ( this.state.dropdownOpen ? ' ' + divClass + '--with-results' : '' ) } ref={ this.setWrapperRef }>
				<div className="wc-products-list-card__input-wrapper">
					<Dashicon icon="search" />
					<input type="search"
						className="wc-products-list-card__search"
						value={ this.state.searchText }
						placeholder={ __( 'Search for products to display' ) }
						onChange={ this.updateSearchResults }
					/>
				</div>
				<ProductSpecificSearchResultsDropdown
					searchString={ this.state.searchText }
					addOrRemoveProductCallback={ this.props.addOrRemoveProductCallback }
					selectedProducts={ this.props.selectedProducts }
					isDropdownOpenCallback={ this.isDropdownOpen }
				/>
			</div>
		);
	}
}

/**
 * Render product search results based on the text entered into the textbox.
 */
 /*
const ProductSpecificSearchResults = (props) => {
  console.log(props);
  const { searchString, isDropdownOpenCallback, addOrRemoveProductCallback, selectedProducts } = props;
  if(searchString != '') {
    return apiFetch( {
      path: '/wc/v2/products?per_page=10&search=' + searchString
    }).then( (products) => {
        if ( ! products.data ) {
    			return null;
    		}


    		// Populate the cache.
    		for ( let product of products ) {
    			PRODUCT_DATA[ product.id ] = product;
    		}


        return <ProductSpecificSearchResultsDropdown
          products={ products }
          addOrRemoveProductCallback={ addOrRemoveProductCallback }
          selectedProducts={ selectedProducts }
          isDropdownOpenCallback={ isDropdownOpenCallback }
        />;
    	}
    );

  }
  return null;

}*/

/**
 * The dropdown of search results.
 */
class ProductSpecificSearchResultsDropdown extends React.Component {

	/**
	 * Set the state of the dropdown to open.
	 */
	componentDidMount() {
		this.props.isDropdownOpenCallback( true );
	}

	/**
	 * Set the state of the dropdown to closed.
	 */
	componentWillUnmount() {
		this.props.isDropdownOpenCallback( false );
	}

  /*
   * fetch data based on dropdown menu
  */
  fetch() {
    const { searchString } = this.props;
    if(searchString != '') {
      apiFetch( {
        path: '/wc/v2/products?per_page=10&search=' + searchString
      }).then( (products) => {


      		// Populate the cache.
      		for ( let product of products ) {
      			PRODUCT_DATA[ product.id ] = product;
      		}
          this.props.products = products;
          this.setState ( {
      			products: products,
            searchString: null,
      		} );

      	}
      );
    }
  }


	/**
	 * Render dropdown.
	 */
	render() {
		const { searchString, products, addOrRemoveProductCallback, selectedProducts } = this.props;

		let productElements = [];
    if(!products && searchString) {
      this.fetch();
      return <span className="wc-products-list-card__search-no-results"> { __( 'No products found' ) } </span>;
    }

    if (products) {
  		for ( let product of products ) {
  			productElements.push(
  				<ProductSpecificSearchResultsDropdownElement
  					product={product}
  					addOrRemoveProductCallback={ addOrRemoveProductCallback }
  				/>
  			);
  		}
    }

		return (
			<div role="menu" className="wc-products-list-card__search-results" aria-orientation="vertical" aria-label={ __( 'Products list' ) }>
				<div>
					{ productElements }
				</div>
			</div>
		);
	}
}




/**
 * One search result.
 */
class ProductSpecificSearchResultsDropdownElement extends React.Component {

	/**
	 * Constructor.
	 */
	constructor( props ) {
		super( props );

		this.handleClick = this.handleClick.bind( this );
	}

	/**
	 * Add product to main list and change UI to show it was added.
	 */
	handleClick() {
		this.props.addOrRemoveProductCallback( this.props.product );
	}

	/**
	 * Render one result in the search results.
	 */
	render() {
		const product = this.props.product;
		//let icon = this.props.selected ? <Dashicon icon="yes" /> : null;
//	{ icon }
		return (
			<div className={ 'wc-products-list-card__content' + ( this.props.selected ? ' wc-products-list-card__content--added' : '' ) } onClick={ this.handleClick }>
				<img src={ product.images[0].src } />
				<span className="wc-products-list-card__content-item-name">{ product.name }</span>
			</div>
		);
	}
}

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
    if(!product) {
      apiFetch( {
        path: '/wc/v2/products/' + this.props.productId
      }).then( (product) => {


          // Populate the cache.

          PRODUCT_DATA[ product.id ] = product;

          this.setState ( {
            product: product
          } );

        }
      );
    }
		return (
			<div className="wc-products-list-card wc-products-list-card--specific">
        { product ? <img src={ product.images[0].src } /> : (<h3>Loading...</h3>)
        }
			</div>
		);
	}
}


export class ProductNamePrice extends   React.Component {

	/**
	 * Constructor.
	 */
	constructor( props ) {
		super( props );
	}

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
    if(!product) {
      apiFetch( {
        path: '/wc/v2/products/' + this.props.productId
      }).then( (product) => {


          // Populate the cache.

          PRODUCT_DATA[ product.id ] = product;

          this.setState ( {
            product: product
          } );

        }
      );
    }
		return (
			<div className="wc-products-list-card wc-products-list-card--specific">
        { product ? (<a>{product.name} - {product.price}</a>) : (<p>Loading...</p>)
        }
			</div>
		);
	}

}
