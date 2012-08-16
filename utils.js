/*
Copyright 2012 Leo Forner, Karl Forner

The JavaScript code in this page is dual licensed under the terms of the GPLv3 license or later
and the Sencha Model Extension License.
The Sencha licenses allows this component to be used with both the GPL and Commercial extjs framework licenses. 
*/
/*
 *
 * Package: utils
 * 
 * Useful Javascript functions and methods
 * 
 * 
 */


// ==============================================
// Group: Debug
// You can use the directy the following firebug log functions from the console API (see <http://getfirebug.com/wiki/index.php/Console_API> ):
// "log", "debug", "info", "warn", "error", "assert", "dir", "dirxml",
//    "group", "groupEnd", "time", "timeEnd", "count", "trace", "profile", "profileEnd"

function nothing() {}
var log = nothing, debug = nothing, assert = nothing, info = nothing, error = nothing, warn = nothing;

if ( window.console && window.console.firebug ) {
	log = console.log;
	debug = console.debug;
	info = console.info;
	warn = console.warn;
	error = console.warn;
	assert = console.assert;
}

/*
 * Function: getPropertiesValues
 * 
 * return all the values of the object as an array
 * dies if object is undefined
 * 
 * Parameters:
 * 	object - the object
 * 
 * Return:
 * 	the values - array
 * 
 */
function getPropertiesValues(object) {
	if ( object == undefined )
		return [];
	var l = [];
	for (var i in object)
		l.push( object[i]);
	return l;
}


// ==============================================
// Group: Array related
//  useful array prototypes, most  borrowed here : <http://www.hunlock.com/blogs/Mastering_Javascript_Arrays>
//

/*
 * Method: Array.map
 *
 * apply a transformation on an array
 *
 * Params:
 * 	fun - the transformation function : function
 *
 * Return:
 * 	the transformed elements - array
 *
 *
 * This prototype is provided by the Mozilla foundation and
 * is distributed under the MIT license.
 * http://www.ibiblio.org/pub/Linux/LICENSES/mit.license
 */
if (!Array.prototype.map) {
	Array.prototype.map = function(fun /* , thisp */) {
		var len = this.length;
		if (typeof fun != "function")
			throw new TypeError();

		var res = new Array(len);
		var thisp = arguments[1];
		for ( var i = 0; i < len; i++) {
			if (i in this)
				res[i] = fun.call(thisp, this[i], i, this);
		}
		return res;
	};
}

/*
 * Method: Array.filter
 *
 * Filter creates a new Array of items which evaluate to true in the supplied function. In the Array.every() method, we tested if the entire Array was composed of Numbers.
 * In Array.filter() we can extract all the numbers, creating a new Array in the process.
 *  was found then some() will return false.
 *
 * Params:
 * 	fun - the test function : function
 *
 * Return:
 * 	filtered - Array
 *
 *
 * This prototype is provided by the Mozilla foundation and
 * is distributed under the MIT license.
 * http://www.ibiblio.org/pub/Linux/LICENSES/mit.license
 */
if (!Array.prototype.filter){
	Array.prototype.filter = function(fun /*, thisp*/){
		var len = this.length;
		if (typeof fun != "function")
			throw new TypeError();

		var res = new Array();
		var thisp = arguments[1];
		for (var i = 0; i < len; i++){
			if (i in this){
				var val = this[i]; // in case fun mutates this
				if (fun.call(thisp, val, i, this))
					res.push(val);
			}
		}
		return res;
	};
}

/*
 *
 * Method: Array.reduce
 *
 * Apply a function against an accumulator and each value of the array (from left-to-right) as to reduce it to a single value.
 * See <http://developer.mozilla.org/En/Core_JavaScript_1.5_Reference/Global_Objects/Array/Reduce>
 *
 * Params:
 * 	fun - the function to apply: function
 *
 * Return:
 * 	a value
 *
 *
 * This prototype is provided by the Mozilla foundation and
 * is distributed under the MIT license.
 * http://www.ibiblio.org/pub/Linux/LICENSES/mit.license
 */
if (!Array.prototype.reduce)
{
  Array.prototype.reduce = function(fun /*, initial*/)
  {
    var len = this.length >>> 0;
    if (typeof fun != "function")
      throw new TypeError();

    // no value to return if no initial value and an empty array
    if (len == 0 && arguments.length == 1)
      throw new TypeError();

    var i = 0;
    if (arguments.length >= 2)
    {
      var rv = arguments[1];
    }
    else
    {
      do
      {
        if (i in this)
        {
          rv = this[i++];
          break;
        }

        // if array contains no values, no initial value to return
        if (++i >= len)
          throw new TypeError();
      }
      while (true);
    }

    for (; i < len; i++)
    {
      if (i in this)
        rv = fun.call(null, rv, this[i], i, this);
    }

    return rv;
  };
}

