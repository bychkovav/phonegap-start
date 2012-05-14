(function ($) {
    $.dataload = {};

    $.extend($.dataload, {
        options:
            {
                loadUrl: undefined,
                loadCallback: function (data) { },
                pageId: undefined,
                progressOffset: undefined
            },

        loadDataFromUrl: function () {
            var xhr = new XMLHttpRequest();
            var responseText;
            xhr.open('GET', $.dataload.options.loadUrl, false);
            xhr.onload = function () {
                responseText = xhr.responseText;
                if (!responseText)
                    return;
                var data = $.parseXML(responseText);
                $('#' + $.dataload.options.pageId).jqmData($.dataload.options.pageId, data);
                $.dataload.options.loadCallback(data);
            };
            xhr.onprogress = function (e) {
                $('#loadData .upload-container').progressbar({ value: $.dataload.options.progressOffset +
                    +(e.position / e.totalSize) / $.illusions.options.requests
                });
            };

            try {
                xhr.send();
            }
            catch (e) {
            };
        },

        init: function () {
            $('#loadData .upload-container').progressbar({ value: 0 });
        },

        initNew: function (options) {
            $.extend($.dataload.options, options);
            $.dataload.loadDataFromUrl();
        }
    });


})(jQuery);