import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

function TableComponent() {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Dessert (100g serving)</TableCell>
          <TableCell align="right">Calories</TableCell>
          <TableCell align="right">Fat (g)</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell align="right">Hi</TableCell>
          <TableCell align="right">Hi</TableCell>
          <TableCell align="right">Hi</TableCell>
          <TableCell align="right">Hi</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

export default TableComponent
