const { __ } = wp.i18n;
const { apiFetch } = wp;
const { Component } = wp.element;

export default class Preview extends Component {

	constructor(props) {
		super(props);
		// Don't call this.setState() here!
		this.state = {
			featuredImage: false,
			post: false,
			author: false,
			category: false,
		}
	}


	getPost() {

		const { postID, postType } = this.props.attributes

		apiFetch( {
			path: `/wp/v2/posts/${postID}`
		}).then( post => {

			this.setState( { post } )

			// Author
			if ( typeof post.author != "undefined" ) {

				apiFetch({
	        path: `/wp/v2/users/${post.author}`
				}).then( author => {
					this.setState( { author: author.name } )
				} )
			}

			// Category
			if ( typeof post.categories != "undefined" ) {
				apiFetch({
	        path: `/wp/v2/categories/${post.categories[0]}`
				}).then( category => {
					this.setState( { category: category.name } )
				} )
			}

			// Featured Media
			if ( typeof post.featured_media != "undefined" && post.featured_media != 0 ) {
				apiFetch({
	        path: `/wp/v2/media/${post.featured_media}`
				}).then( featuredImage => {
					let size = featuredImage.media_details.sizes.hasOwnProperty('large') ? 'large' : 'full';
					this.setState( { featuredImage: featuredImage.media_details.sizes[size].source_url } )

				} )
			}

		} )
	}

	componentWillMount() {
    this.getPost()
  }

	componentDidUpdate(lastProps, lastStates) {

		if( lastProps.attributes.postID != this.props.attributes.postID ) {
			this.getPost()
		}
	}

  render() {

		const { showImage, showCategory, showAuthor } = this.props.attributes
		const { post, featuredImage, category, author } = this.state

		// Get HTML Excerpt
		const getExcerpt = () => {
			return {__html: ( typeof this.state.post.excerpt != "undefined" ) ?  this.state.post.excerpt.rendered : '' }
		}

    return (
			!! post ? (
				<div className="wp-block-advanced-gutenberg-blocks-post">
					{ !! featuredImage && showImage && (
						<a
							href={ post.link }
							className="wp-block-advanced-gutenberg-blocks-post__image"
							style={ {
								backgroundImage: `url(${featuredImage})`
							} }
						/>
					) }
					<div className="wp-block-advanced-gutenberg-blocks-post__content">
						<p className="wp-block-advanced-gutenberg-blocks-post__title">
							<a href={ post.link }>{ post.title.rendered }</a>
						</p>
						<p className="wp-block-advanced-gutenberg-blocks-post__metas">
							<em>
								{ !! category && showCategory && (
								<span> { __( 'In', 'advanced-gutenberg-blocks' ) + ' ' + category } </span>
								) }
								{ !! author && showAuthor && (
								<span> { __( 'By', 'advanced-gutenberg-blocks' ) + ' ' + author } </span>
								) }
							</em>
						</p>
						<div
							className="wp-block-advanced-gutenberg-blocks-post__excerpt"
							dangerouslySetInnerHTML={ getExcerpt() }
						/>
						<p class="wp-block-advanced-gutenberg-blocks-product__actions">
							<a href={ post.link } className="wp-block-advanced-gutenberg-blocks-post__button">
								{ __( 'Read more', 'advanced-gutenberg-blocks' ) }
							</a>
						</p>
					</div>
				</div>
			) : (
				<p class="AGB-block-message">{ __( 'Loading post…', 'advanced-gutenberg-blocks' ) }</p>
			)
    )
  }
}
