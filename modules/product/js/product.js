var apps = angular.module('product', ['datatables','ngCkeditor','thatisuday.dropzone','ngBootstrapLightbox']);
	apps.config(function ($interpolateProvider,dropzoneOpsProvider) {
		$interpolateProvider.startSymbol('<%');
		$interpolateProvider.endSymbol('%>');

		dropzoneOpsProvider.setOptions({
			url : '/upload_url',
			maxFilesize : '10'
		});
	
	});

	apps.directive('initModel', function($compile) {
		return {
			restrict: 'A',
			link: function(scope, element, attrs) {
				scope[attrs.initModel] = element[0].value;
				if(attrs.datameta) {
					var a = attrs.datameta;
					scope.post['metadata'][a] = element[0].value;
					if(typeof scope['metadata'] === 'undefined'){
						scope['metadata'] = {};
						scope['metadata'][a] = element[0].value;
						//console.log(scope['metadata'])
					}
					else{
						if(typeof scope['metadata'][a] === 'undefined' || typeof scope['metadata'][a] === null){
							scope['metadata'][a] = element[0].value;
						}
					}	
				}
				else{
					scope.post[attrs.initModel] = element[0].value;
				}
				
				
				element.attr('ng-model', attrs.initModel);
				element.removeAttr('init-model');
				$compile(element)(scope);
				
			}
		};
	});
	
	apps.controller('products', ['$scope', '$http', '$location', '$window' , 'lightbox', function ($scope, $http , $location ,$window , lightbox) {
		
		$scope.post = {
			'title' : '',
			'slug' : '',
			'lang' : 'en',
			'description' : '',
			'metadata': {},
			'id' : false
		};
		
		$scope.dataTest = {1:'home',2:'about'};
		$scope.days = {
			1 : {
				"title" : "Days #1",
				"handle" : "Days #1",
				"value" : "lorem ipsum",
				"id" : "1"
			}
		}
		
		$scope.galleries = {}

		$scope.results = [];
		
		$scope.dzOptions = {
			url : '/admin/product/upload',
			dictDefaultMessage : 'Add files to show dropzone methods (few)',
			addRemoveLinks : true,
			//previewTemplate: $('#preview-template').html()
		};
		
		$scope.dzCallbacks = {
			'addedfile' : function(file){
				$scope.newFile = file;				
			},
			'removedfile' : function(file){
				$scope.gallery();
			},
			'success' : function(file, xhr){
				var postData = (xhr.data['input']);
				if(postData['draft'] != false){
					$scope.post['id'] = postData['draft'];
				}
				$scope.gallery();
			},
			'sending': function (file, xhr, formData) {
			  formData.append('post',JSON.stringify($scope.post));
			} ,
			'complete': function(file) {
				$scope.dzMethods.removeFile(file);
			}
		};
		
		$scope.dzMethods = {};
		$scope.removeNewFile = function(){
			$scope.dzMethods.removeFile($scope.newFile);
			$scope.gallery();
		}
		
		$scope.gallery = function () {
			$http.post("/admin/product/gallery",{params:$scope.post})
				.then(function (response) {
					$scope.galleries = response.data['galleries'];
					
				})
				.catch(function (err) {
				   toastr.error("Something error , check your connection !","Error");
				  
				})
				.finally(function () {
					
				});
		};
		
		$scope.load = function () {
			//console.log($scope.days);
			$http.post("/admin/product/load",{params:$scope.post})
				.then(function (response) {
					$scope.days = response.data['posts'];
				})
				.catch(function (err) {
				   toastr.error("Something error , check your connection !","Error");
				   
				})
				.finally(function () {
					console.log($scope);
				});
		}
		
		$scope.search = function () {
			//console.log($scope.view);
			
			$('body').progress('open');
			$http.post("/admin/product/api_v1",{params:$scope.post})
				.then(function (response) {
					$scope.results = response.data['posts'];
				})
				.catch(function (err) {
				   toastr.error("Something error , check your connection !","Error");
				   $('body').progress('close');
				})
				.finally(function () {
					$('body').progress('close');
				});
				
			
			
		}
		
		angular.element(document).ready(function () {
			if($scope.view == 'form'){
				$http.post("/admin/product/get_post",{id:$scope.id})
				.then(function (response) {
					$scope.post = response.data['posts'];
				})
				.catch(function (err) {
				   toastr.error("Something error , check your connection !","Error");
				   
				})
				.finally(function () {
					$scope.load();
					$scope.gallery();
				});
				
				return;
			}else if($scope.view == 'load'){
				$scope.load();
				return;
				
			} else if($scope.view == 'list'){
				$scope.search();
			}
			
			
		});
		
		$scope.addDays = function(){
			var oldDays = $scope.days;
			var count = Object.keys(oldDays).length;
			//console.log(count);
			var key = 1;
			if(count > 0){
				key = parseInt(count) + 1;
			}
			
			var arr = {
				"panel" : "Days #" + key,
				"text" : "",
				"id" : key
			};
			oldDays[key] = arr;
			//console.log(oldDays);
			$scope.days = oldDays
		}
		
		$scope.removeDay = function(){
			var remove = this.x['id'];
			var oldDays = $scope.days || [];
			for (var key in oldDays) {
				if(key == remove){
					if($('.days_textarea ').length > 1){
						delete oldDays[key]
					}
					
				}
			};
			$scope.days = oldDays
		}
		
		$scope.openData = function(params) {
			var item = this.item;
			$scope.post = {
				'id' : item['id'],
				'title' : item['title'],
				'slug' : item['slug'],
				'lang' : item['lang'],
				'description' : item['description']
			};
		};
		
		$scope.deleteData = function(params) {
			var item = this.item;
			swal({
			  title: "Are you sure?",
			  text: "Once deleted, you will not be able to recover this customer!",
			  icon: "warning",
			  buttons: true,
			  dangerMode: true,
			})
			.then((willDelete) => {
			  if (willDelete) {
				  $http.post("product/remove",{params: item, action: 'remove'})
					.then(function(response) {
						$scope.search();
						if(response.status == '200'){
							/**
							swal("Poof! Customer has been deleted!", {
							  icon: "success",
							});
							**/
							toastr.success("Poof! Customer has been deleted!","Success");
						}
						else{
							swal("Sorry! Customer can't delete!", {
							  icon: "error",
							});
						}
					});
				
			  } 
			});
			
			
		};

		$scope.addDay = function(e) {
			//console.log($(e).data('test'));
			$('<li class=\"active\"><a data-toggle=\"tab\" href=\"#tab1\">Day 2</a></li>').insertBefore($(this).closest('li'));
		};

		$scope.slugify = function(){
			var str = $scope.post['title'];
			str = str.toString().toLowerCase().trim()
				.replace(/&/g, '-and-')         // Replace & with 'and'
				.replace(/[\s\W-]+/g, '-') ;
				
			$scope.post['slug'] = str;
		}

		$scope.editData = function(){
			var item = this.item;
			$scope.post = {
				'id' : item['id'],
				'title' : item['title'],
				'slug' : item['slug'],
				'lang' : item['lang'],
				'description' : item['description']
			};
			//$location.path( "/admin/product/show/" + item['id'] );
			//	console.log($location);
			$window.location.href = "/admin/product/show/" + item['id'] ;
		 };
		
		$scope.submit = function(){
			$scope.post["metadata"] = $scope.metadata;
			console.log($scope);
			if($scope.id){
				$scope.post["id"] = $scope.id;	
			}
			$http.post("/admin/product/store",{params:$scope.post , action:'add' , days: $scope.days})
				.then(function (response) {
					toastr.success(response.data['message'],"Success");
					if(!$scope.id){
						$scope.resetForm();
						
					}
					else{
						if(response.data['id'])
							$window.location.href = "/admin/product";
					}
				})
				.catch(function (err) {
				   toastr.error("Something error , check your connection !","Error");
				   $('body').progress('close');
				})
				.finally(function () {
					$('body').progress('close');
					
				});
		}

		$scope.filter = function () {
			$scope.search();
		}
		
		$scope.resetForm = function(){
		   $scope.post = {};
		};
		
		$scope.options = {
			language: 'en',
			allowedContent: true,
			entities: false
		};
		
		$scope.onReady = function () {
			CKEDITOR.replace('editor1');
		};
		
		$scope.removeImage = function(){
		   var item = this.image;
			swal({
			  title: "Are you sure?",
			  text: "Once deleted, you will not be able to recover this image!",
			  icon: "warning",
			  buttons: true,
			  dangerMode: true,
			})
			.then((willDelete) => {
			  if (willDelete) {
				  $http.post("/admin/product/remove",{params: item, action: 'removeImage'})
					.then(function(response) {
						$scope.gallery();
						if(response.status == '200'){
							toastr.success("Poof! image has been deleted!","Success");
						}
						else{
							swal("Sorry! image can't delete!", {
							  icon: "error",
							});
						}
					});
				
			  } 
			});
		};
		
		$scope.lightboxOptions = {
		  fadeDuration: 0.7,
		  resizeDuration: 0.5,
		  fitImageInViewPort: true,
		  positionFromTop: 50,  
		  showImageNumberLabel: false,
		  alwaysShowNavOnTouchDevices: false,
		  wrapAround: false
		};
		
		$scope.openLightboxModal = function ($index) {
			lightbox.open($scope.galleries,$index);
			// console.log(lightbox)
		};
		
		
	}]);
	
	
	