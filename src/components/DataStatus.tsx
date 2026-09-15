// Stav načítání dat – spinner, chyba nebo nenalezená položka
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import { content } from '../content'
import { fluid } from '../fluid'
import { COLORS } from '../theme'

interface DataStatusProps {
  loading: boolean
  error: string | null
  notFound?: boolean
}

export function DataStatus({ loading, error, notFound = false }: DataStatusProps) {
  const message = error ? content.pages.loadError : notFound ? content.pages.notFoundItem : null

  return (
    <Box
      role="status"
      sx={{
        paddingTop: fluid(60, 64),
        paddingLeft: fluid(30, 34),
        paddingRight: fluid(30, 34),
        minHeight: fluid(300, 320),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
      }}
    >
      {loading ? (
        <CircularProgress aria-label={content.pages.loading} sx={{ color: COLORS.white }} />
      ) : (
        message && (
          <Typography sx={{ fontSize: fluid(16, 17), lineHeight: fluid(24, 26), color: COLORS.white }}>{message}</Typography>
        )
      )}
    </Box>
  )
}

export default DataStatus
