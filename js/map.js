$(document).ready(function () {

    if (!$("#map").length) {
        return false;
    }

    // JSON FILE, PIN FOLDER
    jsonMapInfo = [
        ["amenities1.json", "pin1.png"],
        ["amenities2.json", "pin2.png"],
        ["amenities3.json", "pin3.png"],
        ["amenities4.json", "pin1.png"],
        ["amenities5.json", "pin2.png"],
        ["amenities6.json", "pin3.png"]
    ];

    masterMapInfo = jsonMapInfo;

    // POINT VARIABLES
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: {lat: 43.7742, lng: -79.57983},
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [{"stylers": [{"saturation": 0}]}, {"featureType": "road", "elementType": "geometry", "stylers": [{"lightness": 200}, {"visibility": "simplified"}]}, {"featureType": "road", "elementType": "labels", "stylers": [{"visibility": "simplified"}]}, {"featureType": "administrative", "elementType": "labels", "stylers": [{"visibility": "simplified"}]}, {"featureType": "poi", "elementType": "labels", "stylers": [{"visibility": "simplified"}, {"saturation": 45}]}, {"featureType": "water", "elementType": "labels", "stylers": [{"visibility": "simplified"}, {"saturation": -45}]}, {"featureType": "water", "elementType": "geometry", "stylers": [{"visibility": "simplified"}, {"saturation": 45}]}, {"featureType": "landscape", "elementType": "labels", "stylers": [{"visibility": "simplified"}, {"saturation": 45}]}, {"featureType": "transit", "elementType": "labels", "stylers": [{"visibility": "simplified"}, {"saturation": 45}]}],
        mapTypeControl: false,
        streetViewControl: false,
        scrollwheel: false,
        zoomControl: false
    });

    function quoteIt(inVar) {
        return '"' + inVar + '"';
    }

    $(".checkboxwrapper input[type=checkbox]").click(function () {
        infowindow.close(); // < Close all info windows
        for (var i = 0, n = markers.length; i < n; ++i) {
            markers[i].setMap(null); // < Remove all pins
        }

        // POINT VARIABLES       
        markers = new Array(); // < Array to store selected points
        mapCount = 0; // 
        infowindow = new google.maps.InfoWindow();
        locations = new Array();
        var marker, i;

        singlePtsAR = new Array();

        mapCount = 0;

        checkedOff = [];
        count = 0;
        var innerArray = new Array();

        checkedOff = [];
        $(".checkboxwrapper input[type=checkbox]").each(function () {
            thsDataVal = $(this).attr("data-val");
            if ($(this).prop("checked")) {
                checkedOff.push([masterMapInfo[thsDataVal][0], masterMapInfo[thsDataVal][1]]);
                count++;
            }
        });
        jsonMapInfo = checkedOff;
        if (count == 0) {
            jsonMapInfo = masterMapInfo;
        }
        jsonPts(jsonMapInfo);
    });

    //add custom buttons for the zoom-in/zoom-out on the map
    function CustomZoomControl(controlDiv, map) {
        //grap the zoom elements from the DOM and insert them in the map 
        if (!document.getElementById('cd-zoom-in')) {
            return false;
        }
        var controlUIzoomIn = document.getElementById('cd-zoom-in'), controlUIzoomOut = document.getElementById('cd-zoom-out');

        // Setup the click event listeners and zoom-in or out according to the clicked element
        google.maps.event.addDomListener(controlUIzoomIn, 'click', function () {
            map.setZoom(map.getZoom() + 1)
        });
        google.maps.event.addDomListener(controlUIzoomOut, 'click', function () {
            map.setZoom(map.getZoom() - 1)
        });
    }

    var zoomControlDiv = document.createElement('div');
    var zoomControl = new CustomZoomControl(zoomControlDiv, map);


    function initMap() {
        markers = new Array();
        mapCount = 0;
        infowindow = new google.maps.InfoWindow();
        locations = new Array();
        var marker, i;

        singlePtsAR = new Array();

        jsonPts(jsonMapInfo);
    }
    initMap();

    function jsonPts(inFile, inFolder, filterIt) {

        if (filterIt >= 0) {
            thsFilter = true;
            mapFile = "shopping.json";
            mapCount = filterIt;
            //console.log("filter on");
        } else {
            thsFilter = false;
            mapFile = inFile[mapCount][0];
            //console.log("filter off");
        }

        //console.log("map count " + inFile[mapCount][0]);

        var points = $.getJSON("/js/amenities/" + mapFile, function () {
        }).done(function (data) {
            $.each(data, function (key, val) {
                var singlePtAR = [];
                singlePtAR.push(val.name);
                latlongs = val.Point.coordinates;
                latlon = latlongs.split(",");
                singlePtAR.push(latlon[0]);
                singlePtAR.push(latlon[1]);
                singlePtAR.push(inFile[mapCount][1]);
                singlePtsAR.push(singlePtAR);
            });
            locations.push(singlePtsAR);

            mapCount++;
            AutoCenter();
            if (mapCount !== jsonMapInfo.length && !thsFilter) {
                jsonPts(jsonMapInfo);
            } else {
                allPoints();
            }
        }).fail(function () {
            console.log("error");
        }).always(function () {
        });
    }

    function allPoints() {
        markerCount = 0;
        for (a = 0; a < singlePtsAR.length; a++) {
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(singlePtsAR[a][2], singlePtsAR[a][1]),
                map: map,
                icon: {
                    url: "img/" + singlePtsAR[a][3],
                    scaledSize: new google.maps.Size(15, 20)
                }
            });
            markers.push(marker);

            google.maps.event.addListener(marker, 'click', (function (marker, a) {
                return function () {
                    infowindow.setContent(singlePtsAR[a][0]);
                    infowindow.open(map, marker);
                }
            })(marker, a));
        }
        AutoCenter();
    }

    function AutoCenter() {
        //  Create a new viewpoint bound
        var bounds = new google.maps.LatLngBounds();
        //  Go through each...
        $.each(markers, function (index, marker) {
            bounds.extend(marker.position);
        });
        //  Fit these bounds to the map
        map.fitBounds(bounds);
    }

    $(window).resize(AutoCenter);
});
