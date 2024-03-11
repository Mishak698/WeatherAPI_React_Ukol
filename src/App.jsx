import {useState} from "react";

const App = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);


    const getWeatherData = async () => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f2ec3bb93f6a5769697de8723b967323`);
            const data = await response.json();

            if (response.ok) {
                setWeatherData(data);
                setError(null);
            } else {
                setError(data.message || 'City not found');
                setWeatherData(null);
            }
        } catch (err) {
            setError('Something went wrong');
            setWeatherData(null);
        }
    };

    return (
        <div className={"conteiner"}>
            <h1>Weather App</h1>
            <input
                type="text"
                placeholder="Enter city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />
            <button onClick={getWeatherData}>Get Weather</button>

            {error && <p>{error}</p>}

            {weatherData && (
                <div>
                    <h2>{weatherData.name}, {weatherData.sys.country}</h2>
                    <p>Temperature: {Math. round(weatherData.main.temp - 273.15)} °C</p>
                    <p>Weather: {weatherData.weather[0].description}</p>
                    <p>Humidity: {weatherData.main.humidity} %</p>
                    <p>Wind speed: {Math. round(weatherData.wind.speed * 3.6)}km/h</p>
                    <p>Visibility: {Math. round(weatherData.main.visibility)}</p>
                </div>
            )}
        </div>
    );
};

export default App;
