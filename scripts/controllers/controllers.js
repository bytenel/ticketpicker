/**
 * Created by ben.nelson on 2/21/14.
 */
ticketpicker.controller('main', ["$http","$randomPicker", "$dateService", "$scope", function($http, $randomPicker, $dateService, $scope){
    $scope.users = [];
    $scope.errorMessage = "";
    $scope.winner = undefined;

    $scope.load = function(){
     $http.get('http://localhost:2080/api/users')
       .success(function(data) {
         if(data.status)
         {
            console.log(data);
            window.setTimeout($scope.load, 1000);
         }
         else{
          var allUsers = _.union($scope.users,data);
          var finalUsers = _.uniq(allUsers);
          $scope.users = finalUsers;
          console.log(data);
         }
       })
       .error(function(data) {
           console.log('Error: ' + data);
      });
   }

   $scope.load();

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
      var validWinDate = ($dateService.validateDate(user.lastWin));   
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

    $scope.pickWinner = function(){
        var winner = $randomPicker.select(this.users);
        var d =  new Date();
        var date = d.getDate();
        var month = d.getMonth() + 1;
        var year = d.getFullYear();
        winner.lastWin = month + "/" + date + "/" + year;
        this.winner = winner;
    }
}]);