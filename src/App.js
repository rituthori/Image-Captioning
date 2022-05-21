import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Components/Home'
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

const darkTheme = createTheme({

  palette:{
    type: 'dark',
  }
});

function App() {

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
