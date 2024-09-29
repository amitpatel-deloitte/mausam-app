import React, { useState, useEffect} from 'react'
import axios from 'axios';
import { api_key, url } from './ApiInfo';

const preDefinedCities = [
    'New Delhi',
    'Mumbai',
    'Kolkata',
    'Bangalore',
    'Pune',
    'Chennai',
    'Varanasi',
    'Vizag',
    'Jaipur',
    'Lucknow',
    'Gurugram'
]

function SearchCity() {
    const [city, setCity] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [cityWeather, setCityWeather] = useState(null);
    const [error, setError] = useState(null);


    const handleInput = (input) => {
        const inputValue = input.target.value;
        setCity(inputValue);
        if(inputValue.length>0){
            const filteredCities = preDefinedCities.filter((city) =>
                city.toLowerCase().startsWith(inputValue.toLowerCase())
            )
            setSuggestions(filteredCities);
        }else{
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (cityName) => {
        setCity(cityName);
        setSuggestions([]);
        searchWeatherByCity(cityName);
    };

    const searchWeatherByCity = async (cityName) => {
                try {
                   const response = await axios.get(`${url}/current.json?key=${api_key}&q=${city}`);
                    setCityWeather(response.data);
                } catch(error) {
                    console.error('Error fetching data', error);
                    setError('Error fetching weather data..');
                }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        searchWeatherByCity(city);
    };

  return (
    <div className='search-container'>
      <form onSubmit={handleSearch}>
        <input 
        className='search-bar'
        type = "text"
        value={city}
        onChange={handleInput}
        placeholder='Enter City Name'
        autoComplete='off' />
        </form>
      {suggestions.length > 0 && (
        <div className='suggestions-container'>
        <ul className='suggestions-list'>
            {suggestions.map((suggestions, index) => (
                <li key={index} onClick={() => handleSuggestionClick(suggestions)}>{suggestions}</li>
            ))}
        </ul>
        </div>
      )}
      {cityWeather && cityWeather.location && cityWeather.current && (
      <div className='city-weather-info'>
        <h3>{cityWeather.location.name}</h3>
        <p>Temperature : {cityWeather.current.temp_c}°C</p>
        <p>Condition: {cityWeather.current.condition.text}</p>
        <img src={cityWeather.current.condition.icon} alt="weather-icon" className="weather-icon"/>
      </div>
      )}
    </div>
  )
}

export default SearchCity;
