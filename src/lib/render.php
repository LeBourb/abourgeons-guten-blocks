<?php

function abourgeons_fall18_render_image_featuring( $image ) {
  if(isset($image['hlink']) )
      echo '<a href="' . $image['hlink'] . '">';
  $image_woo_single = null;
  if(isset( $image['media_id'] ) && isset( $image['media_id'][0] )) {
      $image_woo_single = wp_get_attachment_image_src( $image['media_id'][0] , 'woocommerce_single');
  }
  else
    return;
?>
<div class="abourgeons_fall18abourgeons_fall18_render_imagefeaturing">
  <div style="background-image: url('<?php echo $image_woo_single[0] ?>');" class="block-img textcontainer" >
    <section class="offsettab">
      <?php if( isset($image['headline']) && !empty($image['headline']) )  {
        ?>
        <h3 class="headline"><?php
        wp_print_rich_text_editor($attributes['headline']);
        ?></h3>
      <?php } ?>
      <?php if(isset($image['button']) && !empty($image['button']) && is_array($image['button'])) { ?>
        <div class="button"><?php
          wp_print_rich_text_editor($attributes['button']);
        ?></div>
      <?php } ?>
    </section>
  </div>
</div>
<?php
  if(isset($image['hlink']) )
    echo '</a>';
}

function abourgeons_fall18_render_image_classic( $image ) {
  //$image_woo_single = wp_get_attachment_image_src( $image['id'] , 'woocommerce_single');
  $props       = null;
  echo wp_get_attachment_image(  $image['id'], apply_filters( 'single_product_small_thumbnail_size', 'single_product' ), 0, $props );
}

function abourgeons_fall18_render_responsivemultimedias( $attributes ) {
  ?>
  <div class="abourgeons_fall18abourgeons_fall18_render_responsivemultimedias" style="">
    <?php
      if(isset($attributes['hlink']) )
        echo '<a href="' . $attributes['hlink'] . '">';
    ?>
    <div class="imagecontainer" style="">
      <section class="slide-data-container smallenablediv">
      <picture>
        <?php
          $media_id = $attributes['media_id'];
          if(array_key_exists(0, $media_id) ) {
            echo wp_get_attachment_source_media( $media_id[0], 1442 , apply_filters( 'single_product_small_thumbnail_size', 'single_product' ), 0);
            echo wp_get_attachment_source_media( array_key_exists(1, $media_id) ? $media_id[1] : $media_id[0], 900 , apply_filters( 'single_product_small_thumbnail_size', 'single_product' ), 0);
            echo wp_get_attachment_image( array_key_exists(2, $media_id) ? $media_id[2] : $media_id[0], apply_filters( 'single_product_small_thumbnail_size', 'single_product' ), 0);
          }
        ?>
      </picture>
    </section>
  </div>
  <div class="textcontainer">
    <section class="offsettab" >
        <h3  class="headline"><?php
          if(isset($attributes['headline']) && is_array($attributes['headline']) ) {
            wp_print_rich_text_editor($attributes['headline']);
          } ?></h3>
        <div class="button">
          <?php
          if(isset($attributes['button']) && is_array($attributes['button']) ) {
            wp_print_rich_text_editor($attributes['button']);
          }
          ?>
        </div>
    </section>
  </div>
  <?php
    if(isset($attributes['hlink']) )
      echo '</a>';
  ?>
</div>
  <?php
}


function wp_get_attachment_source_media($attachment_id, $media_min_width , $size = 'thumbnail', $icon = false, $attr = '') {
    $html = '';
    $image = wp_get_attachment_image_src($attachment_id, $size, $icon);
    if ( $image ) {
        list($src, $width, $height) = $image;
        $hwstring = image_hwstring($width, $height);
        $size_class = $size;
        if ( is_array( $size_class ) ) {
            $size_class = join( 'x', $size_class );
        }
        $attachment = get_post($attachment_id);
        $default_attr = array(
            'src'   => $src,
            'class' => "attachment-$size_class size-$size_class",
            'alt'   => trim( strip_tags( get_post_meta( $attachment_id, '_wp_attachment_image_alt', true ) ) ),
            'media' => '(min-width: '. $media_min_width .'px)'
        );

        $attr = wp_parse_args( $attr, $default_attr );

        // Generate 'srcset' and 'sizes' if not already present.

        //if ( empty( $attr['srcset'] ) ) {
            $image_meta = wp_get_attachment_metadata( $attachment_id );

            if ( is_array( $image_meta ) ) {
                $size_array = array( absint( $width ), absint( $height ) );
                $srcset = wp_calculate_image_srcset( $size_array, $src, $image_meta, $attachment_id );

                $sizes = wp_calculate_image_sizes( $size_array, $src, $image_meta, $attachment_id );

                if ( $srcset && ( $sizes || ! empty( $attr['sizes'] ) ) ) {
                    $attr['srcset'] = $srcset;

                    if ( empty( $attr['sizes'] ) ) {
                        $attr['sizes'] = $sizes;
                    }
                }
            }
        //}
        //echo '**********************';
        //print_r($attr);
        //echo '**********************';

        /**
         * Filters the list of attachment image attributes.
         *
         * @since 2.8.0
         *
         * @param array        $attr       Attributes for the image markup.
         * @param WP_Post      $attachment Image attachment post.
         * @param string|array $size       Requested size. Image size or array of width and height values
         *                                 (in that order). Default 'thumbnail'.
         */
        $attr = apply_filters( 'wp_get_attachment_image_attributes', $attr, $attachment, $size );
        $attr = array_map( 'esc_attr', $attr );
        $html = rtrim("<source $hwstring");
        foreach ( $attr as $name => $value ) {
            $html .= " $name=" . '"' . $value . '"';
        }
        $html .= ' />';
    }

    return $html;
}


function wp_print_rich_text_editor($richtext) {
  foreach($richtext as $text) {
    if(is_array($text) )
      wp_print_rich_text_markup($text);
    else
      echo $text;
  }
}

function wp_print_rich_text_markup($richtext) {
  if(isset($richtext['type'])) {
    echo '<' . $richtext['type'] . '>';
    wp_print_rich_text_editor($richtext['props']['children']);
    echo '</' . $richtext['type'] . '>';
  }
}

/*RichTextContainer.Content = ( { value, format, tagName: Tag, ...props } ) => {
	let content;
	switch ( format ) {
		case 'string':
			content = <RawHTML>{ value }</RawHTML>;
			break;

		case 'children':
			content = <RawHTML>{ children.toHTML( value ) }</RawHTML>;
			break;
	}

	if ( Tag ) {
		return <Tag { ...props }>{ content }</Tag>;
	}

	return content;
};

RichTextContainer.Content.defaultProps = {
	format: 'children',
};
*/
