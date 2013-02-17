/**
 * Interface binding (conversion) is defined here:
 * The result of converting an IDL interface type value to an ECMAScript value is the Object value
 * that represents a reference to the same object that the IDL interface type value represents.
 * http://dev.w3.org/2006/webapi/WebIDL/#es-interface
 **/
require(["types/Interface"], function(Interface) {
    'use strict';

    var requirement, QUnit = window.QUnit;

    module('WebIDL Interface', {
        setup: function() {},
        teardown: function() {}
    });

    requirement = "If Type(V) is not Object, then throw a TypeError.";
    QUnit.test(requirement, function(){

      QUnit.throws(function(){
        window.WebIDL.Interface(-0);
      }, TypeError, 'Number is invalid type.');

      QUnit.throws(function(){
        window.WebIDL.Interface('hello');
      }, TypeError, 'String is invalid type.');

      QUnit.throws(function(){
        window.WebIDL.Interface(undefined);
      }, TypeError, 'undefined is invalid type.');

      // Removed until the proper treatment of null is figured out.
      /*QUnit.throws(function(){
        window.WebIDL.Interface(null);
      }, TypeError, 'null is invalid type.');*/

    });

    requirement = "If V is a platform object that implements I, then return the IDL interface type value that represents a reference to that platform object.";
    QUnit.test(requirement, function(){
      var testDate = new Date();
      QUnit.strictEqual(window.WebIDL.Interface(testDate), testDate, 'Date is a valid platform object');
    });

    requirement = "If V is a user object that is considered to implement I according to the rules in section 4.7, then return the IDL interface type value that represents a reference to that user object.";
    QUnit.test(requirement, function(){
      var userObj = Object.create({test: function(){ return false; }});
      QUnit.strictEqual(window.WebIDL.Interface(userObj), Object, 'Object.create is valid user object.');
    });

});