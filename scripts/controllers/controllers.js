/**
 * Created by ben.nelson on 2/21/14.
 */
ticketpicker.controller('main', ["$scope", "$datacontext", function($scope){
    $scope.users = [];

    $scope.addUser = function(user){
        var nameIsUnique = this.users.every(function isUnique(element){
                                  return element.name != user.name;
                              });
        if(nameIsUnique)
            this.users.push(user);
    }

    $scope.removeUser = function(userName){
        $scope.users = this.users.filter(function(element){
            return element.name != userName;
        });
    }
}]);