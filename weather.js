
const city =  document.getElementById('city')
const locationDate = document.getElementById('date')
const tempImg = document.getElementById('tempImg')
const feelsLike = document.getElementById('feelsLike')
const humidity = document.getElementById('humidity')
const wind = document.getElementById('wind')
const ppt = document.getElementById('ppt')
const temp = document.getElementById('temp')
const tempMax = document.getElementsByClassName('tempMax')
const tempMin = document.getElementsByClassName('tempMin')
const hourlyTemp = document.getElementsByClassName('hourlyTemp')
const dailyDays = document.getElementsByClassName('dailyDays')
const hourlyDays = document.getElementsByClassName('hourlyDays')
const hourlyTime = document.getElementsByClassName('hourlyTime')
const inputText = document.getElementById('inputText')
const units = document.getElementById('units')
const select = document.getElementById('selectDays')
const faren = document.getElementById('faren')
const main = document.querySelector('main')
const locationError = document.getElementById('locationError')
const icons = document.getElementsByClassName('icons')
const iconic = document.getElementsByClassName('iconic')



   const weatherCodes = {
        0: "/assets/images/icon-sunny.webp" ,
        1: "/assets/images/icon-sunny.webp" ,
        2:"/assets/images/icon-partly-cloudy.webp"  ,
        3: "/assets/images/icon-overcast.webp" ,
        45: "/assets/images/icon-fog.webp" ,
        48:"/assets/images/icon-fog.webp"  ,
        51:"/assets/images/icon-drizzle.webp"  ,
        53:"/assets/images/icon-drizzle.webp"  ,
        55:"/assets/images/icon-drizzle.webp"  ,
        56:"/assets/images/icon-drizzle.webp"  ,
        57:"/assets/images/icon-drizzle.webp"  ,
        61:"/assets/images/icon-rain.webp"  ,
        63:"/assets/images/icon-rain.webp"  ,
        65:"/assets/images/icon-rain.webp"  ,
        66:"/assets/images/icon-rain.webp"  ,
        67:"/assets/images/icon-rain.webp"  ,
        71:"/assets/images/icon-snow.webp"  ,
        73: "/assets/images/icon-snow.webp" ,
        75: "/assets/images/icon-snow.webp" ,
        77:"/assets/images/icon-snow.webp"  ,
        80:"/assets/images/icon-rain.webp"  ,
        81:"/assets/images/icon-rain.webp"  ,
        82:"/assets/images/icon-rain.webp"  ,
        85:"/assets/images/icon-snow.webp"  ,
        86:"/assets/images/icon-snow.webp"  ,
        95:"/assets/images/icon-storm.webp"  ,
        96:"/assets/images/icon-storm.webp"  ,
        99:"/assets/images/icon-storm.webp" 
    }
   



async function getGeodata() {
  const search = inputText.value.trim()
//   const search = 'tokyo'
 
 const key = '1c74956294ce45b6bf06a906681e8e13'
const url= `https://api.geoapify.com/v1/geocode/search?text=${search}&lang=en&type=city&format=json&apiKey=${key}`
    // const url = `https://nominatim.openstreetmap.org/search?q=${search}&format=jsonv2&addressdetails=1`;
    try {
        const response = await fetch(url)
        if(!response.ok){
            throw new error('Response status: ${response.status}')
        }

        const result = await response.json()
        console.log(result)
        lat = result.results[0].lat
        lon = result.results[0].lon

    city.innerHTML = `${result.results[0].city}, ${result.results[0].country}`

       
       
        getWeather(lat, lon)

    } catch(error) {
        // apiErr()
        console.log(error.message)
    }
}
// getGeodata()


const getWeather = async () => {
    try {
        const url= `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min&hourly=temperature_2m,weather_code&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m`

        const response = await fetch(url )

    const weather = await response.json()
    console.log(weather) 


        let dateOptions = {
            weekday: "long",
            month: "short",
            day: "numeric",
            year: "numeric",
        }

        let datey = new Intl.DateTimeFormat("en-us", dateOptions).format(new Date())
        locationDate.innerHTML = datey

    temp.innerHTML = `${Math.round(weather.current.temperature_2m)}&degC`;

    feelsLike.innerHTML = `${Math.round(weather.current.apparent_temperature)}&degC`
    wind.innerHTML = `${weather.current.wind_speed_10m}km/h`
    humidity.innerHTML = `${weather.current.relative_humidity_2m}%`
    ppt.innerHTML = `${weather.current.precipitation}mmm`
    
   function hourly() {
     for (let h=0; h<=23; h++){ 
      let datey = new Date(weather.hourly.time[h])
       let hour = new Intl.DateTimeFormat("en-US", {hour: "numeric", hour12: true}).format(datey)

    //   let dan = Date.now(datey)
      hourlyTime[h].textContent = hour
      hourlyTemp[h].textContent = Math.round(weather.hourly.temperature_2m[h])
    }
    
    



   }

   
  hourly()
      
    let daily = weather.daily

    for (let i=0; i< 7; i++) {
      let date = new Date(daily.time[i])
      let dayofWeek = new Intl.DateTimeFormat("en-Us", {weekday: "short"}).format(date)

        
      console.log(dayofWeek)
      dailyDays[i].textContent = dayofWeek
      hourlyDays[i].textContent = dayofWeek
      tempMax[i].textContent = Math.round (daily.temperature_2m_max[i])
      tempMin[i].textContent = Math.round(daily.temperature_2m_min[i])
      

        
 


    for(let i=0; i<icons.length; i++) {
        icons[i].src= weatherCodes[weather.daily.weather_code[i]]
    }
    for(let i=0; i<iconic.length; i++) {
        iconic[i].src= weatherCodes[weather.hourly.weather_code[i]]
    }

    tempImg.src= weatherCodes[weather.current.weather_code]






 }



select.addEventListener('change', handleDay, )
function handleDay() {
    console.log('day has been chngaed')

   

}



    } 

    catch(error) {
        // apiErr()
        console.log(error)
    }

    
}



async function stringto (string) {
    const cord = await getCoordinates(string)
}
getWeather()


    function apiErr() {
        main.style.display = 'none'
        locationError.style.display = 'flex'
        locationError.style.fontSize = '25px'


    }

