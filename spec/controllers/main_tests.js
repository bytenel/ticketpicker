/**
 * Created by ben.nelson on 2/28/14.
 */
test("base test", function(){
    ok(1 == "1", "Test framework works!");
});

//mocks still need definitions...
var $mockDataContext = {};

var users_init = {
       setup: function() {
           this.$scope = injector.get('$rootScope').$new();
           this.$datacontext = $mockDataContext;
           this.$dateService = injector.get('$dateService'); 
           var $controller = injector.get('$controller');
           $controller('main', {
                $dateService: this.$dateService,
                $scope: this.$scope      
           });                 
       },
       teardown: function() {
       }
   };

 module('users', users_init);
    var injector = angular.injector(['ticketpicker']);

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
        equal(this.$scope.errorMessage, "Please input a valid date (mm-dd-yyyy).<br/>");
    });

    test("display an error if attempting to insert a invalid date", function(){
        // arrange
        var users = [];

        // act
        this.$scope.addUser({name: "ben", wins: [], lastWin: "1234"});

        //assert
        ok(this.$scope.users);
        equal(this.$scope.users.length, users.length);
        equal(this.$scope.errorMessage, "Please input a valid date (mm-dd-yyyy).<br/>");
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