
//  Import CSS.
import './style.scss';
import './editor.scss?editor';
import { FeaturingImage } from './../lib/image-featuring';
/**
 * External dependencies
 */

import * as classnames from 'classnames'

/**
 * WordPress dependencies
 */
const { IconButton, PanelBody, RangeControl, ToggleControl, Toolbar, withNotices, SelectControl, TextControl } = wp.components;
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
	left_url: {
		type: 'array',
		default: []
	},
	right_url: {
		type: 'array',
		default: []
	},
	left_id: {
		type: 'array',
		default: []
	},
	right_id: {
		type: 'array',
		default: []
	},
	left_text: {
		type: 'array',
		default: []
	},
	right_text: {
		type: 'array',
		default: []
	},
	MultiMediaResponsive: {
		type: 'boolean',
		default: false
	},
	hasSubtitle: {
		type: 'boolean'
	},
	subtitle: {
		type: 'string'
	},
	left_fontAwesome: {
		type: 'string'
	},
	right_fontAwesome: {
		type: 'string'
	}
};

export const name = 'abourgeons-guten/t18fall-two-images';

registerBlockType( name, {
//export const settings = {
	title: __( 'Template 2018 FALL Two Images' ),

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
		const { left_url, right_url, left_id, right_id, right_text, left_text, MultiMediaResponsive, hasSubtitle, subtitle, left_fontAwesome, right_fontAwesome} = attributes;
		const onSelectLeftImage = ( media ) => {
			if ( ! media || ! media.url ) {
				setAttributes( { left_url: undefined, left_id: undefined } );
				return;
			}
			setAttributes( { left_url: media.url, left_id: media.id } );
		};
    const onSelectRightImage = ( media ) => {
			if ( ! media || ! media.url ) {
				setAttributes( { right_url: undefined, right_id: undefined } );
				return;
			}
			setAttributes( { right_url: media.url, right_id: media.id } );
		};
    const classes = classnames(
			className
		);
		const toggleMultiMediaResponsive = (MultiMediaResponsive) => {
			setAttributes( { MultiMediaResponsive: MultiMediaResponsive } );
		};

		const togglehasSubtitle = (hasSubtitle) => {
			setAttributes( { hasSubtitle: hasSubtitle } );
		};

		const left_style = backgroundImageStyles( left_url );
    const right_style = backgroundImageStyles( right_url );

		const controls = (
			<Fragment>
				<BlockControls>
					<Toolbar>
						<MediaUpload
							onSelect={ onSelectLeftImage }
							type="image"
							value={ left_id }
							render={ ( { open } ) => (
								<IconButton
									className="components-toolbar__control"
									label={ __( 'Edit left image' ) }
									icon="edit"
									onClick={ open }
								/>
							) }
						/>
            <MediaUpload
              onSelect={ onSelectRightImage }
              type="image"
              value={ right_id }
              render={ ( { open } ) => (
                <IconButton
                  className="components-toolbar__control"
                  label={ __( 'Edit right image' ) }
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
						<ToggleControl
							label={ __( 'has Subtitle' ) }
							checked={ !! hasSubtitle }
							onChange={ togglehasSubtitle }
						/>
					</PanelBody>
					{ MultiMediaResponsive ? <SelectControl
						label="Size"
						value={ 0 }
						options={ [
							{ label: 'Big', value: 0 },
							{ label: 'Medium', value: 1 },
							{ label: 'Small', value: 2 },
						] }
						onChange={ ( size ) => { this.setState( { size } ) } }
					/> : ''
					}
				</InspectorControls>
			</Fragment>
		);
/*<RichText
		tagName="h4"
		placeholder={ __(  'Subtitle…' ) }
		value={ subtitle }
		className= {'subtitle'}
		onChange={ ( text ) => { this.state.subtitle = text }  }
		inlineToolbar
		/>*/
		return (
			<Fragment>
				{ controls }
        <div className = { className }>
		        <div className= 'block-left'  >
              { ! left_url ?  ( <MediaPlaceholder
                  icon= 'edit'
                  className=''
                  labels={ {
                    title: 'Select',
                    name: __( 'an image' ),
                  } }
                  onSelect={ onSelectLeftImage }
                  accept="image/*"
                  type="image"
                  notices={ noticeUI }
                  onError={ noticeOperations.createErrorNotice }
                /> ) :
              (	<FeaturingImage
	                  media_url={ left_url }
	                  media_id={ left_id }
	                  size={0}
	                  onRemove={ () => { } }
	                  onValidate={ (attrs) => { setAttributes(attrs); } }
										onCancel={ () => {  } }
	                  setAttributes={ (attrs) => { setAttributes({left_url:attrs['media_url'],left_id:attrs['media_id']}); } }
	                  headline={ left_text }
	                  hasSubtitle={ null }
	                  subtitle={ null }
	                  button={ null }
	                  hlink={ null }
										rightaligned= { null }
										edit={ true }
	               >
								 <RichText
				 					tagName="h3"
				 					placeholder={ __(  'Enter Headline…' ) }
				 					value={ left_text }
				 					className= {'headline'}
				 					onChange={ ( HeadlineText ) => { setAttributes({left_text:HeadlineText}); }  }
				 					inlineToolbar
				 				/>
							 	</FeaturingImage>)
              }

						</div>
            <div className='block-right'>
										{ ! right_url ?  ( <MediaPlaceholder
												icon= 'edit'
												className=''
												labels={ {
													title: 'Select',
													name: __( 'an image' ),
												} }
												onSelect={ onSelectRightImage }
												accept="image/*"
												type="image"
												notices={ noticeUI }
												onError={ noticeOperations.createErrorNotice }
											/> ) :
					          (	<FeaturingImage
				                  media_url={ right_url }
				                  media_id={ right_id }
				                  size={0}
				                  onRemove={ () => { } }
				                  onValidate={ (attrs) => { setAttributes(attrs); } }
													onCancel={ () => {  } }
				                  setAttributes={ (attrs) => { setAttributes({right_url:attrs['media_url'],right_id:attrs['media_id']}); } }
				                  headline={ right_text }
				                  hasSubtitle={ null }
				                  subtitle={ null }

				                  button={ null }
				                  hlink={ null }
													rightaligned= { null }
													edit={ true }
				                >
												<RichText
			 				 					tagName="h3"
			 				 					placeholder={ __(  'Enter Headline…' ) }
			 				 					value={ right_text }
			 				 					className= {'headline'}
			 				 					onChange={ ( HeadlineText ) => { setAttributes({right_text:HeadlineText}); }  }
			 				 					inlineToolbar
			 				 				/>
									</FeaturingImage> )
									}
              </div>
          </div>
			</Fragment>
		);
	} ),

	save( { attributes, className } ) {
		return null;
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
