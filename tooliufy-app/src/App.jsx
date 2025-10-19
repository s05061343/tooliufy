import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import {
  ThemeProvider,
  createTheme,
  CssBaseline
} from '@mui/material'
import HomePage from './pages/HomePage'
import CalculatorPage from './pages/CalculatorPage'

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Microsoft JhengHei"',
      '"微軟正黑體"',
    ].join(','),
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
      xxl: 1920,  // 自定義斷點: Full HD
      '2k': 2560,  // 自定義斷點: 2K
      '4k': 3840,  // 自定義斷點: 4K
    },
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/calculator" element={<CalculatorPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
