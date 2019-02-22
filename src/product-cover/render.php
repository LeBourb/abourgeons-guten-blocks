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
      global $abourgeons_uniqueId;
    ?>
          <div class="product-over-details" data-id="1" id="<?php echo $abourgeons_uniqueId . '_' . $productId; ?>">
            <?php wc_product_display_info($product);
            ?>
          </div>
    <?php
    }
  }
  ?>
  </ul>
  <?php
}


function abourgeons_fall18_woo_product_cover_block(  $attributes, $content ) {
  ob_start();
  global $abourgeons_uniqueId;
  $abourgeons_uniqueId = uniqid ();
  ?>
  <div class="wp-block-abourgeons-guten-product-cover-block">

  <?php
    $MultiMediaResponsive = true;
    if(isset( $attributes['MultiMediaResponsive']) &&   $attributes['MultiMediaResponsive'])
      $MultiMediaResponsive =  $attributes['MultiMediaResponsive'];
    if( (!isset( $attributes['hlink']) || !$attributes['hlink']) && ( isset($attributes['productIds'][0]) && is_array($attributes['productIds']) ) ) {
      $productIds = $attributes['productIds'];
      $attributes['hlink'] = get_permalink($productIds[0]);
    }

    abourgeons_fall18_render_image_featuring( $attributes , $MultiMediaResponsive , 'abourgeons_fall18_woo_product_cover_block_display_content');
  ?>

  <div class="products_list_footer">
  <?php
  if(isset($attributes['productIds']) ) {
    $productIds = $attributes['productIds'];
    foreach ( $productIds as $productId ) {
      $product = wc_get_product($productId);
    ?>
      <button class="product_button_footer" data-href="<?php echo get_permalink($product->get_id());?>" data-id="<?php echo $abourgeons_uniqueId . '_' . $productId; ?>">
        <strong>
        <?php
          echo $product->get_title() . ' - ' .  wc_price($product->get_price());
        ?>
      </strong>
      </button>
    <?php
    }
  }
  ?>
</div>
</div>
  <?php
  return ob_get_clean();
}
