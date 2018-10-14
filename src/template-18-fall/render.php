<?php

function abourgeons_18_fall_block_01( $attributes, $content ) {
  ob_start();
  $image = null;
  if(isset($attributes['id']))
    $image = wp_get_attachment_image_src( $attributes['id'] , 'woocommerce_single');
?>
  <div class="wp-block-abourgeons-guten-t18fall-block01 <?php echo ( ( isset($attributes['hasImgonRight']) && $attributes['hasImgonRight'] ) ? "has-img-on-right" : "" ) ?>" >
    <div class= "block-text col-xs-12 col-sm-12 col-md-3 col-lg-3" >
      <div class='block-inside'>
        <h3 class="title">
            <?php
            if(isset($attributes['title'])) {
              foreach($attributes['title'] as $title) {
                  echo $title;
              }
            }
            ?>

        </h3>
      <hr/>
        <p class="content-text">
            <?php
            if(isset($attributes['text'])) {
              foreach($attributes['text'] as $text) {
                  echo $text;
              }
            }
            ?>
        </p>
      </div>
    </div>
    <div
        style="<?php if($image[0]) echo 'background-image: url(' .  $image[0] .  ')'; ?>"
        class="block-img col-xs-12 col-sm-12 col-md-9 col-lg-9"
      >
    </div>
  </div>
<?php
  return ob_get_clean();
}

register_block_type( 'abourgeons-guten/t18fall-block01', array(
  'render_callback' => 'abourgeons_18_fall_block_01'
) );
