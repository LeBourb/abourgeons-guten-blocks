import './style.scss'
import './editor.scss?editor'

import Inspector from './inspect'
import Preview from './preview'

const { __ } = wp.i18n
const { registerBlockType } = wp.blocks
const { Fragment } = wp.element

export default registerBlockType(
  'abourgeons-guten/post',
  {
    title: __( 'Post Thumbnail', 'abourgeons-guten' ),
    description: __( 'Display a pretty post link (from any post type)', 'abourgeons-guten' ),
    category: 'common',
    icon: { background: '#2F313A', foreground: '#DEBB8F', src: 'admin-post' },
    keywords: [
      __( 'link', 'abourgeons-guten' ),
    ],
    attributes: {
      postID: {
        type: 'integer',
      },
      postType: {
        type: 'string',
      },
			showCategory: {
        type: 'boolean',
				default: true,
      },
			showAuthor: {
        type: 'boolean',
				default: true,
      },
			showImage: {
        type: 'boolean',
				default: true,
      },
    },
    edit: props => {

      const { attributes, setAttributes } = props
      const { postID, postType } = attributes

      // Set default values (keep here to save them in html
      ! postType && setAttributes( { postType: 'Post' } )

      return (
				<Fragment>

          <Inspector { ...{ attributes, setAttributes } } />

	        { !! postID ? (
						<Preview { ...{ attributes } } />
	        ) : (
	          <p class="AGB-block-message">{ __( 'Search for a post in the inspector', 'abourgeons-guten' ) }</p>
	        ) }

				</Fragment>
      )
  	},
    save: () => {
      return null
    },
  },
)
