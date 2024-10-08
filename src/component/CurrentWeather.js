import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { api_key, url } from './ApiInfo';
import Mausam from './assets/Mausam.png'
import Hashedin from './assets/logo-hashedin.png'

const CurrentWeather = () =>{
    const [location,setLocation] = useState({latitude:'28.644800', longitude:'77.216721'}); // New Delhi is default
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);
    const [unit, setUnit] = useState('C');
    const navigate = useNavigate();

    useEffect(()=> {
        const storedWeather = localStorage.getItem('weatherData');
        if(storedWeather){
            setWeather(JSON.parse(storedWeather));
        } else {
            getCurrentLocation();
        }
    }, []);

    const getCurrentLocation = () => {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude} = position.coords;
                    setLocation({latitude, longitude});
                }
            )
        }

    } 

    useEffect(() => {
        getCurrentLocation();
    }, [location.latitude, location.longitude]);

    useEffect(() =>{
        const fetchCurrentWeather = async () => {
            try {
               const response = await axios.get(`${url}/current.json?key=${api_key}&q=${location.latitude},${location.longitude}`);
                setWeather(response.data);
                localStorage.setItem('weatherData', JSON.stringify(response.data));
            } catch(error) {
                setError(error.message);
            }
        };
        fetchCurrentWeather();
    },[location.latitude, location.longitude]);


    if(error){
        return <p> Error : {error} </p>
    }

    if(!weather){
        return <p style={{textAlign: 'center'}}> Loading Weather Data .....</p>
    }

    const toggleUnit = () => {
        setUnit(unit === 'C' ? 'F' : 'C');
    };

    return (
        <div className='weather-app'>
            <div className='header-container'>
                <img src={Mausam} alt="mausam" className='header-image'/>
                <h2 className='by-header'>By</h2>
                <img src={Hashedin} alt="hashedin" className='header-image2'/>
            </div>
            
            <button className={ `unit-toggle ${unit === 'C' ? 'inactive':''}`} onClick={toggleUnit}>
                {unit === 'C' ? 'Switch to Fahrenheit' : 'Switch to Celsius'}
            </button>


            {weather && (   
                <>
                <div className='weather-info'>
                    <p>{weather.location.name}</p>
                    <p>{weather.current.condition.text}</p>
                    <p>
                        {unit === 'C'
                            ? `${weather.current.temp_c} °C`
                            : `${weather.current.temp_f} °F`}
                    </p>
                    <img className = "weather-icon" src={weather.current.condition.icon} alt="weather icon" />
                </div>
                <div className='forecast-buttons'>
                <button onClick={() => navigate(`/forecast/${weather.location.name}`)}>View 5-Day Forecast</button>
                <button onClick={() => navigate(`/forecast/hourly/${weather.location.name}`)}>Hourly Forecast</button>
                </div>
                </> 
            )}

            <div className='forecast-buttons'>
                <button onClick={() => navigate('/search')}> Search By City </button>
            </div>
          
        </div>
    );
}
export default CurrentWeather;