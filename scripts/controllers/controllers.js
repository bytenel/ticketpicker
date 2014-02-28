/**
 * Created by ben.nelson on 2/21/14.
 */
ticketpicker.controller('main', ["$scope", "$datacontext", function($scope){
    $scope.users = [];

    $scope.addUser = function(user){
        this.users.push(user);
    }

    $scope.removeUser = function(userName){
        this.users = this.users.filter(function(element){
            return element.name != userName;
        });
    }
}]);