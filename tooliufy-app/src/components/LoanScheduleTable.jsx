import { useState } from 'react'
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  TablePagination,
  Chip,
  Divider
} from '@mui/material'
import TableChartIcon from '@mui/icons-material/TableChart'

function LoanScheduleTable({ schedule }) {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(12)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('zh-TW', {
      style: 'currency',
      currency: 'TWD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const visibleRows = schedule.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  )

  return (
    <Card
      variant="outlined"
      sx={{
        border: '2px solid',
        borderColor: 'primary.light',
        borderRadius: 2
      }}
    >
      <CardContent sx={{ p: { xs: 2, sm: 3, md: 4, xl: 5 } }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'flex-start', sm: 'center' },
            mb: 2,
            gap: 1
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
            <TableChartIcon sx={{ color: 'primary.main', mr: 1, fontSize: { xs: '1.5rem', xl: '1.75rem' } }} />
            <Typography
              variant="h6"
              color="primary"
              fontWeight="bold"
              sx={{ fontSize: { xs: '1.25rem', xl: '1.5rem' } }}
            >
              還款明細表
            </Typography>
          </Box>
          <Chip
            label={`共 ${schedule.length} 期`}
            size="small"
            color="primary"
            variant="outlined"
          />
        </Box>
        <Divider sx={{ mb: 2 }} />

        <TableContainer component={Paper} variant="outlined">
          <Table sx={{ minWidth: { xs: 300, sm: 650 } }} size="small">
            <TableHead>
              <TableRow sx={{ bgcolor: 'primary.main' }}>
                <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: { xs: '0.875rem', xl: '1rem' } }}>
                  期數
                </TableCell>
                <TableCell align="right" sx={{ color: 'white', fontWeight: 'bold', fontSize: { xs: '0.875rem', xl: '1rem' } }}>
                  繳款金額
                </TableCell>
                <TableCell align="right" sx={{ color: 'white', fontWeight: 'bold', fontSize: { xs: '0.875rem', xl: '1rem' } }}>
                  本金
                </TableCell>
                <TableCell align="right" sx={{ color: 'white', fontWeight: 'bold', fontSize: { xs: '0.875rem', xl: '1rem' } }}>
                  利息
                </TableCell>
                <TableCell align="right" sx={{ color: 'white', fontWeight: 'bold', fontSize: { xs: '0.875rem', xl: '1rem' } }}>
                  剩餘本金
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {visibleRows.map((row) => (
                <TableRow
                  key={row.period}
                  sx={{
                    '&:nth-of-type(odd)': { bgcolor: 'action.hover' },
                    '&:hover': { bgcolor: 'action.selected' },
                    transition: 'background-color 0.2s'
                  }}
                >
                  <TableCell component="th" scope="row">
                    <Chip
                      label={`第 ${row.period} 期`}
                      size="small"
                      color={row.period === 1 ? 'primary' : 'default'}
                      variant={row.period === 1 ? 'filled' : 'outlined'}
                    />
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'medium', fontSize: { xs: '0.875rem', xl: '1rem' } }}>
                    {formatCurrency(row.payment)}
                  </TableCell>
                  <TableCell align="right" sx={{ color: 'success.main', fontSize: { xs: '0.875rem', xl: '1rem' } }}>
                    {formatCurrency(row.principal)}
                  </TableCell>
                  <TableCell align="right" sx={{ color: 'warning.main', fontSize: { xs: '0.875rem', xl: '1rem' } }}>
                    {formatCurrency(row.interest)}
                  </TableCell>
                  <TableCell align="right" sx={{ color: 'text.secondary', fontSize: { xs: '0.875rem', xl: '1rem' } }}>
                    {formatCurrency(row.remainingBalance)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[12, 24, 60, 120]}
          component="div"
          count={schedule.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="每頁顯示："
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} / 共 ${count} 期`}
        />

        {/* 統計摘要 */}
        <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            提示：本金逐期償還，利息根據剩餘本金計算
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export default LoanScheduleTable
