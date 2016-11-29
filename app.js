/*
author: quydx
last modify: 29/11/2016
*/

"use strict";
var dir = 'slidephotos'; // folder get images

function getAllImages (dir) { // jQuery function get all images from directory
	var listFiles = [];
	$.ajax({
		url: dir,
		type: 'post',
		data: {},
		success: function (data) {
			var extension = ['.png' , '.jpg' , '.gif' ];
			for (var i = 0 ; i < extension.length ; i ++){
				$(data).find('a:contains('+extension[i]+')').each(function () {
					var imagesExt = $(this).attr("href");
					var images = { 
						src : dir + '/' + imagesExt , 
						desc : 'images'
					}
					listFiles.push(images);
				});
			}
		}
	});
	return listFiles; // list of Images Object 
}



angular.module('photogallery',['ngAnimate','ngTouch']).controller('mainCtrl' , function($scope , $http){
	// $scope.photos = getSrc(dir); // 
	$http({
		method:'GET',
		url:'getAllImages.php' // getAllImages is file get all images by PHP 
	}).then(function successCallback (response) {
		$scope.photos = response.data; 
	});
	//default index = 0
	$scope._Index = 0 ;
	// check active
	$scope.isActive = function(index){
		return $scope._Index == index ;
	};
	// show prev images
	$scope.showPrev = function(index){
		$scope._Index = ($scope._Index > 0 ) ? --$scope._Index : $scope.photos.length -1 ;
	};
	//show next images
	$scope.showNext = function(index){
		$scope._Index = ($scope._Index < $scope.photos.length -1) ? ++$scope._Index : 0;
	};
	//show photo clicked by users
	$scope.showPhoto = function(index) {
		$scope._Index = index ;
	}
});
