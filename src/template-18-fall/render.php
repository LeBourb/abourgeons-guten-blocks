<?php

function abourgeons_18_fall_block_01( $attributes, $content ) {
  print_r($attributes);
?>
  <div class="wp-block-abourgeons-guten-t18fall-block01 <?php echo ( hasImgonRight ? "has-img-on-right" : "" ) ?>" >
    <div class= "block-text col-xs-12 col-sm-12 col-md-3 col-lg-3" >
      <div class='block-inside'>
        <h3 class="title">
            <?php echo $attributes['title']; ?>
        </h3>
      <hr/>
        <p class="content-text">
            <?php echo $attributes['text']; ?>
        </p>
      </div>
    </div>
    <div
        style="background-image: url(<?php echo $attributes['url']; ?>);"
        class="block-img img-lazy-load-rest col-xs-12 col-sm-12 col-md-9 col-lg-9"
      />
  </div>
<?php
}

register_block_type( 'abourgeons-guten/t18fall-block01', array(
  'render_callback' => 'abourgeons_18_fall_block_01',
  'attributes'	  => array(
				'id'	 => array(
					'type' => 'string',
				),
				'url' => array(
					'type' => 'string',
				),
				'hasImgonRight'	=> array(
					'type'	=> 'boolean',
					'default' => true
				),
				'title'	 => array(
					'type'	=> 'array',
				),
        'text'	 => array(
					'type'	=> 'array',
				),
			),
) );
