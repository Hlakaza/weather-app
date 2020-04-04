const cors = '//cors-anywhere.herokuapp.com/'
const apiPath = 'https://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = 'aa826df0de5de950550d6fd80a67bae2';
const host = 'community-open-weather-map.p.rapidapi.com'
const temperature = document.getElementById('temp');
const tempDesc = document.getElementById('tempDesc');
const humid = document.getElementById('humid');
const wind = document.getElementById('wind');
const city = document.getElementById('city');


const today = new Date();
const date = String(today.toDateString());
document.getElementById('date').innerHTML = date
function submit() {
   const formObject = document.getElementById('formData');
   const inputname =  formObject.elements.inputName.value
   if (inputname) {
      getWeatherData(inputname)
      document.getElementById('location').innerText = inputname;
      formObject.reset()
   } else {
      document.getElementById('error').style.display = 'block';
      formObject.reset()
   }
}

function getWeatherData(inputname) {
const settings = {
	"async": true,
	"crossDomain": true,
	"url": `${cors}${apiPath}${inputname}&appid=${apiKey}`,
	"method": "GET",
	"headers": {
			"x-rapidapi-host": host,
		   "x-rapidapi-key": apiKey
	}
}

$.ajax(settings).done(function (response) {
 	console.log(response);
  temperature.innerText = response.main.temp + '°'
  tempDesc.innerText = response.weather[0].description
  humid.innerText = response.main.humidity + '%'
  wind.innerText = response.wind.speed + ' k/H'
  city.innerText = response.name
}); 
}
