<?php

function abourgeons_fall18_render_image_featuring( $image , $isMultiMediaResponsive, $funcContent = null) {

  $backgroundImageURL = null;
  $backgroundlowImageURL = null;
  $style = '';
  $className = ( array_key_exists('textAligned',$image) && isset($image['textAligned']) ) ? 'text-aligned-' . $image['textAligned'] : ' text-aligned-center';
  $className .= ( array_key_exists('imageAligned',$image) && isset($image['imageAligned']) ) ? ' image-aligned-' . $image['imageAligned'] : ' image-aligned-center';
  if(!$isMultiMediaResponsive && isset( $image['media_id'] ) && isset( $image['media_id'][0] )) {
      $backgroundImageURL = wp_get_attachment_image_src( $image['media_id'][0] , 'single_product')[0];
      $backgroundlowImageURL = wp_get_attachment_image_src( $image['media_id'][0] , 'woocommerce_single')[0];
      $style .= ' background-image: url(\'' . $backgroundlowImageURL . '\');';
      $className .= ' is-featuring';
  }
  if( array_key_exists('isBackgroundFixed',$image) && $image['isBackgroundFixed'] ) {
    $className .= ' background-image-fixed';
  }
//print_r($image);

if( array_key_exists('widthPrct',$image) && $image['widthPrct'] ) {
  $style .= ' width:' . $image['widthPrct'] . '%;';
}


?>
<div class="abourgeons_fall18abourgeons_fall18_render_imagefeaturing <?php echo $className; ?>">
  <?php
    if(isset($image['hlink']) )
      echo '<a href="' . $image['hlink'] . '">';
  ?>
  <div style=<?php echo $style; ?> class="block-img <?php if(!$isMultiMediaResponsive) echo 'img-lazy-load'?>" data-full-src="<?php echo $backgroundImageURL ?>">
    <?php
      if($isMultiMediaResponsive) {
    ?>
      <div class="imagecontainer" style="">
        <section class="slide-data-container smallenablediv">
        <picture>
          <?php
            if( array_key_exists('media_id', $image) ) {
              $media_id = $image['media_id'];
              if(array_key_exists(0, $media_id) ) {
                echo wp_get_attachment_source_media( $media_id[0], 1442 , apply_filters( 'single_product_small_thumbnail_size', 'single_product' ), 0);
                echo wp_get_attachment_source_media( array_key_exists(1, $media_id) ? $media_id[1] : $media_id[0], 900 , apply_filters( 'single_product_small_thumbnail_size', 'single_product' ), 0);
                echo wp_get_attachment_image( array_key_exists(2, $media_id) ? $media_id[2] : $media_id[0], apply_filters( 'single_product_small_thumbnail_size', 'single_product' ), 0);
              }
            }
          ?>
        </picture>
        </section>
      </div>
    <?php
      }
    ?>
    <div style="<?php if(array_key_exists('backgroundColor', $image)) { ?> background-color:<?php echo $image['backgroundColor'];?>; <?php } ?>" class="has-background-dim">
    </div>
    <div class="textcontainer" style="<?php if(array_key_exists('textColor', $image)) { echo 'color: ' . $image['textColor'] . ';'; } ?>">
      <section class="offsettab">
        <?php
          if(function_exists($funcContent)) {
            $funcContent($image);
          }else {
        ?>
        <?php if( isset($image['headline']) && !empty($image['headline']) )  {
          ?>
          <h3 class="headline"><?php
          wp_print_rich_text_editor($image['headline']);
          ?></h3>
        <?php } ?>
        <?php if(isset($image['button']) && !empty($image['button'])) { ?>
          <div class="button"><?php
            wp_print_rich_text_editor($image['button']);
          ?></div>
        <?php } ?>
        <?php
          }
        ?>
      </section>
    </div>
  </div>
  <?php
  if(isset($image['hlink']) )
    echo '</a>';
  ?>
</div>
<?php

}

function abourgeons_fall18_widthRatioToClass( $ratio ) {
	return ( $ratio === 100 ) ?
		null :
		'has-width-ratio-' . strval( 10 * round( $ratio / 10 ) );
}

function abourgeons_fall18_render_image_classic( $image ) {
  //$image_woo_single = wp_get_attachment_image_src( $image['id'] , 'woocommerce_single');
  $props       = null;
  echo wp_get_attachment_image(  $image['id'], apply_filters( 'single_product_small_thumbnail_size', 'single_product' ), 0, $props );
}

function abourgeons_fall18_render_responsivemultimedias( $attributes ) {
  $className = array_key_exists('textAligned',$attributes) && $attributes['textAligned'] ? 'textAligned' : '';
  ?>
  <div class="abourgeons_fall18abourgeons_fall18_render_responsivemultimedias <?php echo $className; ?>" style="">
    <?php
      if(isset($attributes['hlink']) )
        echo '<a href="' . $attributes['hlink'] . '">';
    ?>
    <div class="imagecontainer" style="">
      <section class="slide-data-container smallenablediv">
      <picture>
        <?php
          if( array_key_exists('media_id', $attributes) ) {
            $media_id = $attributes['media_id'];
            if(array_key_exists(0, $media_id) ) {
              echo wp_get_attachment_source_media( $media_id[0], 1442 , apply_filters( 'single_product_small_thumbnail_size', 'single_product' ), 0);
              echo wp_get_attachment_source_media( array_key_exists(1, $media_id) ? $media_id[1] : $media_id[0], 900 , apply_filters( 'single_product_small_thumbnail_size', 'single_product' ), 0);
              echo wp_get_attachment_image( array_key_exists(2, $media_id) ? $media_id[2] : $media_id[0], apply_filters( 'single_product_small_thumbnail_size', 'single_product' ), 0);
            }
          }
        ?>
      </picture>
    </section>
  </div>
  <div class="textcontainer">
    <section class="offsettab" >
        <h3  class="headline"><?php
          if(isset($attributes['headline'])) {
            wp_print_rich_text_editor($attributes['headline']);
          } ?></h3>
          <?php if(isset($attributes['hasSubtitle']) && $attributes['hasSubtitle'] ) {
            ?>
          <h4  class="subtitle"><?php
            if(isset($attributes['subtitle']) ) {
              wp_print_rich_text_editor($attributes['subtitle']);
            } ?></h4>
          <?php }
          ?>
        <div class="button">
          <?php
          if(isset($attributes['button']) ) {
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
  if(is_array($richtext)) {
    foreach($richtext as $text) {
      if(is_array($text) )
        wp_print_rich_text_markup($text);
      else
        echo $text;
    }
  }
  else
    echo $richtext;

}

function wp_print_rich_text_markup($richtext) {
  if(isset($richtext['type'])) {
    echo '<' . $richtext['type'] . '>';
    wp_print_rich_text_editor($richtext['props']['children']);
    echo '</' . $richtext['type'] . '>';
  }
}


function wc_product_display_tile($product) {
?>
<a href="<?php echo get_permalink($product->get_id()); ?>">
<div class="abourgeons_fall18_woo_product_cover_block full-overlay">
  <div class="imagecontainer" style="">
      <?php
      echo wp_get_attachment_image(get_post_thumbnail_id($product->get_id()), array('700', '1200'));
            //echo wp_get_attachment_image( get_post_thumbnail_id($product->get_id()), array( 'woocommerce_thumbnail', 'single_product' ), 0);
    ?>
  </div>
  <div style="" class="textcontainer" >
    <?php wc_product_display_info($product); ?>
  </div>
</div>
</a>
<?php
}

function wc_product_display_info($product) {
?>
  <div class="product-over-details" data-id="1">
    <h4 class="title"><?php echo $product->get_title(); ?></h4>
    <p class="price"><?php echo $product->get_price_html();?></p>
    <?php
      if(!is_a($product, 'WC_Product_Variation') && !is_a($product, 'WC_Product_Simple') && !empty($product->get_available_variations( ))) {
          $variations = $product->get_available_variations( );
          ?>
          <ul class="product-variation">
          <?php
          foreach($variations as $variation) {
              if ($variation['variation_is_active'] && $variation['variation_is_visible']) {
                  //$variation->is_in_stock
                  if(sizeof($variation['attributes']) == 1) {
                      $attrs = $variation['attributes'];
                      reset($attrs);
                      $first_key = key($attrs);
                      if(!$variation['is_in_stock']) {
                          echo '<li class="item"><del>' . $attrs[$first_key] . '</del></li>';
                      }else {
                          echo '<li class="item">' . $attrs[$first_key] . '</li>';
                      }

                  }
              }
          }
          ?>
          </ul>
          <?php
      }
    ?>
  </div>
<?php
}
