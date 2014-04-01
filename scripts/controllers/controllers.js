/**
 * Created by ben.nelson on 2/21/14.
 */
ticketpicker.controller('main', ["$dateService", "$scope", function($dateService, $scope){
    $scope.users = [];
    $scope.errorMessage = "";

    $scope.addUser = function(user){
        if(this.validUser(user))
            this.users.push(user);
    }

    $scope.editUser = function($index, user){
        user.edit = false;
        if(this.validUser(user, true))
          $scope.users[$index] = user;
    }

    $scope.removeUser = function(userName){
        $scope.users = this.users.filter(function(element){
            return element.name != userName;
        });
    }

    $scope.applyEdit = function($index){
        $scope.users[$index].edit = true;
    }

    $scope.validUser = function(user, isEdit){
      this.errorMessage = "";        
      var nameIsUnique = (this.users.every(function isUnique(element){
                              return element.name != user.name;
                           }) || isEdit);
      var nameIsNotBlank = user.name != "" && user.name != null;      
      var validWinDate = ($dateService.validateDate(user.lastWin) || user.lastWin == " ");

      if(!nameIsUnique || !validWinDate || !nameIsNotBlank)
      {
        this.setErrorMessage(nameIsUnique, nameIsNotBlank, validWinDate);
        return false;
      }

      return true;
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
          $scope.errorMessage += "Please input a valid date.<br/>";
        }
    }
}]);