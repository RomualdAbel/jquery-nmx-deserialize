/*globals jQuery */
/**
 * @return         jQuery object
 * @author         Thomas Junghans (thomas.junghans@namics.com)
 * @version        0.1
 */

(function ($) {
    $.fn.extend({
        deserialize : function (d, config) {
            var data = d,
                currentDom,
                $current = null,
                $currentSavedValue = null,
                $self = this,
                i = 0,
                keyValPairString = [],
                keyValPairObject = {},
                tmp = null,
                defaults = null;

            if (d === undefined || !$self.is('form')) {
                return $self;
            }

            defaults = {
                overwrite : true
            };

            config = $.extend(defaults, config);

            if (d.constructor === String) {


                d = decodeURIComponent(d.replace(/\+/g, " "));

                keyValPairString = d.split('&');

                for (i = 0; i < keyValPairString.length; i++) {
                    tmp = keyValPairString[i].split('=');
                    keyValPairObject[tmp[0]] = tmp[1];

                }
            }

            $('input, select, textarea', $self).each(function (i) {

                $current = $(this);
                currentDom = $current.get(0);
                $currentSavedValue = keyValPairObject[$current.attr('name')];

                if (currentDom.disabled === true) {
                    return true;
                }

                if ($current.is('textarea')) {
                    if ($currentSavedValue === undefined) {
                        $current.val('');
                    } else {
                        $current.val($currentSavedValue);
                    }
                    return true;
                }

                if ($current.is('select')) {
                    if ($currentSavedValue === undefined) {
                        return true;
                    } else {
                        currentDom.selectedIndex = $currentSavedValue;
                    }
                    return true;
                }

                if ($current.is('input:radio')) {
                    if ($currentSavedValue !== undefined) {

                        $current.each(function () {
                            if ($(this).val() === $currentSavedValue) {
                                $(this).get(0).checked = true;
                            }
                        });
                    }

                    return true;
                }

                if ($current.is('input:checkbox')) {
                    currentDom.checked = ($current.val() === $currentSavedValue);
                    return true;
                }

                if ($current.is('input:text, input:hidden')) {
                    if ($currentSavedValue === undefined) {
                        $current.val('');
                    } else {
                        $current.val($currentSavedValue);
                        return true;
                    }

                }

            });

            return $self;
        }

    });

}(jQuery));