import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { api_key, url } from './ApiInfo';
import { useParams } from 'react-router-dom';

function FiveDayForcast() {
    const {city} = useParams();
    const [forecast, setForecast] = useState(null);

    useEffect(() =>{
        const fetchForcast = async () => {
            try {
               const response = await axios.get(`${url}/forecast.json?key=${api_key}&q=${city}&days=5`);
                setForecast(response.data);
            } catch(error) {
                console.error('Error fetching data', error);
            }
        };
        fetchForcast();
    },[city]);

    return (
        <div className='forcaset-container'>
          <h1 className='forecast-title'>Forecast For {city} </h1>
    
          {forecast && (
            <div className='forecast-container'>
              {forecast.forecast.forecastday.map((day) => (
                <div className='forecast-card' key={day.date}>
                  <h2>{day.date}</h2>
                  <p>{day.day.condition.text}</p>
                  <p>Max Temp: {day.day.maxtemp_c} °C</p>
                  <p>Min Temp: {day.day.mintemp_c} °C</p>
                  <img src={day.day.condition.icon} alt="weather icon" />
                </div>
              ))}
            </div>
          )}
        </div>
      );
}

export default FiveDayForcast;