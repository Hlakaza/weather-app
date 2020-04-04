const cors = '//cors-anywhere.herokuapp.com/'
const apiPath = 'https://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = 'aa826df0de5de950550d6fd80a67bae2';


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
			"x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
		   "x-rapidapi-key": apiKey
	}
}

$.ajax(settings).done(function (response) {
 	console.log(response);
  

}); 
}
