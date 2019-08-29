<?php

if ( ! function_exists( 'register_block_type' ) or is_admin() ) {
  return;
}

register_block_type(
  'abourgeons-guten/post',
  [ 'render_callback' => 'abourgeons_guten_posts' ]
);


function abourgeons_guten_posts( $attributes ) {

	if( ! isset( $attributes['postID'] ) ) {
		return;
	}

	// Default values
	$postID = $attributes['postID'];
	$postType 		= array_key_exists( 'postType', $attributes ) 		? $attributes['postType'] 		: 'posts';
	$showImage 		= array_key_exists( 'showImage', $attributes ) 		? $attributes['showImage'] 		: true;
	$showAuthor 	= array_key_exists( 'showAuthor', $attributes ) 	? $attributes['showAuthor'] 	: true;
	$showCategory = array_key_exists( 'showCategory', $attributes ) ? $attributes['showCategory'] : true;

	// Start cached output
	$output = "";
	ob_start();

	if( $postType == "posts" ) {
		$args = array( 'p' => $postID );
	}
	elseif( $postType == 'pages' ) {
		$args = array( 'page_id' => $postID );
	}
	else {
		$args = array( 'post_type' => $postType, 'p' => $postID  );
	}

	$query = new \WP_Query( $args );

	if( $query->have_posts() ): while( $query->have_posts() ): $query->the_post();

		$image = false;
		$author = false;
		$category = false;

		if( $showImage !== false ) {
			$image = wp_get_attachment_image_src( get_post_thumbnail_id(), 'medium' );
			$image = $image[0];
		}
    $post = get_post($postID);
		if( $showAuthor !== false ) {
			$author = get_the_author_meta( 'display_name', $post->author );
		}

		if( $showCategory !== false ) {
			$categories = get_the_category();

			if ( ! empty( $categories ) ) {
    		$category = $categories[0]->name;
			}
		}

		// Get template
    include apply_filters( 'advanced_gutenberg_blocks_template', 'post.php', 'post' );

		endwhile;
		wp_reset_postdata();
	endif;

	// End cached output
	$output = ob_get_contents();
	ob_end_clean();

	return $output;
}
