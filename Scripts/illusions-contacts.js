(function ($) {
    $.illusions = $.illusions || {};
    $.illusions.contacts = $.illusions.contacts || {};

    $.extend($.illusions.contacts, {
        options:
            {
            },

        contactsPageShow: function (e, data) {
            var data = $(this).jqmData('contacts');
            $('item', data).each(function () {
                var item = $(this);
                $('#contacts').find('div.content').append(item.find('mobilecontent').text());
            });
        },

        init: function (options) {
            $.extend($.illusions.contacts.options, options);

            $('#contacts').live('pagebeforeshow', function () {
                $('#contacts').find('div.content').empty();
            });

            $('#contacts').live('pageshow', $.illusions.contacts.contactsPageShow);
        }
    });

})(jQuery);