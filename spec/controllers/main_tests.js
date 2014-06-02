/**
 * Created by ben.nelson on 2/28/14.
 */
test("base test", function(){
    ok(1 == "1", "Test framework works!");
});

var users_init = {
       setup: function() {
           var injector = angular.injector(['ticketpicker']);
           this.$scope = injector.get('$rootScope').$new();
           this.$dateService = injector.get('$dateService'); 
           this.$randomPicker = injector.get('$randomPicker');
           this.$ad =  {};
           var $controller = injector.get('$controller');
           $controller('main', {
                $ad: this.$ad,
                $randomPicker: this.$randomPicker,
                $dateService: this.$dateService,
                $scope: this.$scope    
           });                 
       },
       teardown: function() {
       }
   };

 module('users', users_init);

     test("exist", function(){
        // arrange

        // act
        var users = this.$scope.users;

        // assert
        ok(users, "users exist in the scope of the main controller");
        equal(Array.isArray(users), true, "users exist in the scope of the main controller as an array");
        equal(users.length, 0, "users exist in the scope of the main controller as an empty array");
    });

    test("can add users", function(){
        // arrange      
        var users = [{name: "ben", wins: [], lastWin: null}, {name: "test", wins: [], lastWin: null}];

        // act
        this.$scope.addUser({name: "ben", wins: [], lastWin: null});
        this.$scope.addUser({name: "test", wins: [], lastWin: null});

        //assert
        ok(this.$scope.users);
        equal(this.$scope.users.length, users.length);
        $scope = this.$scope;
        users.forEach(function(element, index){
            deepEqual(element, $scope.users[index]);
        });
    });

    test("can remove users", function(){
        // arrange
        this.$scope.addUser({name: "ben", wins: [], lastWin: null});
        this.$scope.addUser({name: "test", wins: [], lastWin: null});
        var users = [];

        // act
        this.$scope.removeUser("ben");
        this.$scope.removeUser("test");

        //assert
        ok(this.$scope.users);
        equal(this.$scope.users.length, users.length);
    });

    test("unique user names", function(){
        // arrange
        var users = [{name: "ben", wins: [], lastWin: null}];

        // act
        this.$scope.addUser({name: "ben", wins: [], lastWin: null});
        this.$scope.addUser({name: "ben", wins: [], lastWin: null});

        //assert
        ok(this.$scope.users);
        equal(this.$scope.users.length, users.length);
    });

    test("inserted with invalid dates as strings for wins are rejected", function(){
        // arrange
        var users = [];

        // act
        this.$scope.addUser({name: "ben", wins: [], lastWin: "abc"});

        //assert
        ok(this.$scope.users);
        equal(this.$scope.users.length, users.length);
        equal(this.$scope.errorMessage, "Please input a valid date.<br/>");
    });

    test("display an error if attempting to insert a invalid date", function(){
        // arrange
        var users = [];

        // act
        this.$scope.addUser({name: "ben", wins: [], lastWin: "1234"});

        //assert
        ok(this.$scope.users);
        equal(this.$scope.users.length, users.length);
        equal(this.$scope.errorMessage, "Please input a valid date.<br/>");
    });

     test("display an error if attempting to insert a invalid name", function(){
        // arrange
        var users = [];

        // act
        this.$scope.addUser({name: null, wins: [], lastWin: "1/2/2013"});

        //assert
        ok(this.$scope.users);
        equal(this.$scope.users.length, users.length);
        equal(this.$scope.errorMessage, "Please input a name.<br/>");
    });

    test("clear errors if you fix the problem with a blank name", function(){
        // arrange
        var users = [{name: "null", wins: [], lastWin: "1/2/2013"}];
        this.$scope.addUser({name: null, wins: [], lastWin: "1/2/2013"});

        // act
        this.$scope.addUser({name: "null", wins: [], lastWin: "1/2/2013"}); 

        //assert        
        ok(this.$scope.users);
        equal(this.$scope.users.length, users.length);        
        equal(this.$scope.errorMessage, "");
    });

    test("clear errors if you fix the problem with a unique name", function(){
        // arrange
        var users = [{name: "null", wins: [], lastWin: "1/2/2013"}, {name: "test", wins: [], lastWin: "1/2/2013"}];
        this.$scope.addUser({name: "null", wins: [], lastWin: "1/2/2013"}); 
        this.$scope.addUser({name: "null", wins: [], lastWin: "1/2/2013"});

        // act
        this.$scope.addUser({name: "test", wins: [], lastWin: "1/2/2013"});

        //assert        
        ok(this.$scope.users);
        equal(this.$scope.users.length, users.length);        
        equal(this.$scope.errorMessage, "");
    });

    test("clear errors if you fix the problem with a nondate", function(){
      // arrange
      var users = [{name: "null", wins: [], lastWin: "1/2/2013"}];
      this.$scope.addUser({name: "null", wins: [], lastWin: '123'}); 

      // act
      this.$scope.addUser({name: "null", wins: [], lastWin: "1/2/2013"});

      //assert        
      ok(this.$scope.users);
      equal(this.$scope.users.length, users.length);        
      equal(this.$scope.errorMessage, "");
    });

     test("clear errors if you fix the problem with a garbage date", function(){
      // arrange
      var users = [{name: "null", wins: [], lastWin: "1/2/2013"}];
      this.$scope.addUser({name: "null", wins: [], lastWin: '/-*/-*/'}); 

      // act
      this.$scope.addUser({name: "null", wins: [], lastWin: "1/2/2013"});

      //assert        
      ok(this.$scope.users);
      equal(this.$scope.users.length, users.length);        
      equal(this.$scope.errorMessage, "");
    });

     test("allows blank dates", function(){
      // arrange
      var users = [{name: "null", wins: [], lastWin: " "}];

      // act
      this.$scope.addUser({name: "null", wins: [], lastWin: ' '}); 

      //assert        
      ok(this.$scope.users);
      equal(this.$scope.users.length, users.length);        
      equal(this.$scope.errorMessage, "");
    });


    test("allows undefined dates", function(){
      // arrange
      var users = [{ name: "null", wins: [], lastWin: undefined }];

      // act
      this.$scope.addUser({ name: "null", wins: [], lastWin: undefined }); 

      //assert        
      ok(this.$scope.users);
      equal(this.$scope.users.length, users.length);        
      equal(this.$scope.errorMessage, "");
    });

module('winners', users_init);

     test("picks a winner", function(){
      // arrange
      var users = [{ name: "null", wins: [], lastWin: undefined }];
      this.$scope.addUser({ name: "null", wins: [], lastWin: undefined }); 
      
      // act
       this.$scope.pickWinner();

      //assert  
       ok(this.$scope.winner, "Winner should not be undefined.");
    });

    test("updates winner last win date", function(){
      // arrange
      var users = [{ name: "null", wins: [], lastWin: undefined }];
      this.$scope.addUser({ name: "null", wins: [], lastWin: undefined }); 
      
      // act
       this.$scope.pickWinner();
       winner = this.$scope.winner;
       orgUser = this.$scope.users[0];

      //assert  
       deepEqual(this.$scope.winner, orgUser, "Winner should be same as orginal user.");
       notEqual(orgUser.lastWin, undefined, "Winner should have updated win date.")
    });