$(document).ready(function() {
  //variable declarations
  var latitude, longitude, temperature, summary, units, fTemp, cTemp, url, icon;
  
  function getWeather(units) {
    
    //GPS geolocation
    navigator.geolocation.getCurrentPosition(function(location){
      latitude = Math.trunc(location.coords.latitude);
      longitude = Math.trunc(location.coords.longitude);
      //this next line gets adds a CORS proxy server to allow codepen to get the Darksky API and gets either Fahrenheir or Celsius, depending on the user's button click
      $.getJSON(getURL(latitude, longitude, units), function(data) {
        temperature = data.currently['temperature'];
        summary = data.currently['summary'];
        icon = data.currently['icon'];
        
        console.log("icon is:" +icon);
        document.getElementById('temperature').innerHTML = temperature;
        document.getElementById('summAnswer').innerHTML = summary;
        document.getElementById('weatherIcon').className = getWeatherIcons(icon);
        console.log("temperature is: " +temperature);
      }) //end getJSON 
    }) //end geolocation
  }  //end getWeather
  
  function getWeatherIcons(icon) {
      var icon = icon.toLowerCase();
      switch(icon) {
        case 'clear-day':
          return 'wi wi-day-sunny'
          break;
        case 'clear-night':
          return 'wi wi-night-clear';
          break;
        case 'rain':
          return 'wi wi-day-rain';
          break;
        case 'snow':
          return 'wi wi-day-snow';
          break;
        case 'sleet':
          return 'wi wi-day-sleet-storm';
          break;
        case 'wind':
          return 'wi wi-day-cloudy-windy';
          break;
        case 'fog':
          return 'wi wi-day-fog';
          break;  
        case 'cloudy':
          return 'wi wi-day-cloudy';
          break;
        case 'partly-cloudy-day':
          return 'wi wi-day-cloudy';
          break;
        case 'partly-cloudy-night':
          return 'wi wi-night-sleet';
          break;
        default:
          return 'wi wi-thermometer';
          break;
          
        
          
      }
  }
  
  function getURL(latitude, longitude, units) {
     return url = 'https://proxy-sauce.glitch.me/https://api.darksky.net/forecast/fed1b0de74a5d2f75fd729fea96424d8/'+latitude+','+longitude+'?units='+units;
  };
  /* --------Event Listeners--------*/
  document.getElementById('celsiusLink').addEventListener('click', function(){
      getWeather('si');
    });
  document.getElementById('fahrenheitLink').addEventListener('click', function(){
    getWeather('us');
  });
  
  document.getElementById('sidebar-btn').addEventListener('click', function() {
    $("#sidebar").toggleClass('visible');
  })
/*-----------End Event Listeners------- */
}); //end jQuery