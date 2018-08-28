"use strict"
const accessories = {
  template: `
  <button ng-click="$ctrl.getAccessories();">Get Accessories</button>
  <form ng-submit="$ctrl.postAccessory($ctrl.newAccessory);">
    <input type="text" ng-model="$ctrl.newAccessory.brand" placeholder="Brand">
    <input type="text" ng-model="$ctrl.newAccessory.type" placeholder="Type">
    <input type="text" ng-model="$ctrl.newAccessory.material" placeholder="Material">
    <input type="text" ng-model="$ctrl.newAccessory.price" placeholder="Price">
    <button>Add Accessory</button>
  </form>
  <p ng-repeat="accessory in $ctrl.accessoriesList track by $index">{{ accessory }}
    <button ng-click="$ctrl.deleteAccessory($ctrl.accessoriesList[$index].id);">X</button>
    <button ng-click="$ctrl.updateAccessory($ctrl.accessoriesList[$index].id, $ctrl.newAccessory);">Update</button>
  </p>
  `,
  controller: function($http) {
    const vm = this;
    // This will send a get request to the GET route in ./routes/accessories.js
    // GET requests get data
    vm.getAccessories = () => {
     $http({
        url: "/api/shop/accessories",
        method: "GET"                 
     }).then((response) => {
        vm.accessoriesList = response.data;         
     })
    }
    // This will send a delete request to the DELETE route in ./routes/accessories.js
    // This takes a parameter, which in this case is an index
    // DELETE requests delete data
    vm.deleteAccessory = function (index) {
        $http({
            url: "/api/shop/accessories/" + index,
            method: "DELETE"
        }).then(function (response) {
            vm.accessoriesList = response.data;
        })                
    }
    
    // This will send a put request to the PUT route in ./routes/accessories.js
    // This will take both a parameter of the index to have its data replaced and a body which contains the updated data that will replace the old data
    // PUT requests update data
    vm.updateAccessory = (index, newAccessory) => {
        $http({
            url: "/api/shop/accessories/" + index,
            method : "PUT",
            data: newAccessory                                
        }).then((response) => { 
            vm.accessoriesList = response.data                                          
        });                                                                
    }        

    // This will send a post request to the POST route in ./routes/accessories.js
    // This will take a body of data to add to the array and send it to the POST route
    // POST requests add data
    vm.postAccessory = (newAccessory) => {
        $http({
            url: "api/shop/accessories/",
            method: "POST",
            data: newAccessory                                                                                                                        
        }).then((response) => {
            vm.accessoriesList = response.data;                        
        });                
    }
  }
}

angular.module("App").component("accessories", accessories);