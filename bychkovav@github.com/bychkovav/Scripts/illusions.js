
(function ($) {
    $.illusions = $.illusions || {};

    $.extend($.illusions, {
        options:
            {
                requests: 2
            },

        mapInit: function () {
            $.illusions.maps.init({ lat: 40.7, long: -73.3 });
        },





        // Gallery ENTRY scripts
        //************************************************************************
        galleryEntryInit: function () {
            $('#galleryEntry').live('pageshow', galleryEntryPageShow);

            function galleryEntryPageShow(e, data) {

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

            };
        },

        // Gallery LIST scripts
        //************************************************************************
        galleryListInit: function () {
            $('#galleryList').live('pageshow', galleryListPageShow);

            function galleryListPageShow() {
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
                        var img = $('<img src="images/blank.png" style="width:100%; height:70px; background: url(images/ajax-loader.gif) no-repeat center;"/>')
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
            };
        },
        // Events list pages scripts
        //************************************************************************
        eventListInit: function () {
            $('#homePage').live('pageshow', function (e, data) {
                $('#reserveCalee').text('#homePage');
            });


            $('#eventsList').live('pageshow', function (e, data) {

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


            });
        },
        // Event ENTRY pages scripts
        //************************************************************************
        eventEntryInit: function () {
            $('#eventEntry').live('pageshow', function (e, data) {
                xmlItem = $(this).jqmData('event-xml-item');
                var content = $(this).find('.content');
                content.find('h3').html(xmlItem.find('title').text());

                var that = $(content.find('img')), imgLoad = new Image();
                $(imgLoad).load(function () {
                    $(that).attr('src', $(this).attr('src'));
                }).attr('src', xmlItem.find('image').text());

                content.find('p').html(xmlItem.find('introtext').text());

                content.find('#btnReserve').unbind("click");
                content.find('#btnReserve').bind("click", function () {
                    //$("#reserve").jqmData('event-xml-item', xmlItem);
                    $.mobile.changePage($('#reserve'));
                });
            });

            $('#eventEntry').live('pagehide', function (e, data) {
                $(this).find('img').attr('src', null);
                $(this).find('p').html('');
            });
        },
        // ABOUT US page scripts
        //************************************************************************
        aboutUsInit: function () {
            $('#about').live('pageshow', function (e, data) {
                if ($('#about').find('div.content').html() == '') {

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
            });
        },

        // CONTACT US page scripts
        //************************************************************************
        contactsInit: function () {
            $('#contacts').live('pagebeforeshow', function () {
                $('#contacts').find('div.content').empty();
            });

            $('#contacts').live('pageshow', function (e, data) {
                var data = $(this).jqmData('contacts');
                $('item', data).each(function () {
                    var item = $(this);
                    $('#contacts').find('div.content').append(item.find('mobilecontent').text());
                });
            });
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
            $.illusions.mapInit();
            $.illusions.galleryEntryInit();
            $.illusions.contactsInit();
            $.illusions.aboutUsInit();
            $.illusions.eventEntryInit();
            $.illusions.eventListInit();
            $.illusions.galleryListInit();

        }
    });
})(jQuery);