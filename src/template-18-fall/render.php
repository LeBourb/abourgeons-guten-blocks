<?php
require_once  __DIR__ . '/../lib/render.php';
function abourgeons_18_fall_block_01( $attributes, $content ) {
  ob_start();

?>
  <div class="wp-block-abourgeons-guten-t18fall-block01 <?php echo ( ( isset($attributes['hasImgonRight']) && $attributes['hasImgonRight'] ) ? "has-img-on-right" : "" ) ?>" >
    <div class= "block-text col-xs-12 col-sm-12 col-md-3 col-lg-3" >
      <div class='block-inside'>
        <h3 class="title">
            <?php
            if(isset($attributes['title'])) {
              wp_print_rich_text_editor($attributes['title']);
            }
            ?>

        </h3>
      <hr/>
        <p class="content-text">
            <?php
            if(isset($attributes['text'])) {
              wp_print_rich_text_editor(($attributes['text']));
            }
            ?>
        </p>
      </div>
    </div>
    <div
        class="block-img col-xs-12 col-sm-12 col-md-9 col-lg-9"
      >
      <picture>
        <?php
              echo wp_get_attachment_source_media( $attributes['id'], 1442 , apply_filters( 'single_product_small_thumbnail_size', 'single_product' ), 0);
              echo wp_get_attachment_source_media(  $attributes['id'], 900 , apply_filters( 'single_product_small_thumbnail_size', 'single_product' ), 0);
              echo wp_get_attachment_image(  $attributes['id'], apply_filters( 'single_product_small_thumbnail_size', 'single_product' ), 0);

        ?>
      </picture>
    </div>
  </div>
<?php
  return ob_get_clean();
}

register_block_type( 'abourgeons-guten/t18fall-block01', array(
  'render_callback' => 'abourgeons_18_fall_block_01'
) );
