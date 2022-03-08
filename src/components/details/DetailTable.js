import React, { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function DetailTable({characters}) {

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Homeworld</TableCell>
            <TableCell align="right">Hair color</TableCell>
            <TableCell align="right">Height</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {characters.map((row) => (
            <TableRow
              key={row.character.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.character.name}
              </TableCell>
              <TableCell align="right">{row.character.homeworld}</TableCell>
              <TableCell align="right">{row.character.hair_color}</TableCell>
              <TableCell align="right">{row.character.height}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}