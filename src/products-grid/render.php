<?php
require_once  __DIR__ . '/../lib/render.php';
function abourgeons_18_fall_products_grid( $attributes, $content ) {
  ob_start();
  $image = null;
  if(isset($attributes['id']))
    $image = wp_get_attachment_image_src( $attributes['id'] , 'woocommerce_single');
?>
  <div class="abourgeons-guten-products-grid" >
    <?php
    foreach ($attributes['productIds'] as $productId) {
      if($productId) {
      	?>
        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
          <?php
            $product = wc_get_product($productId);
            wc_product_display_tile($product);
          ?>
        </div>
        <?php
        }
    }
    ?>
  </div>
<?php
  return ob_get_clean();
}

register_block_type( 'abourgeons-guten/products-grid', array(
  'render_callback' => 'abourgeons_18_fall_products_grid'
) );
