(function ($) {
    $.illusions = $.illusions || {};
    $.illusions.events = $.illusions.events || {};
    $.illusions.events.list = $.illusions.events.list || {};

    $.extend($.illusions.events.list, {
        options:
            {
            },
        
        eventListPageShow: function (e, data) {
            var eventListView = $(this).find($('#eventListView'));
            eventListView.children().remove('li');

            var data = $(this).jqmData('eventsList');
            $('item', data).each(function () {
                var item = $(this);
                var img = $('<img style="height:200px;" />').attr('src', item.find('image').text().replace(/\s+/g, ''));
                var link = $('<a href="#"><div style="text-align:center; float: left;"></div><div style="display: inline-block; margin: 10px; width: 65%"><h6>'
                + item.find('title').text() + '</h6></div></a>');
                link.find('div:first').prepend(img);
                link.bind("click", function () {
                    $("#eventEntry").jqmData('event-xml-item', item);
                    $.mobile.changePage($('#eventEntry'));
                });
                eventListView.append($('<li></li>').append($(link)));
                eventListView.listview("refresh");
            });
        },
        
        init: function (options) {
            $.extend($.illusions.events.list.options, options);
            
            $('#homePage').live('pageshow', function (e, data) {
                $('#reserveCalee').text('#homePage');
            });

            $('#eventsList').live('pageshow', $.illusions.events.list.eventListPageShow);
        }
    });

})(jQuery);