import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { api_key, url } from './ApiInfo';
import { useParams } from 'react-router-dom';

function HourlyForcast() {
    const {city} = useParams();
    const [forecast, setForecast] = useState(null);

    useEffect(() =>{
        const fetchForcast = async () => {
            try {
               const response = await axios.get(`${url}/forecast.json?key=${api_key}&q=${city}&days=1`);
                setForecast(response.data);
            } catch(error) {
                console.error('Error fetching data', error);
            }
        };
        fetchForcast();
    },[city]);

    return (
        <div className='forcaset-container'>
          <h1 className='forecast-title'>Hourly Forecast For {city} </h1>
    
          {forecast && (
            <div>
              {forecast.forecast.forecastday.map((day) => (
                <div key={day.date}>
                    <h2 style={{textAlign: 'center'}}>{day.date}</h2>
                    <div className='forecast-container'>
                        {day.hour.map((hour) => (
                            <div className='forecast-card' key={hour.time_epoch}>
                            <p>{hour.time.split(' ')[1]}</p>
                            <p>{hour.condition.text}</p>
                            <p> Temp: {hour.temp_c} °C</p>
                            <img src={hour.condition.icon} alt="weather icon" />
                          </div>
                        ))}
                    </div>
                </div>
              ))}
            </div>
          )}
        </div>
      );
}

export default HourlyForcast;