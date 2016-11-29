<?php

$path = 'slidephotos';

$files = scandir($path);

$files = array_diff($files, array('.' , '..'));

$allImages = array();
/**
* 
*/
class image 
{

	public $src ;
	public $desc ;

}
foreach ($files as $key=>$value) {
	$i = 0 ;
	$image = new image ; 
	$image->src = "$path/$value" ; 
	$image->desc = "Images".$i ;
	$allImages[] = $image;
}

echo json_encode($allImages);
// var_dump($allImages);
?>
