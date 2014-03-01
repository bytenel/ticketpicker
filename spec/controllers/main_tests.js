/**
 * Created by ben.nelson on 2/28/14.
 */
test("base test", function(){
    ok(1 == "1", "Test framework works!");
});

//$mockDataContext still needs to be defined
var $mockDataContext = {};

var init = {
       setup: function() {
           this.$scope = injector.get('$rootScope').$new();
           this.$datacontext = $mockDataContext;
       },
       teardown: function() {
       }
   };
 var injector = angular.injector(['ng', 'ticketpicker']);
 module('users', init);
     test("users exist", function(){
        // arrange
        var $controller = injector.get('$controller');
        $controller('main', {
            $scope: this.$scope
        });

        // act
        var users = this.$scope.users;

        // assert
        ok(users, "users exist in the scope of the main controller");
        equal(Array.isArray(users), true, "users exist in the scope of the main controller as an array");
        equal(users.length, 0, "users exist in the scope of the main controller as an empty array");
    });

    test("can add users", function(){
        // arrange
        var $controller = injector.get('$controller');
        $controller('main', {
            $scope: this.$scope
        });
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
        var $controller = injector.get('$controller');
        $controller('main', {
            $scope: this.$scope
        });
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
        var $controller = injector.get('$controller');
        $controller('main', {
            $scope: this.$scope
        });
        var users = [{name: "ben", wins: [], lastWin: null}];

        // act
        this.$scope.addUser({name: "ben", wins: [], lastWin: null});
        this.$scope.addUser({name: "ben", wins: [], lastWin: null});

        console.log(this.$scope.users);

        //assert
        ok(this.$scope.users);
        equal(this.$scope.users.length, users.length);
    });