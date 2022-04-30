import * as React from 'react';
import { useParams, Outlet, useNavigate  } from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Button, CircularProgress, Stack, Box, Typography, IconButton } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import axios from 'axios';
import { FormContainer, TextFieldElement } from 'react-hook-form-mui'

const MODAL_STATE = {
    ADD: 'add',
    EDIT: 'edit',
    VIEW: 'view'
}

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', flex: 1 },
    {
        field: 'ingredients',
        headerName: 'Ingredients',
        type: 'number'
    }
];

const Loader = () => <Stack alignItems="center">
    <CircularProgress />
</Stack>

const ItemModal = ({ loadInventory, handleClose, open, selectedRow, mode, changeMode }) => {

    const [loading, setLoading] = React.useState(false)

    const submitForm = (data) => {

        data.quantity *= 1

        const fn = mode === MODAL_STATE.ADD ? addItem : updateItem

        setLoading(true)

        fn(data)
            .then(function (response) {
                setLoading(false)
                loadInventory()
            })
            .catch(function (error) {
                alert(error)
            });
    }

    const addItem = (data) => {
        data.id = -1

        return axios.post('http://localhost:8080/v1/recipes', data, {
            headers: {
                'x-correlation-id': '497e6b0a-d2d1-4aa7-a73b-99c6392847bf'
            }
        })
    }

    const updateItem = (data) => {
        return axios.put(`http://localhost:8080/v1/recipes/${data.id}`, data, {
            headers: {
                'x-correlation-id': '497e6b0a-d2d1-4aa7-a73b-99c6392847bf'
            }
        })
    }

    const deleteItem = () => {
        if (!confirm("Permanently delete this recipe?"))
            return

        setLoading(true)

        axios.delete(`http://localhost:8080/v1/recipes/${selectedRow.id}`, {
            headers: {
                'x-correlation-id': '497e6b0a-d2d1-4aa7-a73b-99c6392847bf'
            }
        })
            .then(function (response) {
                setLoading(false)
                loadInventory()
            })
            .catch(function (error) {
                alert(error)
            });
    }

    return <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="md"
        sx={{
            '& .MuiTextField-root': { m: 1 },
        }}>
        {loading && <Box sx={{ p: 2 }}><Loader /></Box>}
        {!loading && <FormContainer
            defaultValues={selectedRow ?? { name: '', description: '' }}
            onSuccess={submitForm}
        >
            {mode === MODAL_STATE.ADD && <DialogTitle>Add Item</DialogTitle>}
            {mode === MODAL_STATE.VIEW && <DialogTitle>View Item</DialogTitle>}
            {mode === MODAL_STATE.EDIT && <DialogTitle>
                Edit Item
                <IconButton
                    aria-label="close"
                    onClick={deleteItem}
                    color="error"
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8
                    }}
                >
                    <DeleteForeverIcon />
                </IconButton>
            </DialogTitle>
            }
            <DialogContent>
                {mode === MODAL_STATE.ADD && <DialogContentText>
                    Complete the below to create a new Recipe
                </DialogContentText>}
                <Stack sx={{ width: '100%' }}>
                    {(mode !== MODAL_STATE.VIEW && <TextFieldElement
                        autoFocus
                        name="name"
                        label="Item Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        required
                    />) || <Box>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                Name
                            </Typography>
                            <Typography variant="h5" component="div" gutterBottom>
                                {(selectedRow ?? {}).name}
                            </Typography>
                        </Box>}
                    {(mode !== MODAL_STATE.VIEW && <TextFieldElement
                        name="quantity"
                        label="Item Quantity"
                        type="number"
                        fullWidth
                        variant="standard"
                        required
                    />) || <Box>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                Quantity
                            </Typography>
                            <Typography variant="h5" component="div" gutterBottom>
                                {(selectedRow ?? {}).quantity}
                            </Typography>
                        </Box>}
                    {(mode !== MODAL_STATE.VIEW && <TextFieldElement
                        name="description"
                        label="Item Description"
                        multiline
                        rows={15}
                        placeholder='Description may be Markdown'
                        required
                    />) || <Box>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                Description
                            </Typography>
                            <Typography variant="h5" component="div" gutterBottom>
                                {(selectedRow ?? {}).description}
                            </Typography>
                        </Box>}

                </Stack>
            </DialogContent>
            {mode !== MODAL_STATE.VIEW && <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type={'submit'}>Save</Button>
            </DialogActions>}
            {mode === MODAL_STATE.VIEW && <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={() => { changeMode(MODAL_STATE.EDIT) }}>Edit Item</Button>
            </DialogActions>}
        </FormContainer>}
    </Dialog >
}

export default function Inventory() {

    const { id } = useParams();

    if (id) {
        return <Paper style={{ width: '100%' }}>
            <Outlet />
        </Paper>
    }

    const [loading, setLoading] = React.useState(true)
    const [items, setItems] = React.useState(null)
    const [modalState, setModalState] = React.useState({ mode: MODAL_STATE.VIEW, open: false, row: null })

    const loadInventory = () => {

        setModalState({ mode: MODAL_STATE.VIEW, open: false, row: null })
        setLoading(true)

        axios.get('http://localhost:8080/v1/recipes', {
            headers: {
                'x-correlation-id': '497e6b0a-d2d1-4aa7-a73b-99c6392847bf'
            }
        })
            .then(res => {
                setItems(res.data)
                setLoading(false)
            })
    }

    const openItemModal = (mode, row) => {

        if (mode === MODAL_STATE.ADD) {
            setModalState({ mode: MODAL_STATE.ADD, row: null, open: true })
            return
        }

        setModalState({ mode: mode, open: true, row: row })
    }

    React.useEffect(() => { loadInventory() }, [])
    const navigate = useNavigate();

    if (loading) {
        return <Loader />
    }

    

    const { mode, open, row } = modalState

    return (
        <React.Fragment>
            <Stack spacing={2} direction="row" sx={{ p: 1 }}>
                <Button variant="contained" onClick={() => { openItemModal(MODAL_STATE.ADD) }}>New Recipe</Button>
            </Stack>
            <Paper style={{ height: 700, width: '100%' }} sx={{ p: 2 }}>
                <DataGrid
                    rows={items}
                    columns={columns}
                    pageSize={25}
                    rowsPerPageOptions={[25]}
                    onRowClick={({ row }) => { navigate(`${row.id}`) }}
                />
            </Paper>
            <ItemModal
                open={open}
                handleClose={() => { setModalState({ mode: 'view', open: false, row: null }) }}
                loadInventory={() => { loadInventory() }}
                selectedRow={row}
                mode={mode}
                changeMode={(mode) => { setModalState({ ...modalState, mode: mode }) }} />
        </React.Fragment>
    );
}
