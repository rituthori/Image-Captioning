import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Components/Home'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

function App() {

  const theme = createTheme({
    palette: {
      primary: {
        main: red[500],
      },
      mode: 'dark'
    },
  });

  return (
    <>
      {/* <ThemeProvider theme={theme}> */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
      {/* </ThemeProvider> */}
    </>
  );
}

export default App;
