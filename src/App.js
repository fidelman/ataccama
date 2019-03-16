import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import GlobalStyle, { Container } from './globalStyles'
import UsersPage from './components/pages/UsersPage'

function App() {
  return (
    <>
      <CssBaseline />
      <GlobalStyle />
      <Container>
        <UsersPage />
      </Container>
    </>
  )
}

export default App
