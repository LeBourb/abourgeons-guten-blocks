
//  Import CSS.
import './style.scss';
import './editor.scss?editor';

/**
 * External dependencies
 */


import { default as edit } from './edit';

/**
 * WordPress dependencies
 */
const { IconButton, PanelBody, RangeControl, ToggleControl, Toolbar, withNotices,SelectControl } = wp.components;
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
	headline: {
		type: 'string'
	},
	text: {
		type: 'array',
		default: []
	},
	media_url: {
		type: 'array',
		default: []
	},
	button: {
		type: 'string',
	},
	media_id: {
		type: 'array',
		default: []
	},
	hlink: {
		type: 'string'
	},
	MultiMediaResponsive: {
		type: 'boolean',
		default: false
	},
	isBackgroundFixed: {
		type: 'boolean',
		default: false
	},
	hasSubtitle: {
		type: 'boolean'
	},
	hasButton: {
		type: 'boolean'
	},
	subtitle: {
		type: 'string'
	},
	textAligned: {
		type: 'string',
		default: 'center',
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
	fontSize : {
		type: 'number',
		default: 50
	}
};

export const name = 'abourgeons-guten/image-cover';

registerBlockType( name, {
//export const settings = {
	title: __( 'Image Cover 2018 FALL Block 01' ),

	description: __( 'Cover image and text.' ),

	icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M4 4h7V2H4c-1.1 0-2 .9-2 2v7h2V4zm6 9l-4 5h12l-3-4-2.03 2.71L10 13zm7-4.5c0-.83-.67-1.5-1.5-1.5S14 7.67 14 8.5s.67 1.5 1.5 1.5S17 9.33 17 8.5zM20 2h-7v2h7v7h2V4c0-1.1-.9-2-2-2zm0 18h-7v2h7c1.1 0 2-.9 2-2v-7h-2v7zM4 13H2v7c0 1.1.9 2 2 2h7v-2H4v-7z" /><path d="M0 0h24v24H0z" fill="none" /></svg>,

	category: 'common',

	attributes: blockAttributes,

	/*getEditWrapperProps( attributes ) {
		const { align } = attributes;
		if ( -1 !== validAlignments.indexOf( align ) ) {
			return { 'data-align': align };
		}
	},*/

	edit: edit, /* withNotices( ( { attributes, setAttributes, isSelected, className, noticeOperations, noticeUI } ) => {
		const { url, text, id, hlink, headline, button, MultiMediaResponsive } = attributes;
		const onSelectImage = ( media ) => {
			if ( ! media || ! media.url ) {
				setAttributes( { url: undefined, id: undefined } );
				return;
			}
			setAttributes( { url: media.url, id: media.id } );
		};

		const style = backgroundImageStyles( url );
		const classes = classnames.default(
			className
		);

		const toggleMultiMediaResponsive = (MultiMediaResponsive) => {
			setAttributes( { MultiMediaResponsive: MultiMediaResponsive } );
		};

		const controls = (
			<Fragment>
				<BlockControls>
					<Toolbar>
						<MediaUpload
							onSelect={ onSelectImage }
							type="image"
							value={ id }
							render={ ( { open } ) => (
								<IconButton
									className="components-toolbar__control"
									label={ __( 'Edit image' ) }
									icon="edit"
									onClick={ open }
								/>
							) }
						/>
					</Toolbar>
				</BlockControls>
				<InspectorControls>
					<PanelBody title={ __( 'Responsiveness Multi-Medias' ) }>
						<ToggleControl
							label={ __( 'Multi-Media Responsiveness' ) }
							checked={ !! MultiMediaResponsive }
							onChange={ toggleMultiMediaResponsive }
						/>
					</PanelBody>
				</InspectorControls>
				{ MultiMediaResponsive ? <SelectControl
					label="Size"
					value={ size }
					options={ [
						{ label: 'Big', value: '100%' },
						{ label: 'Medium', value: '50%' },
						{ label: 'Small', value: '25%' },
					] }
					onChange={ ( size ) => { setState( { size } ) } }
				/> : ''
			}
			</Fragment>
		);

		return (
			<Fragment>
					{ controls }
        	<div className = { classes }>
							{ ! url ?  ( <MediaPlaceholder
									icon= 'edit'
									className={ className }
									labels={ {
										title: 'Select',
										name: __( 'an image' ),
									} }
									onSelect={ onSelectImage }
									accept="image/*"
									type="image"
									notices={ noticeUI }
									onError={ noticeOperations.createErrorNotice }
								/> ) :
		          (	<FeaturingImage
									url={ url }
									id={ id }
									onRemove={ () => { setAttributes( { id : null, url : null } ) } }
									onValidate={ () => { } }
									setAttributes={ ( attrs ) => setAttributes( attrs ) }
									headline={ headline }
									button={ button }
									hlink={ hlink }
								/> )
						}
          </div>
			</Fragment>
		);
	} ),*/

	save( { attributes, className } ) {
		return null;
	},

});
