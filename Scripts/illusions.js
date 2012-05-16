
(function ($) {
    $.illusions = $.illusions || {};

    $.extend($.illusions, {
        options:
            {
                requests: 2
            },

        eventListLoadCallBack: function (data) {
            var itemsCounter = 1;
            $('item', data).each(function () {
                var item = $(this);
                imgLoad = new Image();
                $(imgLoad).load(function () {
                    $('#loadData .upload-container').progressbar({ value: 50 + itemsCounter * 50 / 100 });
                    itemsCounter++;
                }).attr('src', item.find('image').text());
            });
        },

        loadDataInit: function () {

            $('#loadData').live('pageshow', function () {
                $.dataload.init();
            });
            $.dataload.initNew({ loadUrl: 'http://illusionsli.com/index.php?id=205&docid=175',
                pageId: 'contacts',
                progressOffset: 0
            });
            $.dataload.initNew({ loadUrl: 'http://illusionsli.com/index.php?id=201&docid=186',
                pageId: 'eventsList',
                progressOffset: 25,
                loadCallback: $.illusions.eventListLoadCallBack
            });

        },

        init: function (options) {
            $.extend($.illusions.options, options);
            $.illusions.loadDataInit();
            $.mobile.changePage('#homePage');
            $.illusions.maps.init({ lat: 40.7, long: -73.3 });
            $.illusions.gallery.entry.init();
            $.illusions.contacts.init();
            $.illusions.about.init();
            $.illusions.events.entry.init();
            $.illusions.events.list.init();
            $.illusions.gallery.list.init();

        }
    });
})(jQuery);