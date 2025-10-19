import { useState } from 'react'
import {
  Container,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Box,
  Typography,
  Paper,
  Tabs,
  Tab
} from '@mui/material'
import CalculateIcon from '@mui/icons-material/Calculate'
import LoanCalculator from './components/LoanCalculator'

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
})

function App() {
  const [tabValue, setTabValue] = useState(0)

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          bgcolor: 'background.default',
          py: { xs: 2, sm: 3, md: 4 },
          px: { xs: 2, sm: 3 },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            width: '100%',
            maxWidth: '1400px',
            mx: 'auto'
          }}
        >
          {/* 標題區域 */}
          <Box sx={{ textAlign: 'center', mb: { xs: 3, md: 4 } }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, mb: 2 }}>
              <CalculateIcon sx={{ fontSize: { xs: 36, md: 48 }, color: 'primary.main' }} />
              <Typography
                variant="h3"
                component="h1"
                fontWeight="bold"
                color="primary"
                sx={{ fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3rem' } }}
              >
                貸款計算器
              </Typography>
            </Box>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
            >
              輕鬆計算您的貸款方案，了解每月還款金額與利息明細
            </Typography>
          </Box>

          {/* 主要內容區域 */}
          <Paper
            elevation={3}
            sx={{
              overflow: 'hidden',
              borderRadius: 2,
              mx: 'auto'
            }}
          >
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant="fullWidth"
              sx={{
                borderBottom: 1,
                borderColor: 'divider',
                bgcolor: 'primary.main',
                '& .MuiTab-root': {
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontWeight: 'bold',
                  fontSize: { xs: '0.875rem', sm: '1rem' }
                },
                '& .Mui-selected': {
                  color: 'white !important'
                },
                '& .MuiTabs-indicator': {
                  backgroundColor: 'white',
                  height: 3
                }
              }}
            >
              <Tab label="本息平均攤還" />
              <Tab label="本金平均攤還" />
            </Tabs>

            <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
              <LoanCalculator repaymentType={tabValue === 0 ? 'equal-payment' : 'equal-principal'} />
            </Box>
          </Paper>

          {/* 頁尾說明 */}
          <Box sx={{ mt: { xs: 3, md: 4 }, textAlign: 'center' }}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
            >
              註：本計算器僅供參考，實際貸款條件請以金融機構核定為準
            </Typography>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  )
}

export default App
