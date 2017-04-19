var myCenter = new google.maps.LatLng(37.9684662, 23.728498);

function initialize() {
    var marker, i;
    var infowindow = new google.maps.InfoWindow();
    var mapProp = {
        center: myCenter,
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
    // set my marker
    var mymarker = new google.maps.Marker({
        position: myCenter,
        animation: google.maps.Animation.DROP,
         icon: 'img/pinman.png'
    });
    mymarker.setMap(map);


    for (var i = 0; i < museumObj.length; i++) {
        // set markers
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(museumObj[i].Lat, museumObj[i].Long),
            animation: google.maps.Animation.DROP
        });

        // display markers
        marker.setMap(map);

        google.maps.event.addListener(marker, 'click', (function (marker, i) {
            var contentString =
                "<div class='custInfo'> <img src=" + museumObj[i].PhotoUrl + "> <a href='#/event/Details/" + museumObj[i].Id + "'>" + museumObj[i].Title + "</a> </div>";
            return function () {
                infowindow.setContent(contentString);
                infowindow.open(map, marker);
            }
        })(marker, i));
    }

}



google.maps.event.addDomListener(window, 'load', initialize);