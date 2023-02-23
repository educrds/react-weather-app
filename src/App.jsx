import { Navbar, useTheme } from './components/Navbar';
import { GlobalStyle } from './styles/globalStyle';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Weather from './components/WeatherDescription';
import Dropdowns from './components/Dropdowns';


function App() {
  const [theme, toggleTheme] = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <Navbar onClick={toggleTheme} theme={theme} />
        <Dropdowns />
        <Routes>
          <Route path='/react-weather-app/' element={<></>} />
          <Route path='/react-weather-app/:city' element={<Weather />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}


export default App;
