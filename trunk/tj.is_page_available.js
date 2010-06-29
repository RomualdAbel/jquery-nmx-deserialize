/*globals jQuery */

/**
 * Checks if the given url is available and returns true or false.
 * @author	Thomas Junghans (thomas.junghans@namics.com)
 * @version 0.1
 * @method	is_page_available
 * @param	url {String}
 * @param	callback {Function}
 * @requires jQuery, http://jquery.com/ (tested with version 1.4.2) 
 * @return	boolean
 */
 
var tj = tj || {};
 
(function () {
	tj.is_page_available = function (url, callback) {
		$(function () {
			$.ajax({
				url : url,
				success : function () {
					// page found
					callback(true);
					return true;
				},
				error : function (xhr, d, e) {
					if (xhr.status === 404) {
						// page not found
						callback(false);
						return false;
					}
				}
			});
		});
		return true;
	};
}());