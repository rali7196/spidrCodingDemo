import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: { main: '#1E88E5' },
    secondary: { main: '#FFC107' },
  },
  typography: {
    fontFamily: '"Inter", sans-serif',
    h5: { fontWeight: 600 },
  },
})

export default theme
