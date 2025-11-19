import { useNavigate } from 'react-router-dom'
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Grid,
  Container,
  Chip
} from '@mui/material'
import {
  Calculate as CalculateIcon,
  WbSunny as WbSunnyIcon,
  ArrowForward as ArrowForwardIcon,
  Construction as ConstructionIcon
} from '@mui/icons-material'

function HomePage() {
  const navigate = useNavigate()

  const tools = [
    {
      id: 'calculator',
      title: '貸款計算器',
      description: '專業的房貸試算工具，支援本息與本金攤還，輕鬆規劃財務。',
      icon: <CalculateIcon sx={{ fontSize: 40 }} />,
      color: '#1976d2',
      path: '/calculator',
      action: '開始計算',
      highlight: false
    },
    {
      id: 'weather',
      title: '天氣日誌',
      description: '精美的天氣月曆，記錄每日天氣與心情，讓生活更有溫度。',
      icon: <WbSunnyIcon sx={{ fontSize: 40 }} />,
      color: '#f57c00',
      path: '/weather',
      action: '查看日誌',
      highlight: true
    },
    {
      id: 'coming-soon',
      title: '更多功能',
      description: '更多實用工具正在開發中，敬請期待...',
      icon: <ConstructionIcon sx={{ fontSize: 40 }} />,
      color: '#757575',
      path: null,
      action: '敬請期待',
      highlight: false
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
      {/* Background Decoration */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '70vh',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          clipPath: 'ellipse(150% 100% at 50% 0%)',
          zIndex: 0
        }}
      />

      <Container
        maxWidth="lg"
        sx={{
          position: 'relative',
          zIndex: 1,
          py: { xs: 4, md: 8 }
        }}
      >
        {/* Hero Section */}
        <Box sx={{ textAlign: 'center', mb: 8, color: 'white' }}>
          <Chip
            label="v1.0.0"
            sx={{
              mb: 3,
              bgcolor: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              fontWeight: 'bold',
              backdropFilter: 'blur(10px)'
            }}
          />

          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '3rem', md: '5rem' },
              fontWeight: 900,
              mb: 2,
              background: 'linear-gradient(to right, #fff, #e0e7ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 4px 20px rgba(0,0,0,0.1)'
            }}
          >
            Tooliufy
          </Typography>

          <Typography
            variant="h5"
            sx={{
              fontSize: { xs: '1.2rem', md: '1.5rem' },
              mb: 6,
              opacity: 0.9,
              maxWidth: '600px',
              mx: 'auto',
              fontWeight: 300
            }}
          >
            您的個人實用工具箱。
            <br />
            整合貸款試算、天氣日誌等功能，讓生活更便利。
          </Typography>
        </Box>

        {/* Tools Grid */}
        <Grid container spacing={4} justifyContent="center">
          {tools.map((tool) => (
            <Grid item xs={12} md={4} key={tool.id}>
              <Card
                elevation={0}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 4,
                  background: 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 40px rgba(0,0,0,0.1)',
                    background: 'rgba(255, 255, 255, 0.95)'
                  }
                }}
              >
                <CardContent sx={{ p: 4, flexGrow: 1, textAlign: 'center' }}>
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      bgcolor: `${tool.color}15`,
                      color: tool.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 3
                    }}
                  >
                    {tool.icon}
                  </Box>
                  <Typography variant="h5" fontWeight="bold" gutterBottom>
                    {tool.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                    {tool.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ p: 3, pt: 0, justifyContent: 'center' }}>
                  <Button
                    variant={tool.highlight ? "contained" : "outlined"}
                    size="large"
                    endIcon={tool.path ? <ArrowForwardIcon /> : null}
                    onClick={() => tool.path && navigate(tool.path)}
                    disabled={!tool.path}
                    sx={{
                      borderRadius: 3,
                      px: 4,
                      bgcolor: tool.highlight ? tool.color : 'transparent',
                      borderColor: tool.color,
                      color: tool.highlight ? 'white' : tool.color,
                      '&:hover': {
                        bgcolor: tool.highlight ? tool.color : `${tool.color}10`,
                        borderColor: tool.color
                      }
                    }}
                  >
                    {tool.action}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Footer */}
        <Box sx={{ mt: 12, textAlign: 'center', color: 'text.secondary' }}>
          <Typography variant="body2">
            © 2025 Tooliufy | Designed for simplicity
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}

export default HomePage
