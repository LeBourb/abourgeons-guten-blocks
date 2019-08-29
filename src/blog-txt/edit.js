
import { FeaturingImage, FeaturingImageToolbar, FeaturingImagePanel } from './../lib/image-featuring';
import { ClassicImage } from './../lib/image-classic';
import * as classnames from 'classnames';


const { IconButton, PanelBody, RangeControl, ToggleControl, Toolbar, withNotices,SelectControl, FontSizePicker  } = wp.components;
const { Fragment , Component } = wp.element;
//import { __ } from '@wordpress/i18n';
const { __ } = wp.i18n;
const { createBlock } = wp.blocks;
const {
	BlockControls,
	InspectorControls,
	MediaPlaceholder,
	MediaUpload,
	RichText,
	InnerBlocks
} = wp.editor;

const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks

const { Button } = wp.components;

class imagecoverEdit extends Component {
  constructor() {
		super( ...arguments );

		this.state = {
			size: 0,
			edit: null
		};

	}

render()  {
  const { attributes, setAttributes, isSelected, className, noticeOperations, noticeUI } = this.props;
  const { media_url, text, media_id, hlink, headline, button, MultiMediaResponsive, hasSubtitle, hasButton, subtitle, textAligned, backgroundColor, textColor, dimRatio, fontSize, isBackgroundFixed } = attributes;
  //const style = backgroundImageStyles( url );
  const classes = classnames.default(
    className
  );

  const toggleMultiMediaResponsive = (MultiMediaResponsive) => {
    setAttributes( { MultiMediaResponsive: MultiMediaResponsive } );
  };

  const togglehasSubtitle = (hasSubtitle) => {
    setAttributes( { hasSubtitle: hasSubtitle } );
  };

	const fontSizes = [
		{
			name: __( 'Small' ),
			slug: 'small',
			size: 12,
		},
		{
			name: __( 'Big' ),
			slug: 'big',
			size: 26,
		},
	];
	const fallbackFontSize = 16;

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
						isBackgroundFixed={isBackgroundFixed}
						hasSubtitle={hasSubtitle}
						hasButton={hasButton}
						size={this.state.size}
						setState={this.setState}
						backgroundColor= {backgroundColor}
						textColor={textColor}
						dimRatio={dimRatio}
					/>
					<FontSizePicker
							fontSizes={ fontSizes }
							value={ fontSize }
							fallbackFontSize={ fallbackFontSize }
							onChange={ ( newFontSize ) => {
								setAttributes( { fontSize: newFontSize } );
							} }
					/>
      </InspectorControls>
    </Fragment>
  );

  return (
    <Fragment>
        { controls }
        <div className = { classes }>
        	<div className = {"featuring-image-container"} />
					<InnerBlocks templateLock={ false } allowedBlocks={ [ 'core/paragraph', 'abourgeons-guten/image-cover'  ] }  className={"paragraph-inner-blocks"}/>
        </div>
    </Fragment>
  );
}

}


export default withNotices( imagecoverEdit );
