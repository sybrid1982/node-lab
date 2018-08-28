"use strict"
const clothes = {
  template: `
  <button ng-click="$ctrl.getClothes();">Get clothes</button>
  <form ng-submit="$ctrl.postClothes($ctrl.newClothes);">
    <input type="text" ng-model="$ctrl.newClothes.brand" placeholder="Brand">
    <input type="text" ng-model="$ctrl.newClothes.type" placeholder="Type">
    <input type="text" ng-model="$ctrl.newClothes.color" placeholder="Color">
    <input type="text" ng-model="$ctrl.newClothes.price" placeholder="Price">
    <button>Add clothes</button>
  </form>
  <p ng-repeat="clothes in $ctrl.clothesList track by $index">{{ clothes }}
    <button ng-click="$ctrl.deleteClothes($ctrl.clothesList[$index].id);">X</button>
    <button ng-click="$ctrl.updateClothes($ctrl.clothesList[$index].id, $ctrl.newClothes);">Update</button>
  </p>
  `,
  controller: function($http) {
    const vm = this;
    // This will send a get request to the GET route in ./routes/clothes.js
    // GET requests get data
    vm.getClothes = () => {
     $http({
        url: "/api/shop/clothes",
        method: "GET"                 
     }).then((response) => {
        vm.clothesList = response.data;         
     })
    }
    // This will send a delete request to the DELETE route in ./routes/clothes.js
    // This takes a parameter, which in this case is an index
    // DELETE requests delete data
    vm.deleteClothes = function (index) {
        $http({
            url: "/api/shop/clothes/" + index,
            method: "DELETE"
        }).then(function (response) {
            vm.clothesList = response.data;
        })                
    }
    
    // This will send a put request to the PUT route in ./routes/clothes.js
    // This will take both a parameter of the index to have its data replaced and a body which contains the updated data that will replace the old data
    // PUT requests update data
    vm.updateClothes = (index, newClothes) => {
        $http({
            url: "/api/shop/clothes/" + index,
            method : "PUT",
            data: newClothes                                
        }).then((response) => { 
            vm.clothesList = response.data                                          
        });                                                                
    }        

    // This will send a post request to the POST route in ./routes/clothes.js
    // This will take a body of data to add to the array and send it to the POST route
    // POST requests add data
    vm.postClothes = (newClothes) => {
        $http({
            url: "api/shop/clothes/",
            method: "POST",
            data: newClothes                                                                                                                        
        }).then((response) => {
            vm.clothesList = response.data;                        
        });                
    }
  }
}

angular.module("App").component("clothes", clothes);