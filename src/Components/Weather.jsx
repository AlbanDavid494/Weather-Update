import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/png/search.png'
import clear_icon from '../assets/png/clear.png'
import cloud_icon from '../assets/png/cloud.png'
import drizzle_icon from '../assets/png/drizzle.png'
import humidity_icon from '../assets/png/humidity.png'
import snow_icon from '../assets/png/snow.png'
import rain_icon from '../assets/png/rain.png'
import wind_icon from '../assets/png/wind.png'

function Weather() {

    const inputRef = useRef()

const [IsWeatherData, setIsWeatherData] = useState(false)

const search = async (city) => {
    if(city === ""){
        alert("Enter City Name")
        // to stop the function
        return;
    }
    try {
        const url = `http://api.weatherapi.com/v1/forecast.json?key=a5124d1f8ac246eb83765051252601&q=${city}`;
        // ${import.meta.env.VITE_APP_ID}

        const response = await fetch(url)
        const data = await response.json()

if(!response.ok){
    alert(`${city} not found`)
    return;
}


        console.log(data)
        setIsWeatherData({
            humidity: data.current.humidity,
            wind_kph: Math.floor(data.current.wind_kph),
            temperature: Math.floor(data.current.temp_c),
            name: data.location.name,
            country: data.location.country,
            localTime: data.location.localtime,
            region: data.location.region,
            text: data.current.condition.text,
            icon: data.current.condition.icon
        })
    } catch (error) {
        setIsWeatherData(false)
        console.error(error)
    }
}


useEffect(() => {
    search("Nigeria")
}, [])

  return (
    <section className='weather'>
      
<div className="search-bar">
    <input type="text" ref={inputRef} placeholder='Search' name="" id="" />
    <img src={search_icon}alt="search-img" onClick={() => search(inputRef.current.value)} />
</div>

{
    IsWeatherData ? <>
    <img src={IsWeatherData.icon} alt=""  className='weather-icon' />

<p className='text'>{IsWeatherData.text}</p>

<p className='temperature'>{IsWeatherData.temperature}&deg;c </p>
<p className='location'>{IsWeatherData.name}, {IsWeatherData.country}</p>
<span className='region'>{IsWeatherData.region}</span>
<span className='date'>Date/time: {IsWeatherData.localTime}</span>

<div className="weather-data">
    <div className="col">
        <img src={humidity_icon} alt="" />
        <div>
            <p>{IsWeatherData.humidity}%</p>
            <span>humidity</span>
        </div>
    </div>

    <div className="col">
        <img src={wind_icon} alt="" />
        <div>
            <p>{IsWeatherData.
wind_kph}km/h</p>
            <span>wind speed</span>
        </div>
    </div>
</div>
    </> : <>
    <img src={IsWeatherData.icon} alt=""  className='weather-icon' />

{/* <p className='text'>can't find</p> */}

<p className='temperature'>0 &deg;c </p>
<p className='location'> {IsWeatherData.country}</p>
<span className='region'>can't find</span>
<span className='date'>Date/time: No date</span>

<div className="weather-data">
    <div className="col">
        <img src={humidity_icon} alt="" />
        <div>
            <p>0 %</p>
            <span>humidity</span>
        </div>
    </div>

    <div className="col">
        <img src={wind_icon} alt="" />
        <div>
            <p>0 km/h</p>
            <span>wind speed</span>
        </div>
    </div>
</div>
    </>
}

    </section>
  )
}

export default Weather
