const cors = '//cors-anywhere.herokuapp.com/'
const apiPath = 'https://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = 'aa826df0de5de950550d6fd80a67bae2';
const host = 'community-open-weather-map.p.rapidapi.com'
const temperature = document.getElementById('temp');
const tempDesc = document.getElementById('tempDesc');
const humid = document.getElementById('humid');
const wind = document.getElementById('wind');
const city = document.getElementById('city');
const card = document.getElementById('card');
const errorText = document.getElementById('error');
const locationEl =  document.getElementById('location');
const prevEl =  document.getElementById('prevEl');
let weatherData = {};
const weatherArray = []
const today = new Date();
const date = String(today.toDateString());

document.getElementById('date').innerHTML = date


function submit() {
  const formObject = document.getElementById('formData');
  const inputname = formObject.elements.inputName.value
  if (inputname) {
    errorText.style.display = 'none';
    getWeatherData(inputname)
    locationEl.innerText = inputname;
    formObject.reset()
  } else {
    errorText.style.display = 'block';
    formObject.reset()
  }
}

function getWeatherData(inputname) {
  const settings = {
    async: true,
    crossDomain: true,
    url: `${cors}${apiPath}${inputname}&appid=${apiKey}`,
    method: "GET",
    headers: {
      "x-rapidapi-host": host,
      "x-rapidapi-key": apiKey
    }
  }

  $.ajax(settings).done(function (response) {
    console.log(response);
    weatherData = response;
    temperature.innerText = response.main.temp + '°'
    tempDesc.innerText = response.weather[0].description
    humid.innerText = response.main.humidity + '%'
    wind.innerText = response.wind.speed + ' k/H'
    city.innerText = response.name
    card.style.display = 'block'
  });
}

function saveData() {
  weatherArray.push(weatherData);
  localStorage.setItem('weatherArray', JSON.stringify(weatherArray))
}

function getSavedData() {
  const  savedData = localStorage.getItem('weatherArray')
  const  array = savedData ? JSON.parse(savedData) : [];
  if (array.length < 1) {
    document.getElementById('noContent').style.display = 'block'
  } else {
        document.getElementById('noContent').style.display = 'none'
  }
  for(let i = 0; i < array.length; i++) {
     prevEl.innerHTML = `<div class="card>
      <div class="row justify-content-between">
        <div class="col-sm-4">
          <div class="text-center">
             <span class="temp">${array[i].main.temp + '°'}</span> <br/>
              <span class="tempDesc">${array[i].weather[0].description}</span>
          </div>
          <div class="d-flex mt-2 justify-content-between">
               <div class="weather-info">
                <span class="desc">HUMIDITY</span> <br>
                <span class="value">${ array[i].main.humidity + '%'}</span>
              </div>
               <div class="weather-info">
                <span class="desc">WIND</span> <br>
                <span class="value">${array[i].wind.speed + ' k/H'}</span>
              </div>
          </div>
        </div>
          <diV class="col-sm-4">
             <span id="city" class="text-white text-lg mt-5 d-block">${array[i].name}</span>
          </diV>
      </div>
      </div>`
  }
}
