
import { FeaturingImage, FeaturingImageToolbar , FeaturingImagePanel } from './../lib/image-featuring';
import { ClassicImage } from './../lib/image-classic';
import * as classnames from 'classnames';



const { IconButton, PanelBody, RangeControl, ToggleControl, Toolbar, withNotices,SelectControl } = wp.components;
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
  const { media_url, text, media_id, hlink, headline, button, MultiMediaResponsive, isBackgroundFixed, hasSubtitle, subtitle, textAligned, backgroundColor, textColor, dimRatio  } = attributes;


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
						hasSubtitle={hasSubtitle}
						size={this.state.size}
						setState={this.setState}
						backgroundColor= {backgroundColor}
						textColor={textColor}
						dimRatio={dimRatio}
						isBackgroundFixed = {isBackgroundFixed}
					/>
      </InspectorControls>
    </Fragment>
  );

	const icon =  (
		<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" width="15px" height="15px" viewBox="0 0 169.063 169.063" className="instagram_icon" xmlSpace="preserve">
			<g>
				<path d="M122.406,0H46.654C20.929,0,0,20.93,0,46.655v75.752c0,25.726,20.929,46.655,46.654,46.655h75.752   c25.727,0,46.656-20.93,46.656-46.655V46.655C169.063,20.93,148.133,0,122.406,0z M154.063,122.407   c0,17.455-14.201,31.655-31.656,31.655H46.654C29.2,154.063,15,139.862,15,122.407V46.655C15,29.201,29.2,15,46.654,15h75.752   c17.455,0,31.656,14.201,31.656,31.655V122.407z"/>
				<path d="M84.531,40.97c-24.021,0-43.563,19.542-43.563,43.563c0,24.02,19.542,43.561,43.563,43.561s43.563-19.541,43.563-43.561   C128.094,60.512,108.552,40.97,84.531,40.97z M84.531,113.093c-15.749,0-28.563-12.812-28.563-28.561   c0-15.75,12.813-28.563,28.563-28.563s28.563,12.813,28.563,28.563C113.094,100.281,100.28,113.093,84.531,113.093z"/>
				<path d="M129.921,28.251c-2.89,0-5.729,1.17-7.77,3.22c-2.051,2.04-3.23,4.88-3.23,7.78c0,2.891,1.18,5.73,3.23,7.78   c2.04,2.04,4.88,3.22,7.77,3.22c2.9,0,5.73-1.18,7.78-3.22c2.05-2.05,3.22-4.89,3.22-7.78c0-2.9-1.17-5.74-3.22-7.78   C135.661,29.421,132.821,28.251,129.921,28.251z"/>
			</g>
		</svg> );

  return (
    <Fragment>
        { controls }
        <div className = { classes }>
            { <FeaturingImage
								media_url={ media_url }
								media_id={ media_id }
								size={this.state.size}
								onRemove={ () => { } }
								onValidate={ (attrs) => { this.state.edit = null; setAttributes(attrs); } }
								onCancel={ () => { this.setState({edit:null}); } }
								setAttributes={ (attrs) => { setAttributes(attrs); } }
								hasSubtitle={ hasSubtitle }
								subtitle={ subtitle }
								button={ button }
								hlink={ hlink }
								textAligned= { textAligned }
								edit={ this.state.edit ? null : () => { this.setState({edit:true}); } }
			          MultiMediaResponsive={ MultiMediaResponsive }
								isBackgroundFixed = {isBackgroundFixed}
								backgroundColor= {backgroundColor}
								textColor={textColor}
								dimRatio = {dimRatio}
								>
								<RichText
								tagName="h3"
								placeholder={ __(  'Enter Headline…' ) }
								value={ headline }
								className= {'headline'}
								onChange={ ( HeadlineText ) => { setAttributes({headline:HeadlineText}); }  }
								inlineToolbar
								/>
							{ icon }
								</FeaturingImage>
            }
        </div>
    </Fragment>
  );
}

}

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

export default withNotices( imagecoverEdit );
