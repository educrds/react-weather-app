import wind from '../../assets/imgs/weather-icons/wind.png';
import wet from '../../assets/imgs/weather-icons/wet.png';
import temperatureMinus from '../../assets/imgs/weather-icons/thermometer-minus.png';
import temperaturePlus from '../../assets/imgs/weather-icons/thermometer-plus.png';
import { TextContainer, Title, Tag, SmallTitle, WeatherSquare, TemperatureContainer, WeatherContainer, Row,
} from './style';
import { TbTemperatureCelsius } from 'react-icons/tb';
import { useState, useEffect } from 'react';
const capitalizeFirstLetter = string => string.charAt(0).toUpperCase() + string.slice(1);
const weekDay = new Date().toLocaleDateString('pt-BR', {
  weekday: 'long',
});
const hourDay = new Date().getHours();

const Weather = ({ weatherData }) => {
  const [imageWeather, setImageWeather] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await import(
          `../../assets/imgs/weather-icons/${weatherData.weather[0].icon}.svg`
        );
        setImageWeather(response.default);
      } catch (err) {
        console.log(err);
      }
    };

    fetchImage();
  }, [weatherData]);

  return (
    <>
      <TextContainer>
        <SmallTitle>
          {capitalizeFirstLetter(weekDay)}, {hourDay}h.
        </SmallTitle>
        <Title>{weatherData.name}</Title>
        <Tag>
          <SmallTitle>{capitalizeFirstLetter(weatherData.weather[0].description)}</SmallTitle>
        </Tag>
        <img src={imageWeather} alt='current weather icon' />
      </TextContainer>
      <WeatherContainer>
        <WeatherSquare>
          <Title>
            {Math.round(weatherData.main.temp)} <TbTemperatureCelsius />
          </Title>
          <Row>
            <Temperature icon={temperatureMinus} label='Mín' value={weatherData.main.temp_min} />
            <Temperature icon={temperaturePlus} label='Máx' value={weatherData.main.temp_max} />
          </Row>
        </WeatherSquare>
        <WeatherSquare>
          <Row className='column'>
            <Wind value={Math.imul(weatherData.wind.speed, 3.6)} />
            <Wet value={weatherData.main.humidity} />
          </Row>
        </WeatherSquare>
      </WeatherContainer>
    </>
  );
};

const Wind = ({ value }) => {
  return (
    <TemperatureContainer>
      <img src={wind} alt='wind icon' />
      <div>
        <SmallTitle>Vento</SmallTitle>
        <p>
          {value} <span>km/h</span>
        </p>
      </div>
    </TemperatureContainer>
  );
};

const Wet = ({ value }) => {
  return (
    <TemperatureContainer>
      <img src={wet} alt='wind icon' />
      <div>
        <SmallTitle>Umidade</SmallTitle>
        <p>
          {value} <span>%</span>
        </p>
      </div>
    </TemperatureContainer>
  );
};

const Temperature = ({ label, value, icon }) => {
  return (
    <TemperatureContainer>
      <img src={icon} alt='temperature icon' />
      <div>
        <SmallTitle>{label}</SmallTitle>
        <p>
          {Math.round(value)} <TbTemperatureCelsius />
        </p>
      </div>
    </TemperatureContainer>
  );
};

export default Weather;
