/**
 * Created by ben.nelson on 2/21/14.
 */
ticketpicker.controller('main', ["$dateService", "$scope", function($dateService, $scope){
    $scope.users = [];
    $scope.errorMessage = "";

    $scope.addUser = function(user){
        var nameIsUnique = this.users.every(function isUnique(element){
                                  return element.name != user.name;
                              });
        var nameIsNotBlank = user.name != "" && user.name != null;      
        var validWinDate = $dateService.validateDate(user.lastWin);

        if(!nameIsUnique || !validWinDate || !nameIsNotBlank)
        {
          this.setErrorMessage(nameIsUnique, nameIsNotBlank, validWinDate);
          return;
        }

        this.users.push(user);
    }

    $scope.removeUser = function(userName){
        $scope.users = this.users.filter(function(element){
            return element.name != userName;
        });
    }

    //could potentially do some cool error building with this
    //but that's for another day
    $scope.setErrorMessage = function(nameUnique, nameIsNotBlank, dateValid)
    {
        $scope.errorMessage = "";

        if(!nameIsNotBlank)
        {
          $scope.errorMessage += "Please input a name.<br/>";
        }

        if(!nameUnique)
        {
          $scope.errorMessage += "Please input a unique name.<br/>";  
        }

        if(!dateValid)
        {
          $scope.errorMessage += "Please input a valid date (mm-dd-yyyy).<br/>";
        }
    }
}]);