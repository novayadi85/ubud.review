var apps = angular.module('navigation', ['datatables','localytics.directives']);
	apps.config(function ($interpolateProvider) {
		$interpolateProvider.startSymbol('<%');
		$interpolateProvider.endSymbol('%>');

	})
	.config(['chosenProvider', function (chosenProvider) {
        chosenProvider.setOption({
            no_results_text: 'There is no results!',
            placeholder_text_multiple: 'Choose one or more!'
        });
    }]);
	
	apps.directive('initModel', function($compile) {
		return {
			restrict: 'A',
			link: function(scope, element, attrs) {
				scope[attrs.initModel] = element[0].value;
				scope.post[attrs.initModel] = element[0].value;
				element.attr('ng-model', attrs.initModel);
				element.removeAttr('init-model');
				$compile(element)(scope);
			}
		};
	});

	apps.controller('organizer', ['$scope', '$http', function ($scope, $http) {
			$scope.list = {
				'title' : '',
				'parent' : '',
				'id' : false
			};
			$scope.menu = {
				'title' : '',
				'link' : '',
				'target': '',
				'id' : false
			};
			
			$scope.dropdowns = [];

			$('body').progress('open');
			$scope.results = [];
			$scope.search = function () {
				$http.post("/admin/menu/api_v1",{params:$scope.user , action: 'getLists'})
					.then(function (response) {
						$scope.dropdowns = response.data['dropdown'];
						if(!response.data['list']){
							toastr.error("Sorry , No data found yet!","Error");
							
						}
						else{
							$scope.results = response.data['list'];
							$('#nestable_lists').nestable({maxDepth:4,
								dropCallback: function(details){
									$scope.reloadList(details);
								}
							});
						}
						
					})
					.catch(function (err) {
					   toastr.error("Something error , check your connection !","Error");
					   $('body').progress('close');
					})
					.finally(function () {
						$('.nestable_lists').nestable('buttons');
						$('body').progress('close');
					});
				
			}
			
			$scope.reloadList = function(details) {
				var items  = $(details.sourceEl).html();
				$('body').progress('open');
				$http.post("/admin/menu/reload",{params:$scope.menu , action: 'save' , details: details})
					.then(function(response) {
						$scope.search();
					})
					.finally(function () {
						$('body').progress('close');
					});
				
				
			}
			
			$scope.create = function(e) {
				$("#modal_response").modal('show');
				
			};
			
			
			
			$scope.edit = function(e) {
				var item = this.item;
				$scope.menu = {
					'title' : item['title'],
					'link' : item['link'],
					'target' : parseInt(item['target']),
					'id' : item['id']
				};

				$("#modal_response").modal('show');
				
			};
			
			$scope.save = function(){
				$http.post("/admin/menu/store",{params:$scope.menu , action: 'add'})
				.then(function(response) {
					if(response.data["id"]){
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
			}
			
			$scope.tree = function(trees) {
				
				return "<div>Test</div>";
			}
			
			
			
			angular.element(document).ready(function () {
				$scope.search();
			});
			
			$scope.resetForm = function(){
			   $scope.menu = {};
			};

		}]);