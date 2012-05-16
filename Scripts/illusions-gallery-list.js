(function ($) {
    $.illusions = $.illusions || {};
    $.illusions.gallery = $.illusions.gallery || {};
    $.illusions.gallery.list = $.illusions.gallery.list || {};

    $.extend($.illusions.gallery.list, {
        options:
            {
            },
        galleryListPageShow: function () {
            if ($('#galleryList').find('ul').html() != '') {
                return;
            }
            //get data from service
            var xhr = new XMLHttpRequest();
            var responseText;
            xhr.open('GET', 'http://www.illusionsli.com/index.php?id=201&docid=203', true);
            xhr.onload = function () {
                responseText = xhr.responseText;
                if (!responseText)
                    return;
                var xml = $.parseXML(responseText);
                var catListView = $(this).find($('#catList'));
                $(catListView).children().remove('li');
                $('item', xml).each(function () {
                    var item = $(this);
                    var img = $('<img src="css/images/blank.png" style="width:100%; height:70px; background: url(css/images/ajax-loader.gif) no-repeat center;"/>')
                .load(function () {
                    var that = $(this), imgLoad = new Image();
                    $(imgLoad).load(function () {
                        $(that).attr('src', $(this).attr('src'));
                    }).attr('src', item.find('thumb').text());
                });
                    var listItem = $('<li><a href="#" data-category-id="' + item.find('id').text() + '"><div style="text-align:center; float: left; width: 25%; height: 70px; border: 3px solid #c0c0c0; -webkit-border-radius: 3px; -moz-border-radius: 3px; -khtml-border-radius: 3px";></div><div style="display: inline-block; margin: 10px; width: 65%"><h6>'
                + item.find('title').text() + '</h6></div></a></li>');
                    listItem.find('div:first').prepend(img);
                    $(catListView).append(listItem);
                });
                $(catListView).listview("refresh");
                $(catListView).find($('li a')).each(function () {
                    $(this).live("click", function () {
                        var data_id = $(this).attr("data-category-id");
                        if (data_id != null) {
                            $("#galleryEntry").jqmData('data-category-id', data_id);
                            $.mobile.changePage($("#galleryEntry"));
                        }
                    });
                });
            };
            try {
                xhr.send();
            }
            catch (e) {
            };
        },

        init: function (options) {
            $.extend($.illusions.gallery.list.options, options);

            $('#galleryList').live('pageshow', $.illusions.gallery.list.galleryListPageShow);
        }
    });

})(jQuery);