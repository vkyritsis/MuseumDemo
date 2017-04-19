angular.module('ionicApp', ['ionic', 'ionic-material'])



.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('eventmenu', {
            url: "/event",
            abstract: true,
            templateUrl: "templates/event-menu.html"
        })
        .state('eventmenu.home', {
            url: "/home",
            views: {
                'menuContent': {
                    templateUrl: "templates/home.html"
                }
            }
        })

    .state('eventmenu.museumList', {
            url: "/museumList",
            views: {
                'menuContent': {
                    templateUrl: "templates/museumList.html",
                    controller: "museumList"
                }
            }
        })
        .state('eventmenu.Details', {
            url: "/Details/:museumId",
            views: {
                'menuContent': {
                    templateUrl: "templates/Details.html",
                    controller: "detailsController"
                }
            }
        })

    $urlRouterProvider.otherwise("/event/home");
})

.controller('MainCtrl', function ($scope, $ionicSideMenuDelegate) {

        $scope.attendees = [
            {
                firstname: 'Nicolas',
                lastname: 'Cage'
        },
            {
                firstname: 'Jean-Claude',
                lastname: 'Van Damme'
        },
            {
                firstname: 'Keanu',
                lastname: 'Reeves'
        },
            {
                firstname: 'Steven',
                lastname: 'Seagal'
        },
            {
                title: ''
        }
  ];

        $scope.toggleLeft = function () {
            $ionicSideMenuDelegate.toggleLeft();
        };
    })
    .controller('museumList', function ($scope) {

        $scope.museumList = museumObj;
        for (var i = 0; i < museumObj.length; i++) {
            $scope.museumList[i].distance = calculateKms(museumObj[i].Lat, museumObj[i].Long, 37.9684662, 23.728498)
        }

    })
    .controller('detailsController', function ($scope, $stateParams) {

        var isIos = ionic.Platform.isIOS();
        var museumDetails = $.grep(museumObj, function (e) {
            return e.Id == $stateParams.museumId;
        });


        $scope.museum = {
            title: museumDetails[0].Title,
            description: museumDetails[0].Description,
            open: museumDetails[0].OpeningHours.open,
            close: museumDetails[0].OpeningHours.close,
            entrance: museumDetails[0].EntranceFee,
            phoneNumber: museumDetails[0].PhoneNumber,
            email: museumDetails[0].Email,
            website: museumDetails[0].Website,
            address: museumDetails[0].Address,
            photo: museumDetails[0].PhotoUrl,
            lat: museumDetails[0].Lat,
            long: museumDetails[0].Long,
            distance: calculateKms(museumDetails[0].Lat, museumDetails[0].Long, 37.9684662, 23.728498),
            isIos: isIos
        }

        $scope.driveMe = function (lat, long, latA, longA, os) {
            if (os) {

                window.open('http://maps.apple.com/?daddr=' + lat + ',' + long + '&saddr=' + latA + ',' + longA);
            } else {
                window.open('http://maps.google.com/maps?daddr=' + lat + ',' + long + '&saddr=' + latA + ',' + longA);
            }
        }
    });


//calculates distance between two points in km's
function calculateKms(firstLocLat, firstLocLong, secondLocLat, secondLocLong) {
    var p1 = new google.maps.LatLng(firstLocLat, firstLocLong);
    var p2 = new google.maps.LatLng(secondLocLat, secondLocLong);
    return (google.maps.geometry.spherical.computeDistanceBetween(p1, p2) / 1000).toFixed(1);
};