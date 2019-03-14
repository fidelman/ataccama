import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import TableContainer from './components/TableContainer'
import GlobalStyle, { Container } from './globalStyles'

function App() {
  return (
    <>
      <CssBaseline />
      <GlobalStyle />
      <Container>
        <TableContainer />
      </Container>
    </>
  )
}

export default App
