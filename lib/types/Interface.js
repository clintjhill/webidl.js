/**
 * An identifier that identifies an interface is used to refer to a type that corresponds to the set
 * of all possible non-null references to objects that implement that interface. There is no way to
 * represent a constant object reference value for a particular interface type in IDL. To denote a
 * type that includes all possible references to objects implementing the given interface plus the null
 * value, use a nullable type. The type name of an interface type is the identifier of the interface.
 * @see <a hre="http://dev.w3.org/2006/webapi/WebIDL/#idl-interface">Web IDL Interface</a>
 * @author <a href="mailto:clint.hill@gmail.com">Clint Hill</a>
 */
define(function(require) {
    'use strict';
    var IDLType = require('WebIDL/types/IDLType'),
        WebIDL = require('WebIDL/interfaces/WebIDL');

    /**
     * Creates a new WebIDL Interface.
     * @class Represents a WebIDL Interface.
     * @constructor
     * @see <a href='http://dev.w3.org/2006/webapi/WebIDL/#idl-interface'>WebIDL Interface</a>.
     * @param V {any} the value to be converted.
     * @param extendedAttr {String} an extended attribute.
     **/
    WebIDL.Interface = function(value, extendedAttr) {
        if (!(this instanceof WebIDL.Interface)) {
            return toInterface(value, extendedAttr);
        }
        IDLType.call(this, 'Interface', toInterface, value, extendedAttr);
    };

    /**
     * The result of converting an IDL interface type value to an ECMAScript value is the Object value
     * that represents a reference to the same object that the IDL interface type value represents.
     * @see <a href="http://dev.w3.org/2006/webapi/WebIDL/#es-interface">Interface types</a>
     * @param V {any} the value to be converted.
     * @param extendedAttr {String} an extended attribute.
     **/
    function toInterface(V, extendedAttr) {
        //TODO: Determine if null is an acceptable type for Interface
        // null passes this guard.
        if (typeof(V) !== 'object') {
            throw new TypeError();
        }
        if ((isPlatformObject(V) || isUserObject(V)) && implementsInterface(V)) {
            return V;
        }
        throw new TypeError();
    }

    /**
     * Determines if V is a Platform object
     * @see  <a href="http://dev.w3.org/2006/webapi/WebIDL/#es-platform-objects">Platform Object</a>
     * @param  {any}  V value to inspect
     */
    function isPlatformObject(V) {
        // Need platform check at all?
        return true;
    }

    /**
     * Determines if V is a User object
     * @see  <a href="http://dev.w3.org/2006/webapi/WebIDL/#es-user-objects">User Object</a>
     * @param  {any}  V value to inspect
     */
    function isUserObject(V) {
        var type = typeof(V);
        if (type === 'object' && !V instanceof(Date) && !V instanceof(RegExp)) {
            return true;
        }
    }

    /**
     * Determines if V implements the operations of this object.
     * @see  <a href=""http://dev.w3.org/2006/webapi/WebIDL/#es-user-objects>Implementing callback interfaces</a>
     * @param  {any} V value to inspect
     */
    function implementsInterface(V) {
        var implemented = true;
        //TODO: This seems so naive, also - what is 'this' supposed to be in the context?
        // Seems though the implementation check isn't properly setup with a context.
        for (var prop in V) {
            implemented = (prop in this);
            if(!implemented){
                break;
            }
        }
        return implemented;
    }

    //The type name of the interface type is "Interface".
    WebIDL.Interface.prototype = IDLType;
    return WebIDL.Interface;
});