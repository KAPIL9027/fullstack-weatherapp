

const city = document.querySelector('[city]');
const highTemp = document.querySelector('[high-temp]');
const lowTemp = document.querySelector('[low-temp]');
const feelsLikeTemp = document.querySelector('[feelslike-temp]');
const temperature = document.querySelector('[temp]');
const description = document.querySelector('[description]');
const weatherImage = document.querySelector('.weather-image');
const year = document.querySelector('.year');
const month = document.querySelector('[month]');
const dateWeather = document.querySelector('[date]');
const header = document.querySelector('h2');
const content = document.querySelector('.weather-content');
const API_Key = content.id;
const requiredData = city.id;
const makeGeocodingRequests = async ()=>
{
    try
    {
        const res = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${requiredData}&limit=5&appid=${API_Key}`);
        return {
            latitude: res.data[0].lat,
            longitude: res.data[0].lon
        };
    }

    catch(e)
    {
        console.log(e);
        // city.innerText = 'Oops, wrong city or state!!!';
        header.innerHTML = '<span>Oops, wrong city or state name!!!</span>';
        weatherImage.src = "/weather.png";
        return;
    }
    
}

const convertToCelsius = (temp)=>
{
    return Math.round(Math.abs((273.15 - temp)));
}
const makeWeatherRequest = async ()=>
{
     const coordinates = makeGeocodingRequests();
     
        const lati = (await coordinates).latitude;
        const longi = (await coordinates).longitude;
    

    const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${longi}&appid=${API_Key}`);
    console.log(res.data);
    city.innerText = res.data.name;
    highTemp.innerText = convertToCelsius(res.data.main.temp_max);
    lowTemp.innerText = convertToCelsius(res.data.main.temp_min);
     temperature.innerHTML = `${convertToCelsius(res.data.main.temp)}<span>&deg;</span>C`;
     feelsLikeTemp.innerText = convertToCelsius(res.data.main.feels_like);
     description.innerText = res.data.weather[0].description;
     const imageId = res.data.weather[0].icon;
     const url = `https://openweathermap.org/img/w/${imageId}.png`;
     weatherImage.src = url;
     const date = new Date(res.data.dt*1000);
     year.innerText = date.getFullYear();
     month.innerText = date.toLocaleString('en-us',{month: 'long'});
     console.log(date.getDate());
     dateWeather.innerText = date.getDate();

}

    makeWeatherRequest();






