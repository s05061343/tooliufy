import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Divider,
  Chip
} from '@mui/material'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import PaidIcon from '@mui/icons-material/Paid'
import SavingsIcon from '@mui/icons-material/Savings'

function LoanResults({ results }) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('zh-TW', {
      style: 'currency',
      currency: 'TWD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const ResultCard = ({ title, value, icon, color, subtitle }) => (
    <Card
      variant="outlined"
      sx={{
        height: '100%',
        background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`,
        borderColor: color,
        borderWidth: 2,
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: `0 8px 16px ${color}30`
        }
      }}
    >
      <CardContent sx={{ p: { xs: 2, xl: 3 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Box
            sx={{
              bgcolor: color,
              borderRadius: '50%',
              p: { xs: 1, xl: 1.5 },
              display: 'flex',
              mr: 1.5
            }}
          >
            {icon}
          </Box>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            fontWeight="medium"
            sx={{ fontSize: { xs: '0.875rem', xl: '1rem' } }}
          >
            {title}
          </Typography>
        </Box>
        <Typography
          variant="h5"
          fontWeight="bold"
          color={color}
          sx={{ mb: 0.5, fontSize: { xs: '1.5rem', xl: '1.75rem', xxl: '2rem' } }}
        >
          {value}
        </Typography>
        {subtitle && (
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ fontSize: { xs: '0.75rem', xl: '0.875rem' } }}
          >
            {subtitle}
          </Typography>
        )}
      </CardContent>
    </Card>
  )

  return (
    <Box>
      <Card variant="outlined">
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" color="primary" fontWeight="bold">
              計算結果
            </Typography>
            <Chip
              label={results.repaymentType === 'equal-payment' ? '本息平均攤還' : '本金平均攤還'}
              color="primary"
              size="small"
            />
          </Box>
          <Divider sx={{ mb: 3 }} />

          <Grid container spacing={{ xs: 2, xl: 3 }}>
            {/* 每月繳款金額 */}
            <Grid item xs={12} sm={6}>
              <ResultCard
                title={results.repaymentType === 'equal-payment' ? '每月繳款金額' : '首期繳款金額'}
                value={formatCurrency(results.monthlyPayment)}
                icon={<PaidIcon sx={{ color: 'white', fontSize: 24 }} />}
                color="#1976d2"
                subtitle={results.repaymentType === 'equal-principal' && '(逐期遞減)'}
              />
            </Grid>

            {/* 貸款總期數 */}
            <Grid item xs={12} sm={6}>
              <ResultCard
                title="貸款總期數"
                value={`${results.totalMonths} 期`}
                icon={<AccountBalanceIcon sx={{ color: 'white', fontSize: 24 }} />}
                color="#2e7d32"
                subtitle={`${(results.totalMonths / 12).toFixed(1)} 年`}
              />
            </Grid>

            {/* 總利息支出 */}
            <Grid item xs={12} sm={6}>
              <ResultCard
                title="總利息支出"
                value={formatCurrency(results.totalInterest)}
                icon={<TrendingUpIcon sx={{ color: 'white', fontSize: 24 }} />}
                color="#ed6c02"
              />
            </Grid>

            {/* 總還款金額 */}
            <Grid item xs={12} sm={6}>
              <ResultCard
                title="總還款金額"
                value={formatCurrency(results.totalPayment)}
                icon={<SavingsIcon sx={{ color: 'white', fontSize: 24 }} />}
                color="#9c27b0"
                subtitle="本金 + 利息"
              />
            </Grid>
          </Grid>

          {/* 統計資訊 */}
          <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
            <Grid container spacing={{ xs: 2, xl: 3 }}>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  利息占比
                </Typography>
                <Typography variant="h6" fontWeight="bold" color="primary">
                  {((results.totalInterest / results.totalPayment) * 100).toFixed(2)}%
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  本金占比
                </Typography>
                <Typography variant="h6" fontWeight="bold" color="success.main">
                  {(((results.totalPayment - results.totalInterest) / results.totalPayment) * 100).toFixed(2)}%
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}

export default LoanResults
