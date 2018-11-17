
<?php

require_once __DIR__ . '/../lib/render.php';

function abourgeons_18_fall_carousel_post( $attributes, $content ) {
    ob_start();
    if(!isset($attributes['images']))
      return;
    $className = '';
    $MultiMediaResponsive = false;
    if(isset($attributes['MobileNoCarousel']) && $attributes['MobileNoCarousel'])
      $className='NoMobile';
    if(isset($attributes['Autoplay']) && $attributes['Autoplay'])
        $className .=' autoplay';
    if(array_key_exists('MultiMediaResponsive', $attributes) && $attributes['MultiMediaResponsive'])
      $MultiMediaResponsive = true;
      ?>
			<ul class="wp-block-abourgeons-18-fall-carousel  owl-theme owl-carousel owl-result <?php echo $className;?>">

      <?php
      foreach ($attributes['images'] as $image) {
        // $arr[3] sera mis à jour avec chaque valeur de $arr...
        ?>
             <div class="blocks-carousel-item">
                <?php
                //print_r($attributes);
                  abourgeons_fall18_render_image_featuring( $image , $MultiMediaResponsive );
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
