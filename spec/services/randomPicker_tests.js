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