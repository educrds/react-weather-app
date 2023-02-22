// Importação dos ícones e componentes do estilo
import windIcon from '../../assets/imgs/weather-icons/wind.png';
import wetIcon from '../../assets/imgs/weather-icons/wet.png';
import { TextContainer, Title, Tag, SmallTitle, Square, TemperatureContainer, WeatherContainer, Row, ErrorSquare } from './style';

// Importação de componentes e hooks do React e funções auxiliares
import { TbTemperatureCelsius } from 'react-icons/tb';
import { MdError } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { weekDay, getHourFromDate } from '../../utils';
import { fetchWeatherdata } from '../../services/configApi';

// Componente principal Weather
const Weather = () => {
  // Estado para armazenar os dados do clima
  const [weatherData, setWeatherData] = useState(null);
  // Recebe o parâmetro 'city' da URL
  const { city } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchWeatherdata(city);
      setWeatherData(data);
    };
    fetchData();
  }, [city]);

  // Renderiza o componente Weather apenas quando 'weatherData' existir
  return weatherData ? (
    <>
      <TextContainer>
        <SmallTitle>
          {weekDay}, {getHourFromDate(weatherData?.location.localtime)}h.
        </SmallTitle>
        <Title>{city}</Title>
        <img src={weatherData?.current.condition.icon} alt='current weather icon' />
        <Tag>
          <SmallTitle>{weatherData?.current.condition.text}</SmallTitle>
        </Tag>
      </TextContainer>
      <WeatherInfos value={weatherData} />
    </>
  ) : (
    <ErrorMessage />
  );
};

const ErrorMessage = () => (
  <ErrorSquare>
    <SmallTitle>
      <MdError />
      Cidade não encontrada!
    </SmallTitle>
  </ErrorSquare>
);

// Componente WeatherInfos que recebe os dados do clima como propriedade
const WeatherInfos = ({ value }) => (
  <WeatherContainer>
    <Square>
      <Title>
        {Math.round(value?.current.temp_c)} <TbTemperatureCelsius />
      </Title>
      <Temperature label='Sensação térmica' value={value?.current.feelslike_c} />
    </Square>
    <Square>
      <Row className='column'>
        <Wind value={value} />
        <Wet value={value} />
      </Row>
    </Square>
  </WeatherContainer>
);

// Componente Wind que recebe os dados do clima como propriedade
const Wind = ({ value }) => (
  <TemperatureContainer>
    <img src={windIcon} alt='wind icon' />
    <div>
      <SmallTitle>Vento</SmallTitle>
      <p>
        {value?.current.wind_kph} <span>km/h</span>
      </p>
    </div>
  </TemperatureContainer>
);

// Componente Wet que recebe os dados do clima como propriedade
const Wet = ({ value }) => (
  <TemperatureContainer>
    <img src={wetIcon} alt='wind icon' />
    <div>
      <SmallTitle>Umidade</SmallTitle>
      <p>
        {value?.current.humidity} <span>%</span>
      </p>
    </div>
  </TemperatureContainer>
);

// Componente Temperature que recebe uma label e um valor de temperatura como propriedades
const Temperature = ({ label, value }) => (
  <div>
    <SmallTitle>{label}</SmallTitle>
    <SmallTitle>
      {Math.round(value)} <TbTemperatureCelsius />
    </SmallTitle>
  </div>
);

export default Weather;
