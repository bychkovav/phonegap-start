// Map scripts 
//************************************************************************
(function ($) {
    $.illusions.maps = $.illusions.maps || {};

    $.extend($.illusions.maps, {
        options:
            {
                //Should be overrided
                lat: undefined,
                long: undefined,
                mapdata: { destination: new google.maps.LatLng(40.767671, -73.295897) }
            },

        fadingMsg: function (locMsg) {
            $("<div class='ui-loader ui-overlay-shadow ui-body-e ui-corner-all'><h1>" + locMsg + "</h1></div>")
                    .css({ "display": "block", "opacity": 0.8, "top": $(window).scrollTop() + 100 })
                    .appendTo($.mobile.pageContainer)
                    .delay(2200)
                    .fadeOut(1000, function () { $(this).remove(); });
        },

        getClubLocation: function (mapForm, callback) {
            mapForm.gmap({ 'center': mapdata.destination,
                'zoom': 12,
                'mapTypeControl': false,
                'navigationControl': false,
                'streetViewControl': false
            }).bind('init', function (evt, map) {
                mapForm.gmap('addMarker', { 'position': map.getCenter(), 'animation': google.maps.Animation.DROP },
                    function (map, marker) {
                        mapForm.gmap('addInfoWindow', { 'position': marker.getPosition(), 'content': 'Illusions Gentlmen\'s Club' },
                                        function (iw) {
                                            $(marker).click(function () {
                                                iw.open(map, marker);
                                                map.panTo(marker.getPosition());
                                            });
                                        });
                    });
                callback();
            });
        },

        initRefresh: function () {
            $('.refresh').live("tap", function () {
                var currentPosition = {};
                //Test App code
                currentPosition.latitude = $.illusions.maps.options.lat;
                currentPosition.longitude = $.illusions.maps.options.long;
                $('#map_canvas').gmap('displayDirections', {
                    'origin': new google.maps.LatLng(currentPosition.latitude, currentPosition.longitude),
                    'destination': $.illusions.maps.options.mapdata.destination,
                    'travelMode': google.maps.DirectionsTravelMode.DRIVING
                },
                    {
                        'panel': document.getElementById('dir_panel')
                    },
                    function (result, status) {
                        if (status === 'OK') {
                            var center = result.routes[0].bounds.getCenter();
                            $('#map_canvas').gmap('option', 'center', center);
                            $('#map_canvas').gmap('refresh');
                        } else {
                            $.illusions.maps.fadingMsg("Too far from you, to get directions.");
                            $.illusions.maps.getClubLocation();
                        }
                    });
                // END: Tracking location with test lat/long coordinates
                $(this).removeClass($.mobile.activeBtnClass);
                return false;
            });
        },

        init: function (options) {
            $.extend($.illusions.maps.options, options);
            $.illusions.maps.initRefresh();
            $('#dir_panel').live("tap", function () {
                $.mobile.changePage($('#page-map'), {});
            });

            $('#page-dir').live("pageshow", function () {
                $.illusions.maps.fadingMsg("Tap any instruction<br/>to see details on map");
            });
            $('#map').live("pageinit", function () {
                $.illusions.maps.getClubLocation($('#map_square'));
                $('#map_square').click(function () {
                    $.mobile.changePage($('#page-map'), {});
                });
            });
            $('#page-map').live("pageshow", function () {
                $.illusions.maps.getClubLocation($('#map_canvas'), function () { $('.refresh').trigger('tap'); });
            });
        }
    });

})(jQuery);