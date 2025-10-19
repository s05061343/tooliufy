import {
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
  ToggleButton,
  ToggleButtonGroup,
  Grid
} from '@mui/material'
import { useState } from 'react'
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'
import ShowChartIcon from '@mui/icons-material/ShowChart'
import BarChartIcon from '@mui/icons-material/BarChart'
import PieChartIcon from '@mui/icons-material/PieChart'

function LoanChart({ schedule }) {
  const [chartType, setChartType] = useState('line')

  const handleChartTypeChange = (event, newType) => {
    if (newType !== null) {
      setChartType(newType)
    }
  }

  // 格式化金額
  const formatCurrency = (value) => {
    return `$${(value / 10000).toFixed(1)}萬`
  }

  // 準備圖表資料 - 取樣以避免資料過多
  const sampleRate = Math.max(1, Math.floor(schedule.length / 50))
  const chartData = schedule
    .filter((_, index) => index % sampleRate === 0 || index === schedule.length - 1)
    .map((item) => ({
      期數: item.period,
      本金: Math.round(item.principal),
      利息: Math.round(item.interest),
      剩餘本金: Math.round(item.remainingBalance),
      繳款金額: Math.round(item.payment)
    }))

  // 計算總計用於圓餅圖
  const totalPrincipal = schedule.reduce((sum, item) => sum + item.principal, 0)
  const totalInterest = schedule.reduce((sum, item) => sum + item.interest, 0)

  const pieData = [
    { name: '本金', value: Math.round(totalPrincipal), color: '#2e7d32' },
    { name: '利息', value: Math.round(totalInterest), color: '#ed6c02' }
  ]

  // 自訂 Tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Paper
          sx={{
            p: 2,
            bgcolor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            boxShadow: 3
          }}
        >
          <Typography variant="subtitle2" gutterBottom>
            第 {label} 期
          </Typography>
          {payload.map((entry, index) => (
            <Typography
              key={index}
              variant="body2"
              sx={{ color: entry.color }}
            >
              {entry.name}: {formatCurrency(entry.value)}
            </Typography>
          ))}
        </Paper>
      )
    }
    return null
  }

  return (
    <Card
      variant="outlined"
      sx={{
        border: '2px solid',
        borderColor: 'primary.light',
        borderRadius: 2
      }}
    >
      <CardContent sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', sm: 'center' },
            mb: 2,
            gap: 2
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ShowChartIcon sx={{ color: 'primary.main', mr: 1 }} />
            <Typography variant="h6" color="primary" fontWeight="bold">
              視覺化分析
            </Typography>
          </Box>

          <ToggleButtonGroup
            value={chartType}
            exclusive
            onChange={handleChartTypeChange}
            size="small"
            sx={{
              '& .MuiToggleButton-root': {
                px: { xs: 1, sm: 2 },
                fontSize: { xs: '0.75rem', sm: '0.875rem' }
              }
            }}
          >
            <ToggleButton value="line">
              <ShowChartIcon fontSize="small" sx={{ mr: { xs: 0, sm: 0.5 } }} />
              <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                趨勢圖
              </Box>
            </ToggleButton>
            <ToggleButton value="bar">
              <BarChartIcon fontSize="small" sx={{ mr: { xs: 0, sm: 0.5 } }} />
              <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                柱狀圖
              </Box>
            </ToggleButton>
            <ToggleButton value="pie">
              <PieChartIcon fontSize="small" sx={{ mr: { xs: 0, sm: 0.5 } }} />
              <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                圓餅圖
              </Box>
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={{ xs: 2, md: 3 }}>
          {/* 主圖表 */}
          <Grid item xs={12} lg={chartType === 'pie' ? 6 : 12}>
            <Box sx={{ width: '100%', height: { xs: 300, sm: 350, md: 400 } }}>
              {chartType === 'line' && (
                <ResponsiveContainer>
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorPrincipal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2e7d32" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#2e7d32" stopOpacity={0.1} />
                      </linearGradient>
                      <linearGradient id="colorInterest" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ed6c02" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#ed6c02" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="期數" />
                    <YAxis tickFormatter={formatCurrency} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="本金"
                      stroke="#2e7d32"
                      fillOpacity={1}
                      fill="url(#colorPrincipal)"
                    />
                    <Area
                      type="monotone"
                      dataKey="利息"
                      stroke="#ed6c02"
                      fillOpacity={1}
                      fill="url(#colorInterest)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}

              {chartType === 'bar' && (
                <ResponsiveContainer>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="期數" />
                    <YAxis tickFormatter={formatCurrency} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar dataKey="本金" stackId="a" fill="#2e7d32" />
                    <Bar dataKey="利息" stackId="a" fill="#ed6c02" />
                  </BarChart>
                </ResponsiveContainer>
              )}

              {chartType === 'pie' && (
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => formatCurrency(value)} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </Box>
          </Grid>

          {/* 剩餘本金趨勢圖 */}
          {chartType === 'pie' && (
            <Grid item xs={12} lg={6}>
              <Typography variant="subtitle1" gutterBottom fontWeight="bold" color="text.secondary">
                剩餘本金變化
              </Typography>
              <Box sx={{ width: '100%', height: { xs: 300, sm: 350 } }}>
                <ResponsiveContainer>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="期數" />
                    <YAxis tickFormatter={formatCurrency} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="剩餘本金"
                      stroke="#1976d2"
                      strokeWidth={2}
                      dot={{ fill: '#1976d2', r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </Grid>
          )}
        </Grid>

        {/* 圖表說明 */}
        <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
          <Typography variant="body2" color="text.secondary">
            {chartType === 'line' && '趨勢圖顯示每期本金與利息的變化趨勢'}
            {chartType === 'bar' && '柱狀圖顯示每期繳款金額中本金與利息的組成'}
            {chartType === 'pie' && '圓餅圖顯示整個貸款期間本金與利息的總體佔比'}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

// Paper component for tooltip
import { Paper } from '@mui/material'

export default LoanChart
