var apps = angular.module('scraper', ['datatables']);
	apps.config(function ($interpolateProvider) {
		$interpolateProvider.startSymbol('<%');
		$interpolateProvider.endSymbol('%>');

	});
	
	apps.controller('user', ['$scope', '$http', function ($scope, $http) {
		$scope.user = {
			'name' : '',
			'email' : '',
			'password' : '',
			'role' : '3',
			'id' : false
		};
		$('body').progress('open');
		$scope.results = [];
		$scope.search = function () {
			/** 
			$http.post("/system/includes/pages/User/Ajax/response.php",{params:$scope.user , action: 'getCustomers'})
				.then(function(response) {
					$scope.results = response.data['customers'];
				});
				
			**/
			
			$http.post("/admin/users/api_index",{params:$scope.user})
				.then(function (response) {
					$scope.results = response.data['users'];
				})
				.catch(function (err) {
				   toastr.error("Something error , check your connection !","Error");
				   $('body').progress('close');
				})
				.finally(function () {
					$("table#tableUsers").DataTable();
					$('body').progress('close');
				});
			
		}
		
		angular.element(document).ready(function () {
			$scope.search();
		});
		
		$scope.openData = function(params) {
			var item = this.item;
			$scope.user = {
				'name' : item['name'],
				'email' : item['email'],
				'password' : item['password'],
				'role' : item['rolw'],
				'id' : item['id']
			};
			$("#modal_response").modal("show");
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
				  $http.post("users/remove",{params: item, action: 'remove'})
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
		
		$scope.openForm = function() {
			$scope.resetForm();
			$("#modal_response").modal("show")
		};
		
		$scope.resetForm = function(){
		   $scope.user = {};
		};
		
		$scope.addUser = function () {
			var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
			  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
			  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
			  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
			  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
			  '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
			//pattern.test( $scope.user['id'])
			console.log($scope.user);
			
			$http.post("/admin/users/store",{params:$scope.user , action: 'add'})
				.then(function(response) {
					//console.log(response.id);
					if(response.data["id"]){
						//$scope.results = response['users'];
						$("#modal_response").modal("hide");
						$scope.resetForm();
						if(response.status == '200'){
							toastr.success("Success..");
						}
						
					}
					else{
						if(response.data["message"]){
							toastr.error(response.data["message"],'Error');
						}
						else{
							toastr.error("Error..",'error');
						}
					}
				})
				.catch(function (err) {
				   toastr.error("Something error , check your connection !","Error");
				   $('body').progress('close');
				})
				.finally(function () {
					$scope.search();
					$('body').progress('close');
				});
			
		};
		
	}]);
	
	
	