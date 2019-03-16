import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'
import { Container } from '../globalStyles'
import Button from '@material-ui/core/Button'

const styles = {
  cell: {
    padding: '0 !important' // by default it has padding with 11 priority points (class just 10)
  }
}

function TableContainer({ classes, data }) {
  const { headers } = data.reduce(
    ({ headers, hash }, item) => {
      Object.keys(item.data).forEach((data) => {
        if (!hash[data]) {
          headers.push(data)
          hash[data] = true
        }
      })

      return { headers, hash }
    },
    { headers: [], hash: {} }
  )

  const TableCells = headers.map((header, key) => (
    <TableCell key={key}>{header}</TableCell>
  ))

  function getTableRows(data) {
    return data.map((item, i) => (
      <>
        <TableRow key={i}>
          {headers.map((header, j) => (
            <TableCell key={j}>{item.data[header] || ''}</TableCell>
          ))}
          <TableCell>
            <Button size="small" variant="outlined" color="secondary">
              Remove
            </Button>
            {Object.keys(item.kids).length ? (
              <Button size="small" variant="outlined" color="primary">
                More
              </Button>
            ) : null}
          </TableCell>
        </TableRow>
        {Object.keys(item.kids).length ? (
          <TableRow>
            <TableCell className={classes.cell} colSpan={headers.length + 1}>
              <Container>
                <Paper>Hello</Paper>
              </Container>
            </TableCell>
          </TableRow>
        ) : null}
      </>
    ))
  }

  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            {TableCells}
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{getTableRows(data)}</TableBody>
      </Table>
    </Paper>
  )
}

export default withStyles(styles)(TableContainer)
