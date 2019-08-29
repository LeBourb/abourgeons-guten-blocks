import { debounce } from 'throttle-debounce'

const { __ } = wp.i18n
const { apiFetch } = wp;
const { Component, Fragment } = wp.element
const { SelectControl, TextControl } = wp.components

export default class SearchPost extends Component {

  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {
      results: false,
      currentType: 'posts',
    }
  }

  onSearch(search) { return debounce( 300, search => {

		if( search.length < 3 ) {
      return
    }

    this.setState( { results: __( 'Loading…', 'abourgeons-guten' ) } )

    apiFetch({
      path: `/wp/v2/posts/?search=${encodeURI( search )}&per_page=20`
    }).then( results => {
      if(results.length == 0 ) {
        results = __( 'No result', 'abourgeons-guten' )
      }
			this.setState( {  results: results  } )
		} )
  } )(search)
}

  render() {

		const { results, currentType } = this.state
      /*
        <SelectControl
					label={ __( 'Post type', 'abourgeons-guten' ) }
					options={ JSON.parse( advancedGutenbergBlocksPost.types ) }
					onChange={ value => this.setState( { currentType: value } ) }
				/>
        */
    return (
      <Fragment>


				<TextControl
					type="search"
					placeholder={ __( "Type a post title", 'abourgeons-guten' ) }
					onChange={ value => this.onSearch( value ) }
				/>

        <div className="AGB-panel-results">

          { !! results && Array.isArray(results) ?
            (
              <ul>
                { results.map( post => {
                  return (
                    <li
                      key={post.id}
                      onClick={ () => this.props.onChange( { id: post.id, type: currentType } ) }
                    >
                      <span>{ post.title.rendered }</span>
                    </li>
                  )
                } ) }
              </ul>
            ) : (
              <p>{results}</p>
            )
          }
        </div>

			</Fragment>
    )
  }
}
