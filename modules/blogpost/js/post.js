var apps = angular.module('blogpost', ['datatables','ngCkeditor']);
	apps.config(function ($interpolateProvider) {
		$interpolateProvider.startSymbol('<%');
		$interpolateProvider.endSymbol('%>');

	});

	
	apps.directive('initModel', function($compile) {
		return {
			restrict: 'A',
			link: function(scope, element, attrs) {
				scope[attrs.initModel] = element[0].value;
				if(attrs.datameta) {
					var a = attrs.datameta;
					scope.post['metadata'][a] = element[0].value;
					if(typeof scope['metadata'][a] === 'undefined' || typeof scope['metadata'][a] === null){
						scope['metadata'][a] = element[0].value;
					}
					else{
						scope['metadata'] = {};
						scope['metadata'][a] = element[0].value;
					}
					
				}
				else{
					scope.post[attrs.initModel] = element[0].value;
				}
				
				
				element.attr('ng-model', attrs.initModel);
				element.removeAttr('init-model');
				$compile(element)(scope);
				//console.log(scope);
			}
		};
	});
	
	
	apps.controller('posts', ['$scope', '$http', '$location', '$window', function ($scope, $http , $location ,$window) {
		//$scope.metadata = {};
		$scope.post = {
			'title' : '',
			'slug' : '',
			'lang' : 'en',
			'description' : '',
			'metadata': {},
			'categories': '',
			'id' : false
		};

		$scope.lang = '';
		$scope.results = [];
		$scope.search = function () {
			if($scope.view != 'list'){
				return ;
			}
			
			$('body').progress('open');
			$http.post("/admin/articles/api_v1",{params:$scope.post})
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
		
		$scope.filter = function () {
			$scope.search();
		}
		
		angular.element(document).ready(function () {
			$scope.search();
		});
		
		$scope.options = {
			language: 'en',
			allowedContent: true,
			entities: false
		};
		
		$scope.onReady = function () {
			CKEDITOR.replace('editor1');
		};
		
		$scope.onChange = function () {
			var ck = CKEDITOR.replace('editor1');
			$scope.post["description"] = ck.getData();
		};
		
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
				  $http.post("articles/remove",{params: item, action: 'remove'})
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
			//$location.path( "/admin/articles/show/" + item['id'] );
			//	console.log($location);
			$window.location.href = "/admin/articles/show/" + item['id'] ;
		 };
		
		$scope.submit = function(){
			if($scope.id){
				$scope.post["id"] = $scope.id;	
			}
			$http.post("/admin/articles/store",{params:$scope.post , action:'add'})
				.then(function (response) {
					toastr.success(response.data['message'],"Success");
					if(!$scope.id){
						$scope.resetForm();
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
		
		$scope.resetForm = function(){
		   $scope.post = {};
		};
		
	}]);
	
	

function newFunction() {
    return 'metadata';
}
	