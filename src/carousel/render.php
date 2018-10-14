
<?php

require_once __DIR__ . '/../lib/render.php';

function abourgeons_18_fall_carousel_post( $attributes, $content ) {
    ob_start();
    if(!isset($attributes['images']))
      return;
      ?>
			<ul class="wp-block-abourgeons-18-fall-carousel  owl-theme owl-carousel owl-result">

      <?php
      foreach ($attributes['images'] as $image) {
        // $arr[3] sera mis à jour avec chaque valeur de $arr...
        ?>
             <div class="blocks-carousel-item">
                <?php
                //print_r($attributes);
                  if(array_key_exists('MultiMediaResponsive', $attributes) && $attributes['MultiMediaResponsive']) {
                    abourgeons_fall18_render_responsivemultimedias( $image );
                  }else {
                    abourgeons_fall18_render_image_featuring( $image );
                  }
                ?>
  						</div>
				<?php
				}
        ?>
			</ul>
      <?php
      return ob_get_clean();
}


register_block_type( 'abourgeons-18-fall/carousel', array(
  'render_callback' => 'abourgeons_18_fall_carousel_post',
) );
