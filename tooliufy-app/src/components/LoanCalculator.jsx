import { useState, useEffect } from 'react'
import {
  Grid,
  TextField,
  InputAdornment,
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
  Alert,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import PercentIcon from '@mui/icons-material/Percent'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import LoanResults from './LoanResults'
import LoanChart from './LoanChart'
import LoanScheduleTable from './LoanScheduleTable'

function LoanCalculator({ repaymentType }) {
  const [loanAmount, setLoanAmount] = useState(1000000)
  const [interestRate, setInterestRate] = useState(2.5)
  const [loanTerm, setLoanTerm] = useState(20)
  const [termUnit, setTermUnit] = useState('year') // 'year' or 'month'
  const [calculationResults, setCalculationResults] = useState(null)

  // 計算貸款
  useEffect(() => {
    if (loanAmount > 0 && interestRate >= 0 && loanTerm > 0) {
      const results = calculateLoan()
      setCalculationResults(results)
    } else {
      setCalculationResults(null)
    }
  }, [loanAmount, interestRate, loanTerm, termUnit, repaymentType])

  // 貸款計算邏輯
  const calculateLoan = () => {
    const principal = parseFloat(loanAmount)
    const annualRate = parseFloat(interestRate) / 100
    const monthlyRate = annualRate / 12
    const totalMonths = termUnit === 'year' ? loanTerm * 12 : loanTerm

    let schedule = []
    let totalInterest = 0
    let monthlyPayment = 0

    if (repaymentType === 'equal-payment') {
      // 本息平均攤還 (固定每月繳款)
      if (monthlyRate === 0) {
        monthlyPayment = principal / totalMonths
      } else {
        monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
                        (Math.pow(1 + monthlyRate, totalMonths) - 1)
      }

      let remainingPrincipal = principal

      for (let month = 1; month <= totalMonths; month++) {
        const interestPayment = remainingPrincipal * monthlyRate
        const principalPayment = monthlyPayment - interestPayment
        remainingPrincipal -= principalPayment
        totalInterest += interestPayment

        schedule.push({
          period: month,
          payment: monthlyPayment,
          principal: principalPayment,
          interest: interestPayment,
          remainingBalance: Math.max(0, remainingPrincipal)
        })
      }
    } else {
      // 本金平均攤還 (固定每月本金)
      const principalPayment = principal / totalMonths
      let remainingPrincipal = principal

      for (let month = 1; month <= totalMonths; month++) {
        const interestPayment = remainingPrincipal * monthlyRate
        const totalPayment = principalPayment + interestPayment
        remainingPrincipal -= principalPayment
        totalInterest += interestPayment

        schedule.push({
          period: month,
          payment: totalPayment,
          principal: principalPayment,
          interest: interestPayment,
          remainingBalance: Math.max(0, remainingPrincipal)
        })
      }

      monthlyPayment = schedule[0].payment // 首期繳款金額
    }

    return {
      monthlyPayment,
      totalPayment: principal + totalInterest,
      totalInterest,
      totalMonths,
      schedule,
      repaymentType
    }
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Grid container spacing={{ xs: 2, md: 3, xl: 4 }} justifyContent="center">
        {/* 左側：輸入區域 */}
        <Grid item xs={12} lg={4} xl={3.5}>
          <Card
            variant="outlined"
            sx={{
              height: '100%',
              border: '2px solid',
              borderColor: 'primary.light',
              borderRadius: 2,
              transition: 'all 0.3s ease',
              '&:hover': {
                borderColor: 'primary.main',
                boxShadow: 3
              }
            }}
          >
            <CardContent sx={{ p: { xs: 2, sm: 3, xl: 4 } }}>
              <Typography
                variant="h6"
                gutterBottom
                color="primary"
                fontWeight="bold"
                sx={{ fontSize: { xs: '1.25rem', xl: '1.5rem' } }}
              >
                貸款資訊
              </Typography>
              <Divider sx={{ mb: 3 }} />

              {/* 貸款金額 */}
              <Box sx={{ mb: 3 }}>
                <TextField
                  fullWidth
                  label="貸款金額"
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AttachMoneyIcon color="primary" />
                      </InputAdornment>
                    ),
                    endAdornment: <InputAdornment position="end">元</InputAdornment>
                  }}
                  variant="outlined"
                />
                <Slider
                  value={loanAmount}
                  onChange={(e, newValue) => setLoanAmount(newValue)}
                  min={100000}
                  max={10000000}
                  step={100000}
                  sx={{ mt: 2 }}
                />
              </Box>

              {/* 年利率 */}
              <Box sx={{ mb: 3 }}>
                <TextField
                  fullWidth
                  label="年利率"
                  type="number"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PercentIcon color="primary" />
                      </InputAdornment>
                    ),
                    endAdornment: <InputAdornment position="end">%</InputAdornment>
                  }}
                  inputProps={{
                    step: 0.1,
                    min: 0,
                    max: 20
                  }}
                  variant="outlined"
                />
                <Slider
                  value={interestRate}
                  onChange={(e, newValue) => setInterestRate(newValue)}
                  min={0}
                  max={10}
                  step={0.1}
                  sx={{ mt: 2 }}
                />
              </Box>

              {/* 貸款期限 */}
              <Box sx={{ mb: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={8}>
                    <TextField
                      fullWidth
                      label="貸款期限"
                      type="number"
                      value={loanTerm}
                      onChange={(e) => setLoanTerm(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <CalendarTodayIcon color="primary" />
                          </InputAdornment>
                        )
                      }}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <FormControl fullWidth>
                      <InputLabel>單位</InputLabel>
                      <Select
                        value={termUnit}
                        onChange={(e) => setTermUnit(e.target.value)}
                        label="單位"
                      >
                        <MenuItem value="year">年</MenuItem>
                        <MenuItem value="month">月</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <Slider
                  value={loanTerm}
                  onChange={(e, newValue) => setLoanTerm(newValue)}
                  min={1}
                  max={termUnit === 'year' ? 40 : 480}
                  step={1}
                  sx={{ mt: 2 }}
                />
              </Box>

              <Alert severity="info" sx={{ mt: 2 }}>
                {repaymentType === 'equal-payment'
                  ? '本息平均攤還：每月繳款金額固定'
                  : '本金平均攤還：每月本金固定，利息遞減'}
              </Alert>
            </CardContent>
          </Card>
        </Grid>

        {/* 右側：結果顯示 */}
        <Grid item xs={12} lg={8} xl={8.5}>
          {calculationResults ? (
            <LoanResults results={calculationResults} />
          ) : (
            <Card
              variant="outlined"
              sx={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '200px',
                border: '2px dashed',
                borderColor: 'grey.300',
                borderRadius: 2
              }}
            >
              <CardContent>
                <Typography variant="body1" color="text.secondary" textAlign="center">
                  請輸入貸款資訊以查看計算結果
                </Typography>
              </CardContent>
            </Card>
          )}
        </Grid>

        {/* 圖表區域 */}
        {calculationResults && (
          <Grid item xs={12}>
            <Box sx={{ mt: { xs: 1, md: 2 } }}>
              <LoanChart schedule={calculationResults.schedule} />
            </Box>
          </Grid>
        )}

        {/* 還款明細表 */}
        {calculationResults && (
          <Grid item xs={12}>
            <Box sx={{ mt: { xs: 1, md: 2 } }}>
              <LoanScheduleTable schedule={calculationResults.schedule} />
            </Box>
          </Grid>
        )}
      </Grid>
    </Box>
  )
}

export default LoanCalculator
