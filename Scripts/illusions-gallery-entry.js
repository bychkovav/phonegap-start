(function ($) {
    $.illusions = $.illusions || {};
    $.illusions.gallery = $.illusions.gallery || {};
    $.illusions.gallery.entry = $.illusions.gallery.entry || {};

    $.extend($.illusions.gallery.entry, {
        options:
            {
            },

        galleryEntryPageShow: function (e, data) {
            //get data from service
            var xhr = new XMLHttpRequest();
            var responseText;
            var category = $('#galleryEntry').jqmData("data-category-id");
            xhr.open('GET', 'http://illusionsli.com/index.php?id=201&docid=' + category, true);
            xhr.onload = function () {
                responseText = xhr.responseText;
                if (!responseText)
                    return;
                var xml = $.parseXML(responseText);
                var imageContainer = $('#galleryEntry').find($('#Gallery'));
                $(imageContainer).children().remove('li');
                if (!responseText) {
                    return;
                }
                $('item', xml).each(function () {
                    var item = $(this);
                    $(imageContainer).append('<li><a href="' + item.find('image').text() + '" rel="external"><img src="' + item.find('thumb').text() +
                '" alt="" style="width:200px; height:200px; background: url(images/ajax-loader.gif) no-repeat center;" /></a></li>');
                });
                $('#Gallery a').photoSwipe();
            };
            try {
                xhr.send();
            }
            catch (e) {
            };

            return true;

        },

        init: function (options) {
            $.extend($.illusions.gallery.entry.options, options);

            $('#galleryEntry').live('pageshow', $.illusions.gallery.entry.galleryEntryPageShow);


        }
    });

})(jQuery);