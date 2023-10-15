// Importação dos ícones e componentes do estilo
import windIcon from '../../assets/imgs/weather-icons/wind.png';
import wetIcon from '../../assets/imgs/weather-icons/wet.png';
import thermometerPlus from '../../assets/imgs/weather-icons/thermometer-plus.png';
import thermometerMinus from '../../assets/imgs/weather-icons/thermometer-minus.png';
import { TextContainer, Title, Tag, SmallTitle, Square, TemperatureContainer, WeatherContainer, Row, ErrorSquare } from './style';

// Importação de componentes e hooks do React e funções auxiliares
import { TbTemperatureCelsius } from 'react-icons/tb';
import { MdError } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { weekDay, getHourFromDate } from '../../utils';
import fetchWeatherdata from '../../services/weatherApi';

// Componente principal Weather
const Weather = () => {
  // Estado para armazenar os dados do clima
  const [weatherData, setWeatherData] = useState(null);
  // Estado para armazenar se ocorreu um erro ao buscar os dados do clima
  const [error, setError] = useState(false);
  // Recebe o parâmetro 'city' da URL
  const { city } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchWeatherdata(city);
        // Verifica se a API retornou dados para a cidade pesquisada
        if (data && data.location) {
          setWeatherData(data);
          setError(false);
        } else {
          setWeatherData(null);
          setError(true);
        }
      } catch (error) {
        console.log(error);
        setWeatherData(null);
        setError(true);
      }
    };
    fetchData();
  }, [city]);

  // Renderiza o componente ErrorMessage se ocorreu um erro ao buscar os dados do clima
  if (error) {
    return <ErrorMessage />;
  }

  // Renderiza o componente Weather apenas quando 'weatherData' existir
  return (
    weatherData && (
      <>
        <TextContainer>
          <SmallTitle>
            {weekDay}, {getHourFromDate(weatherData?.location.localtime)}h.
          </SmallTitle>
          <Title>{city}</Title>
          <Tag>
            <SmallTitle>{weatherData?.current.condition.text}</SmallTitle>
          </Tag>
          <img src={weatherData?.current.condition.icon} alt='current weather icon' />
        </TextContainer>
        <WeatherInfos value={weatherData} />
      </>
    )
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
      <Temperature
        label='Sensação térmica'
        value={value?.current.feelslike_c}
        icon={
          value?.current.feelslike_c > value?.current.temp_c ? thermometerPlus : thermometerMinus
        }
      />
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
const Temperature = ({ label, value, icon }) => (
  <TemperatureContainer>
    <img src={icon} alt='thermometer icon' />
    <div>
      <SmallTitle>{label}</SmallTitle>
      <p>
        {Math.round(value)} <TbTemperatureCelsius />
      </p>
    </div>
  </TemperatureContainer>
);

export default Weather;
