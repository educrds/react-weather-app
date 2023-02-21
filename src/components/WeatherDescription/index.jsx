import wind from '../../assets/imgs/weather-icons/wind.png';
import wet from '../../assets/imgs/weather-icons/wet.png';
import temperaturePlus from '../../assets/imgs/weather-icons/thermometer-plus.png';
import {
  TextContainer,
  Title,
  Tag,
  SmallTitle,
  WeatherSquare,
  TemperatureContainer,
  WeatherContainer,
  Row,
} from './style';
import { TbTemperatureCelsius } from 'react-icons/tb';
import { useState, useEffect } from 'react';
import { weekDay, getHourFromDate } from '../../utils';
import { useParams } from 'react-router-dom';
import { fetchWeatherdata } from '../../services/configApi';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);

  const { city } = useParams();

  // Adicionar outras informaçoes de cliam em outros square

  useEffect(() => {
    fetchWeatherdata(city).then((data) => {
      console.log('data', data);
      setWeatherData(data);
    });
  }, [city]);

  return (
    weatherData && (
      <>
        <TextContainer>
          <SmallTitle>
            {weekDay}, {getHourFromDate(weatherData?.location.localtime)}h.
          </SmallTitle>
          <Title>{weatherData?.location.name}</Title>
          <img src={weatherData?.current.condition.icon} alt='current weather icon' />
          <Tag>
            <SmallTitle>{weatherData?.current.condition.text}</SmallTitle>
          </Tag>
        </TextContainer>
        <WeatherInfos value={weatherData} />
      </>
    )
  );
};

const WeatherInfos = ({ value }) => {
  return (
    <WeatherContainer>
      <WeatherSquare>
        <Title>
          {Math.round(value?.current.temp_c)} <TbTemperatureCelsius />
        </Title>
        <Temperature
          icon={temperaturePlus}
          label='Sensação térmica'
          value={value?.current.feelslike_c}
        />
      </WeatherSquare>
      <WeatherSquare>
        <Row className='column'>
          <Wind value={value} />
          <Wet value={value} />
        </Row>
      </WeatherSquare>
    </WeatherContainer>
  );
};

const Wind = ({ value }) => {
  return (
    <TemperatureContainer>
      <img src={wind} alt='wind icon' />
      <div>
        <SmallTitle>Vento</SmallTitle>
        <p>
          {value?.current.wind_kph} <span>km/h</span>
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
          {value?.current.humidity} <span>%</span>
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
