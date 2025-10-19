import { useState } from 'react'
import {
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
  const [tabValue, setTabValue] = useState(0)

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          width: '100vw',
          minHeight: '100vh',
          bgcolor: 'background.default',
          py: { xs: 2, sm: 3, md: 4, xl: 5, xxl: 6 },
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          position: 'relative',
          left: 0,
          right: 0
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: {
              xs: 'calc(100vw - 32px)',
              sm: '600px',
              md: '900px',
              lg: '1200px',
              xl: '1400px',
              xxl: '1600px',
            },
            mx: 'auto',
            px: { xs: 2, sm: 3, md: 4, xl: 5 }
          }}
        >
          {/* 標題區域 */}
          <Box sx={{ textAlign: 'center', mb: { xs: 3, md: 4, xl: 5 } }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: { xs: 2, xl: 3 }, mb: 2 }}>
              <CalculateIcon sx={{ fontSize: { xs: 36, md: 48, xl: 56, xxl: 64 }, color: 'primary.main' }} />
              <Typography
                variant="h3"
                component="h1"
                fontWeight="bold"
                color="primary"
                sx={{ fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3rem', xl: '3.5rem', xxl: '4rem' } }}
              >
                貸款計算器
              </Typography>
            </Box>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{ fontSize: { xs: '0.875rem', sm: '1rem', xl: '1.125rem', xxl: '1.25rem' } }}
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

            <Box sx={{ p: { xs: 2, sm: 3, md: 4, xl: 5 } }}>
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
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default App
