

var x = document.getElementById("demo");
var y = document.getElementById("temp");
var lowC;
var highC;
var currentC;
var lowF;
var highF;
var currentF;
var weather;
var weatherDetail;
var weatherImg = document.getElementById("weather-image");
var tempState = 'Celsius';
var z = document.getElementById("console-event");
var city = document.getElementById("city");
var curTemp = document.getElementById("cur-temp");


//function call generates coordinates and also calls weather inside of function to generate upon opening the app
getLocation();


function applyImage(){ //in charge of the image with respec to the data.weather.description post-getJSON
  if (weather == 800){ //clear has time function
    weatherImg.src = 'http://www.iconsdb.com/icons/preview/white/sun-xxl.png';
  }
  else if(weather <= 804 && weather > 800){ //few clouds has time function
    weatherImg.src = 'http://justa-lab.com/img/logo-weather.png';
  }
  else if (weather < 300){ //thunderstorm
    weatherImg.src = 'http://www.iconsdb.com/icons/preview/white/cloud-lighting-xxl.png';
  }
  else if(weather < 511){ //rain
    weatherImg.src = 'http://www.iconsdb.com/icons/preview/white/rain-xxl.png';
  }
  else if(weather == 511){ //snow
    weatherImg.src = 'http://www.iconsdb.com/icons/preview/white/snow-xxl.png';
  }
  else if(weather < 600){ //drizzle/rain
    weatherImg.src = 'http://www.iconsdb.com/icons/preview/white/rain-xxl.png';
  }
  else if(weather < 700){ //snow
    weatherImg.src = 'http://www.iconsdb.com/icons/preview/white/snow-xxl.png';
  }
  else if(weather < 800){
    weatherImg.src = 'http://icons.iconarchive.com/icons/custom-icon-design/weather/256/fog-icon.png';
  }
  else{
    weatherImg.src = 'https://vignette4.wikia.nocookie.net/40k/images/7/77/Imperial_skull_white.png';
  }
}



  $(function() { //the toggle "checkbox" function with respect to HTML. This switches from Celsius to Fahrenheit back and forth
    $('#switch').change(function() {
      
      if(tempState == 'Celsius'){ //Fahrenheit to Celsius
      	tempState = 'Fahrenheit';
      	y.innerHTML = "L:" + lowF.toPrecision(3) + "ºF H: " + highF.toPrecision(3) + 'ºF<br>Weather: ' + weatherDetail;
      curTemp.innerHTML = currentF.toPrecision(3) + "ºF";
      }
      
      else{ //Celsius to Fahrenheit
      	tempState = 'Celsius';
      	y.innerHTML = "L:" + lowC + "ºC H: " + highC + 'ºC<br>Weather: ' + weatherDetail;
      curTemp.innerHTML = currentC.toPrecision(3) + "ºC";
      }

      
      //z.innerHTML = tempState; //changes whether or not the word below the toggle-box is Celsius or Fahrenheit
    })
  })


function getLocation() { //uses HTML5 geolocation to generate coordinates
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred."
            break;
    }
}

function showPosition(position) {
	var tem;
  
  //using getJSON to acquire weather data. seems redundant with the jquery change function for the toggle-box, but this is the initializer. I might put this in another function
	$.getJSON('https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat='+ position.coords.latitude + '&lon='+position.coords.longitude+'&appid=ee30c856af8d325582232bd6cba32d42',
		function(data){
			lowC = data.main.temp_min - 273.15;
			highC = data.main.temp_max - 273.15;
      currentC = data.main.temp - 273.15;
			lowF = (lowC * 1.8) + 32;
			highF = (highC * 1.8) + 32;
      currentF = (currentC * 1.8) + 32;
      weather = data.weather[0].id;
      weatherDetail = data.weather[0].description;
      city = data.name;
    
			y.innerHTML = "L:" + lowC + "ºC H: " + highC + 'ºC<br>Weather: ' + weatherDetail;
      curTemp.innerHTML = currentC.toPrecision(3) + "ºC";
    
    applyImage();
    
      
		});


    //displaying the coordinates
   /* x.innerHTML = "Latitude: " + position.coords.latitude.toPrecision(4) + 
    "<br>Longitude: " + position.coords.longitude.toPrecision(4) + '<br> Your Local Data';*/
}
