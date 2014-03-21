var date_init = {
       setup: function() {
           var injector = angular.injector(['ticketpicker']);
           this.$service = injector.get('$dateService');
       },
       teardown: function() {
       }
   };

module('dateService', date_init);
   test("accepts null", function(){
        // arrange
        var validDate = null;

        // act
        var result = this.$service.validateDate(validDate);

        // assert
       ok(result);
    });

    test("accepts valid dates", function(){
        // arrange
        var validDate = "1/2/2013";

        // act
        var result = this.$service.validateDate(validDate);

        // assert
        ok(result, "should not fail a valid date");
    });

    test("rejects numbers", function(){
        // arrange
        var invalidDate = "123";

        // act
        var result = this.$service.validateDate(invalidDate);

        // assert
        equal(result, false, "should not allow numbers as strings to be considered dates");
    });

    test("rejects garbage", function(){
        // arrange
        var invalidDate = "-*/-*/*-";

        // act
        var result = this.$service.validateDate(invalidDate);

        // assert
        equal(result, false, "should not allow numbers as strings to be considered dates");
    });