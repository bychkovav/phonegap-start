(function ($) {
    $.illusions = $.illusions || {};
    $.illusions.about = $.illusions.about || {};

    $.extend($.illusions.about, {
        options:
            {
            },
        
        aboutPageShow: function (e, data) {
            if ($('#about').find('div.aboutContent').html() == '') {

                var xhr = new XMLHttpRequest();
                var responseText;
                xhr.open('GET', 'http://illusionsli.com/index.php?id=205&docid=1', true);

                xhr.onload = function () {
                    responseText = xhr.responseText;
                    if (!responseText)
                        return;
                    var xml = $.parseXML(responseText);
                    $('item', xml).each(function () {
                        var item = $(this);
                        var content = $(item.find('mobilecontent').text());
                        var phone = $(content.find('span span')[1]);
                        phone.html('<a href="tel:' + phone.text() + '">' + phone.text() + "</a>");
                        $('#about').find('div.content').append(content);

                    });
                };

                try {
                    xhr.send();
                }
                catch (e) {
                };
            }
        },

        init: function (options) {
            $.extend($.illusions.about.options, options);
            
            $('#about').live('pageshow', $.illusions.about.aboutPageShow);
        }
    });

})(jQuery);