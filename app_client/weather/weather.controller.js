(function() {

    angular
        .module('darkSkyApp')
        .controller('weatherCtrl', weatherCtrl);

    weatherCtrl.$inject = ['$scope', 'SelectedData', 'DarkskyWeather'];

    function weatherCtrl($scope, SelectedData, DarkskyWeather) {

        var vm = this;
        console.log(window.location);

        vm.content = "Geolocation App";

        vm.selectedDepartureICAO = "";
        vm.selectedArrivalICAO = "";
        vm.selectedWeight = "";

        //check selected Departure
        if (SelectedData.selectedDepartureICAO !== null) {
            vm.selectedDepartureICAO = "";
        }
        
        //check selected Arrival
        if (SelectedData.selectedArrivalICAO !== null) {
            vm.selectedArrivalICAO = "";
        }

  
        vm.getDepartureWeather = function() {
            
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showLocation);
            }
            else {
                console.log('Geolocation is not supported by this browser.');
            }
            
            
            function showLocation(position) {
                var latitude = position.coords.latitude;
                console.log("latitude: " + latitude);
              
                //document.getElementById('latitude')
                //	.setAttribute('value', latitude);
                var longitude = position.coords.longitude;
                console.log("longitude: " + longitude);
                
            
            //var lat = 5;
           // console.log(lat);
            //var lon = 3;
           // console.log(lon);            

            DarkskyWeather.getWeather(latitude, longitude)
                .then(function(response) {
                    vm.departureWeather = response.data;
                    console.log(vm.departureWeather);
                })
                .catch(function(e) {
                    console.log(e);
                });
        }
    };    

        //call services
        vm.getDepartureWeather();
 

    }

})();
