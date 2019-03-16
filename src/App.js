import React, { useEffect, useState } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import TableContainer from './components/TableContainer'
import GlobalStyle, { Container } from './globalStyles'
import api from './service/api'

function App() {
  const [data, setData] = useState([])

  useEffect(() => {
    api.fetchData().then((res) => setData(res))
  }, [])

  return (
    <>
      <CssBaseline />
      <GlobalStyle />
      <Container>
        {data.length ? <TableContainer data={data} /> : <h1>Loading...</h1>}
      </Container>
    </>
  )
}

export default App
