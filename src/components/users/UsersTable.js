import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'
import { Container } from '../../globalStyles'
import Button from '@material-ui/core/Button'

const styles = {
  cell: {
    padding: '0 !important' // by default it has padding with 11 priority points (class just 10)
  }
}

function UsersTable({ classes, data }) {
  function toggleShow(name, path) {
    console.log(name, path)
  }

  function getTableRows(data, headers, nestingLevel) {
    function getNestedRows(kids, nestingLevel) {
      return Object.keys(kids).map((kidName) => {
        const kid = kids[kidName]
        const newNestingLevel = [...nestingLevel, 'kids', kidName, 'records']
        return (
          <TableRow key={kidName}>
            <TableCell className={classes.cell} colSpan={headers.length + 1}>
              <Container>
                {kidName}
                {generateTable(kid.records, newNestingLevel)}
              </Container>
            </TableCell>
          </TableRow>
        )
      })
    }

    return data.map((item, i) => {
      const newNestingLevel = [...nestingLevel, i]
      return (
        <React.Fragment key={i}>
          <TableRow>
            {headers.map((header, j) => (
              <TableCell key={j}>{item.data[header] || ''}</TableCell>
            ))}
            <TableCell>
              <Button
                onClick={() => toggleShow('remove', newNestingLevel)}
                size="small"
                variant="outlined"
                color="secondary"
              >
                Remove
              </Button>
              {Object.keys(item.kids).length ? (
                <Button
                  size="small"
                  onClick={() => toggleShow('more', newNestingLevel)}
                  variant="outlined"
                  color="primary"
                >
                  {item.data.isOpen ? 'Less' : 'More'}
                </Button>
              ) : null}
            </TableCell>
          </TableRow>
          {Object.keys(item.kids).length && !item.data.isOpen
            ? getNestedRows(item.kids, newNestingLevel)
            : null}
        </React.Fragment>
      )
    })
  }

  function getHeaders(data) {
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

    return headers
  }

  function generateTable(data, nestingLevel) {
    const headers = getHeaders(data)
    return (
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              {headers.map((header, key) => (
                <TableCell key={key}>{header}</TableCell>
              ))}
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{getTableRows(data, headers, nestingLevel)}</TableBody>
        </Table>
      </Paper>
    )
  }

  return generateTable(data, [])
}

export default withStyles(styles)(UsersTable)
