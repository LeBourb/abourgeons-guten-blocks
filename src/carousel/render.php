
<?php


function abourgeons_18_fall_carousel_post( $attributes, $content ) {
  //print_r($attributes);
      ?>
			<ul class="wp-block-abourgeons-18-fall-carousel  owl-theme owl-carousel owl-result" >
      <?php
      foreach ($attributes['images'] as $image) {
        // $arr[3] sera mis à jour avec chaque valeur de $arr...

          $image_woo_single = wp_get_attachment_image_src( $image['id'] , 'woocommerce_single');
        ?>
             <div class="blocks-carousel-item">
  							 	<a href="<?php echo esc_url( get_permalink( $image['$post_id'] ) );?>">
                    <div style="background-image: url('<?php echo $image_woo_single[0] ?>');" class="block-img" >
                      <section class="offsetab">
                        <h3 class="headline"><?php echo $image['headline'];?></h3>
                        <div class="button">	<h3 class="center"><?php echo $image['button']; ?></h3> </div>
                    </section>
                  </div>
  								</a>
  						</div>

				<?php
				}
        ?>
			</ul>
      <?php

}


register_block_type( 'abourgeons-18-fall/carousel', array(
  'render_callback' => 'abourgeons_18_fall_carousel_post',
) );
