import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  IconButton,
  Tooltip
} from '@mui/material'
import {
  Calculate as CalculateIcon,
  Home as HomeIcon
} from '@mui/icons-material'
import LoanCalculator from '../components/LoanCalculator'

function CalculatorPage() {
  const [tabValue, setTabValue] = useState(0)
  const navigate = useNavigate()

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  return (
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
        {/* 返回首頁按鈕 */}
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'flex-start' }}>
          <Tooltip title="返回首頁">
            <IconButton
              onClick={() => navigate('/')}
              sx={{
                bgcolor: 'primary.main',
                color: 'white',
                '&:hover': {
                  bgcolor: 'primary.dark'
                }
              }}
            >
              <HomeIcon />
            </IconButton>
          </Tooltip>
        </Box>

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
  )
}

export default CalculatorPage
