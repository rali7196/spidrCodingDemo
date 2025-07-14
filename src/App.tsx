import React from 'react'
import { ThemeProvider, CssBaseline } from '@mui/material'
import theme from './theme'
import InterestForm from './components/InterestForm/InterestForm'

const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <InterestForm />
  </ThemeProvider>
)

export default App
