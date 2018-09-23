
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
	title: {
		type: 'array',
		source: 'children',
		selector: 'h3',
	},
	text: {
		type: 'array',
		source: 'children',
		selector: 'p',
	},
	url: {
		type: 'string',
	},
	id: {
		type: 'number',
	},
	hasImgonRight: {
		type: 'boolean',
		default: true,
	},
};

export const name = 'abourgeons-guten/t18fall-block01';

registerBlockType( name, {
//export const settings = {
	title: __( 'Template 2018 FALL Block 01' ),

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
		const { url, title, text, id, hasImgonRight } = attributes;
		const onSelectImage = ( media ) => {
			if ( ! media || ! media.url ) {
				setAttributes( { url: undefined, id: undefined } );
				return;
			}
			setAttributes( { url: media.url, id: media.id } );
		};
		const toggleImageonRight = () => setAttributes( { hasImgonRight: ! hasImgonRight } );

		const style = backgroundImageStyles( url );
		const classes = classnames(
			className,
			{
				'has-img-on-right': hasImgonRight,
			}
		);

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
				{ !! url && (
					<InspectorControls>
						<PanelBody title={ __( 'Image Settings' ) }>
							<ToggleControl
								label={ __( 'Image on Right' ) }
								checked={ !! hasImgonRight }
								onChange={ toggleImageonRight }
							/>
						</PanelBody>
					</InspectorControls>
				) }
			</Fragment>
		);

		return (
			<Fragment>
				{ controls }
        <div className = { classes }>
					<div className= 'block-text'  >
						<div className='block-inside'>
							{ title || isSelected ? (
								<RichText
									tagName='h3'
									className='title'
									placeholder={ __( 'Write title…' ) }
									value={ title }
									onChange={ ( value ) => setAttributes( { title: value } ) }
									inlineToolbar
								/>
							) : null }
							<hr/>
							{ text || isSelected ? (
								<RichText
									tagName='p'
									className='content-text'
									placeholder={ __( 'Write content text here…' ) }
									value={ text }
									onChange={ ( value ) => setAttributes( { text: value } ) }
									inlineToolbar
								/>
							) : null }
							</div>
						</div>
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
					          (	<div
						  					data-url={ url }
						  					style={ style }
						            className={ 'block-img'}
					  					/> )
									}
          </div>
			</Fragment>
		);
	} ),

	save( { attributes, className } ) {
		const { id, url, title, text , hasImgonRight } = attributes;
		const classes = classnames(
			className,
			{
				'has-img-on-right': hasImgonRight,
			}
		);

		return (
			<div className={ classes } >
				<div className= 'block-text col-xs-12 col-sm-12 col-md-3 col-lg-3' >
					<div className='block-inside'>
					{ title && title.length > 0 && (
						<RichText.Content tagName="h3" className="title" value={ title } />
					) }
					<hr/>
					{ text && text.length > 0 && (
						<RichText.Content tagName="p" className="content-text" value={ text } />
					) }
					</div>
				</div>
				<div
						data-url={ url }
						data-media-id={ id }
						className= 'block-img img-lazy-load-rest col-xs-12 col-sm-12 col-md-9 col-lg-9'
					/>
			</div>
		);
	},

});

function dimRatioToClass( ratio ) {
	return ( ratio === 0 || ratio === 50 ) ?
		null :
		'has-background-dim-' + ( 10 * Math.round( ratio / 10 ) );
}

function backgroundImageStyles( url ) {
	return url ?
		{ backgroundImage: `url(${ url })` } :
		undefined;
}
