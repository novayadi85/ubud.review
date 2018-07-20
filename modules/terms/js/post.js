var apps = angular.module('term', ['datatables','ngCkeditor']);
apps.config(function ($interpolateProvider) {
    $interpolateProvider.startSymbol('<%');
    $interpolateProvider.endSymbol('%>');

});

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

apps.controller('terms', ['$scope', '$http', '$location', '$window', function ($scope, $http , $location ,$window) {
    $scope.post = {
        'title' : '',
        'slug' : '',
        'lang' : 'en',
        'description' : '',
        'id' : false
    };
    $scope.lang = '';
    $scope.results = [];
    $scope.search = function () {
        if($scope.view != 'list'){
            return ;
        }
        
        $('body').progress('open');
        $http.post("/admin/terms/api_v1",{params:$scope.post})
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
              $http.post("terms/remove",{params: item, action: 'remove'})
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
        $window.location.href = "/admin/terms/show/" + item['id'] ;
     };
    
    $scope.submit = function(){
        if($scope.id){
            $scope.post["id"] = $scope.id;	
        }
        $http.post("/admin/terms/store",{params:$scope.post , action:'add'})
            .then(function (response) {
                toastr.success(response.data['message'],"Success");
                $scope.resetForm();
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


