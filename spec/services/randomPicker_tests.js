//random user picking spec
var rando_init = {
       setup: function() {
           var injector = angular.injector(['ticketpicker']);
           this.$service = injector.get('$randomPicker');
       },
       teardown: function() {
       }
   };

 module('random picker service', rando_init);

     test("returns undefined from a blank array", function(){
        // arrange
       
        // act
        var object = this.$service.select([]);

        // assert        
        equal(object, undefined, "When selecting from an empty array, result should be undefined.");
        notStrictEqual(object, null, "When selecting from an empty array, result should not be null.");
    });

    test("returns the only user present in a one person array", function(){
        // arrange
        var user = {name: 'ben', lastWin: ''};
        var users = [user];

        // act
        var object = this.$service.select(users);

        // assert
        deepEqual(object, user, "The user selected should be the only one present.");
    });

    test("out of two users, picks the one without a win date", function(){
        // arrange
        var user2 = {name: 'ben', lastWin: ''};
        var user1 = {name: 'ben1', lastWin: '1/2/13'};
        var users = [user1,user2];

        // act
        var object = this.$service.select(users);

        // assert
        deepEqual(object, user2, "The user selected should be the one without a win.");
    });

    test("out of two users, picks the one with the eariler win date", function(){
        // arrange
        var user2 = {name: 'ben', lastWin: '1/1/13'};
        var user1 = {name: 'ben1', lastWin: '1/2/13'};
        var users = [user1,user2];

        // act
        var object = this.$service.select(users);

        // assert
        deepEqual(object, user2, "The user selected should be the one with the earlier win.");
    });