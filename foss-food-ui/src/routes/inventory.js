import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', minWidth: 150, flex:1 },
    {
        field: 'quantity',
        headerName: 'Quantity',
        type: 'number'
    }
];

const rows = [
    { id: 1, name: 'Snow', quantity: 35 },
    { id: 2, name: 'Lannister', quantity: 42 },
    { id: 3, name: 'Lannister', quantity: 45 },
    { id: 4, name: 'Stark', quantity: 16 },
    { id: 5, name: 'Targaryen', quantity: 3 },
    { id: 6, name: 'Melisandre', quantity: 150 },
    { id: 7, name: 'Clifford', quantity: 44 },
    { id: 8, name: 'Frances', quantity: 36 },
    { id: 9, name: 'Roxie', quantity: 65 },
];

export default function DataTable() {
    return (
        <Paper style={{ height: 650, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={25}
                rowsPerPageOptions={[25]}
                checkboxSelection
            />
        </Paper>
    );
}
