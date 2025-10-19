import { useNavigate } from 'react-router-dom'
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Container,
  Paper,
  Chip,
  Stack
} from '@mui/material'
import {
  Calculate as CalculateIcon,
  AccountBalance as BankIcon,
  TrendingUp as TrendingUpIcon,
  Speed as SpeedIcon,
  Security as SecurityIcon,
  Analytics as AnalyticsIcon,
  ArrowForward as ArrowForwardIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material'

function HomePage() {
  const navigate = useNavigate()

  const features = [
    {
      icon: <SpeedIcon sx={{ fontSize: 48 }} />,
      title: '即時計算',
      description: '輸入資料後立即顯示結果，無需等待',
      color: '#1976d2'
    },
    {
      icon: <AnalyticsIcon sx={{ fontSize: 48 }} />,
      title: '視覺化圖表',
      description: '多種圖表類型，清楚展示貸款數據',
      color: '#2e7d32'
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 48 }} />,
      title: '精確計算',
      description: '採用標準金融計算公式，結果準確可靠',
      color: '#ed6c02'
    },
    {
      icon: <BankIcon sx={{ fontSize: 48 }} />,
      title: '多種方案',
      description: '支援本息攤還與本金攤還兩種方式',
      color: '#9c27b0'
    }
  ]

  const calculationTypes = [
    {
      title: '本息平均攤還',
      description: '每月繳款金額固定，適合預算穩定的族群',
      icon: <TrendingUpIcon />,
      benefits: ['固定月付金額', '方便預算規劃', '初期利息較高']
    },
    {
      title: '本金平均攤還',
      description: '每月本金固定，利息遞減，總利息較低',
      icon: <CalculateIcon />,
      benefits: ['總利息較少', '月付金逐期遞減', '初期負擔較重']
    }
  ]

  return (
    <Box
      sx={{
        width: '100vw',
        minHeight: '100vh',
        bgcolor: 'background.default',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* 背景裝飾 */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '60vh',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          clipPath: 'ellipse(150% 100% at 50% 0%)',
          zIndex: 0
        }}
      />

      {/* 主要內容 */}
      <Container
        maxWidth={false}
        sx={{
          position: 'relative',
          zIndex: 1,
          maxWidth: { xs: '100%', sm: '600px', md: '900px', lg: '1200px', xl: '1400px' },
          mx: 'auto',
          py: { xs: 4, md: 6, xl: 8 }
        }}
      >
        {/* Hero Section */}
        <Box sx={{ textAlign: 'center', mb: 8, color: 'white' }}>
          <Chip
            label="免費線上工具"
            sx={{
              mb: 3,
              bgcolor: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              fontWeight: 'bold',
              backdropFilter: 'blur(10px)',
              fontSize: { xs: '0.875rem', md: '1rem' }
            }}
          />

          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem', xl: '5.5rem' },
              fontWeight: 900,
              mb: 3,
              background: 'linear-gradient(to right, #fff, #e0e7ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 4px 20px rgba(0,0,0,0.1)'
            }}
          >
            貸款計算器
          </Typography>

          <Typography
            variant="h5"
            sx={{
              fontSize: { xs: '1.125rem', md: '1.5rem', xl: '1.75rem' },
              mb: 5,
              opacity: 0.95,
              maxWidth: '800px',
              mx: 'auto',
              lineHeight: 1.6
            }}
          >
            專業、精準、易用的貸款試算工具
            <br />
            輕鬆掌握您的財務規劃
          </Typography>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="center"
            sx={{ mb: 6 }}
          >
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForwardIcon />}
              onClick={() => navigate('/calculator')}
              sx={{
                py: { xs: 1.5, md: 2 },
                px: { xs: 4, md: 6 },
                fontSize: { xs: '1rem', md: '1.125rem' },
                fontWeight: 'bold',
                borderRadius: 3,
                bgcolor: 'white',
                color: 'primary.main',
                boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                '&:hover': {
                  bgcolor: 'grey.100',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 32px rgba(0,0,0,0.3)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              立即開始計算
            </Button>

            <Button
              variant="outlined"
              size="large"
              onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
              sx={{
                py: { xs: 1.5, md: 2 },
                px: { xs: 4, md: 6 },
                fontSize: { xs: '1rem', md: '1.125rem' },
                fontWeight: 'bold',
                borderRadius: 3,
                borderColor: 'white',
                color: 'white',
                borderWidth: 2,
                '&:hover': {
                  borderWidth: 2,
                  borderColor: 'white',
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)'
                }
              }}
            >
              了解更多
            </Button>
          </Stack>

          {/* 統計數據 */}
          <Grid container spacing={3} sx={{ maxWidth: '800px', mx: 'auto' }}>
            {[
              { number: '100%', label: '免費使用' },
              { number: '2種', label: '計算方式' },
              { number: '即時', label: '顯示結果' }
            ].map((stat, index) => (
              <Grid item xs={4} key={index}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    bgcolor: 'rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: 2,
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: 'bold', mb: 0.5, fontSize: { xs: '1.5rem', md: '2rem' } }}
                  >
                    {stat.number}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9, fontSize: { xs: '0.75rem', md: '0.875rem' } }}>
                    {stat.label}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Features Section */}
        <Box id="features" sx={{ mb: 8 }}>
          <Typography
            variant="h3"
            align="center"
            sx={{
              mb: 2,
              fontWeight: 'bold',
              fontSize: { xs: '2rem', md: '2.5rem', xl: '3rem' }
            }}
          >
            核心功能
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            color="text.secondary"
            sx={{ mb: 6, fontSize: { xs: '1rem', md: '1.125rem' } }}
          >
            強大且易用的功能，讓財務規劃更輕鬆
          </Typography>

          <Grid container spacing={3}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  elevation={0}
                  sx={{
                    height: '100%',
                    border: '2px solid',
                    borderColor: 'divider',
                    borderRadius: 3,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: feature.color,
                      transform: 'translateY(-8px)',
                      boxShadow: `0 12px 24px ${feature.color}30`
                    }
                  }}
                >
                  <CardContent sx={{ textAlign: 'center', p: 4 }}>
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        bgcolor: `${feature.color}15`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: 3,
                        color: feature.color
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Calculation Types */}
        <Box sx={{ mb: 8 }}>
          <Typography
            variant="h3"
            align="center"
            sx={{
              mb: 2,
              fontWeight: 'bold',
              fontSize: { xs: '2rem', md: '2.5rem', xl: '3rem' }
            }}
          >
            計算方式
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            color="text.secondary"
            sx={{ mb: 6, fontSize: { xs: '1rem', md: '1.125rem' } }}
          >
            選擇最適合您的還款方式
          </Typography>

          <Grid container spacing={4}>
            {calculationTypes.map((type, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 4,
                    height: '100%',
                    borderRadius: 3,
                    border: '2px solid',
                    borderColor: 'primary.light',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: 'primary.main',
                      transform: 'scale(1.02)',
                      boxShadow: 6
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Box
                      sx={{
                        bgcolor: 'primary.main',
                        color: 'white',
                        p: 1.5,
                        borderRadius: 2,
                        mr: 2
                      }}
                    >
                      {type.icon}
                    </Box>
                    <Typography variant="h5" fontWeight="bold">
                      {type.title}
                    </Typography>
                  </Box>

                  <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                    {type.description}
                  </Typography>

                  <Stack spacing={1.5}>
                    {type.benefits.map((benefit, idx) => (
                      <Box key={idx} sx={{ display: 'flex', alignItems: 'center' }}>
                        <CheckCircleIcon sx={{ color: 'success.main', mr: 1.5, fontSize: 20 }} />
                        <Typography variant="body2">{benefit}</Typography>
                      </Box>
                    ))}
                  </Stack>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* CTA Section */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 4, md: 6 },
            borderRadius: 4,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            textAlign: 'center'
          }}
        >
          <Typography
            variant="h3"
            sx={{
              mb: 2,
              fontWeight: 'bold',
              fontSize: { xs: '1.75rem', md: '2.5rem' }
            }}
          >
            準備好開始計算了嗎？
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.95, fontSize: { xs: '1rem', md: '1.25rem' } }}>
            立即使用我們的貸款計算器，規劃您的理想未來
          </Typography>
          <Button
            variant="contained"
            size="large"
            endIcon={<ArrowForwardIcon />}
            onClick={() => navigate('/calculator')}
            sx={{
              py: 2,
              px: 6,
              fontSize: '1.125rem',
              fontWeight: 'bold',
              borderRadius: 3,
              bgcolor: 'white',
              color: 'primary.main',
              boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
              '&:hover': {
                bgcolor: 'grey.100',
                transform: 'translateY(-2px)',
                boxShadow: '0 12px 32px rgba(0,0,0,0.3)'
              }
            }}
          >
            開始計算
          </Button>
        </Paper>

        {/* Footer */}
        <Box sx={{ mt: 8, textAlign: 'center', color: 'text.secondary' }}>
          <Typography variant="body2">
            © 2025 貸款計算器 | 本計算器僅供參考，實際貸款條件請以金融機構核定為準
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}

export default HomePage
