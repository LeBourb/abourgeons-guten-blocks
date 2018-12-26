<?php
require_once  __DIR__ . '/../lib/render.php';

register_block_type( 'abourgeons-guten/product-cover-block', array(
  'render_callback' => 'abourgeons_fall18_woo_product_cover_block'
) );


function abourgeons_fall18_woo_product_cover_block_display_content($attributes) {
  ?>
  <ul class="products_list">
  <?php
  if(isset($attributes['productIds']) ) {
    $productIds = $attributes['productIds'];
    foreach ( $productIds as $productId ) {
      $product = wc_get_product($productId);
    ?>
      <li>
        <button data-href="<?php echo get_permalink($product->get_id());?>">
          <h3>
      <?php
        echo $product->get_title() . ' - ' .  wc_price($product->get_price());
      ?>
          <div class="product-over-details" data-id="1">
            <?php wc_product_display_info($product);
            ?>
          </div>
          </h3>
        </button>
      </li>
    <?php
    }
  }
  ?>
  </ul>
  <?php
}


function abourgeons_fall18_woo_product_cover_block(  $attributes, $content ) {
  ob_start();
  ?>
  <div class="wp-block-abourgeons-guten-product-cover-block">
  <?php
    $MultiMediaResponsive = true;
    if(isset( $attributes['MultiMediaResponsive']) &&   $attributes['MultiMediaResponsive'])
      $MultiMediaResponsive =  $attributes['MultiMediaResponsive'];
    abourgeons_fall18_render_image_featuring( $attributes , $MultiMediaResponsive , 'abourgeons_fall18_woo_product_cover_block_display_content');
  ?>
  </div>

  <?php
  return ob_get_clean();
}
