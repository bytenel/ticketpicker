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

      test("accepts blank", function(){
        // arrange
        var validDate = " ";

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
        equal(result, true);
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
        equal(result, false, "should not allow garbage strings to be considered dates");
    });

    test("rejects invalid formatting with only having one section", function(){
        // arrange
        var invalidDate = "1/";

        // act
        var result = this.$service.validateDate(invalidDate);

        // assert
        equal(result, false, "allowed 1/");
    });


    test("rejects invalid formatting with only having two sections", function(){
        // arrange
        var invalidDate = "1/2/";

        // act
        var result = this.$service.validateDate(invalidDate);

        // assert
        equal(result, false, "allowed 1/2/");
    });

    test("rejects a slash", function(){
        // arrange
        var invalidDate = "/";

        // act
        var result = this.$service.validateDate(invalidDate);

        // assert
        equal(result, false, "allowed /");
    });