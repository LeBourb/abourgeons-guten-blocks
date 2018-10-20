
import { FeaturingImage } from './../lib/image-featuring';
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
			size: 0
		};

	}

render()  {
  const { attributes, setAttributes, isSelected, className, noticeOperations, noticeUI } = this.props;
  const { media_url, text, media_id, hlink, headline, button, MultiMediaResponsive, hasSubtitle, subtitle, rightaligned } = attributes;


  //const style = backgroundImageStyles( url );
  const classes = classnames(
    className
  );

  const toggleMultiMediaResponsive = (MultiMediaResponsive) => {
    setAttributes( { MultiMediaResponsive: MultiMediaResponsive } );
  };

  const togglehasSubtitle = (hasSubtitle) => {
    setAttributes( { hasSubtitle: hasSubtitle } );
  };

  const controls = (
    <Fragment>
      <BlockControls>
        <Toolbar>
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
          value={ this.state.size }
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

  return (
    <Fragment>
        { controls }
        <div className = { classes }>
            { MultiMediaResponsive ? <ClassicImage
                media_url={ media_url }
                media_id={ media_id }
                size={this.state.size}
                onRemove={ () => { } }
                onValidate={ () => { } }
                setAttributes={ (attrs) => { setAttributes(attrs); } }
                headline={ headline }
                hasSubtitle={ hasSubtitle }
                subtitle={ subtitle }
                button={ button }
                hlink={ hlink }
								rightaligned= { rightaligned }
              /> : <FeaturingImage
                  media_url={ media_url }
                  media_id={ media_id }
                  size={this.state.size}
                  onRemove={ () => { } }
                  onValidate={ () => { } }
                  setAttributes={ (attrs) => { setAttributes(attrs); } }
                  headline={ headline }
                  hasSubtitle={ hasSubtitle }
                  subtitle={ subtitle }
                  button={ button }
                  hlink={ hlink }
									rightaligned= { rightaligned }
                />
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
