import * as React from 'react';
import axios from 'axios';
import { Link as RouterLink } from 'react-router-dom';

import { Button, CircularProgress, Grid, Paper, Stack, Typography } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

const Loading = () => <Stack alignItems="center">
    <CircularProgress />
</Stack>

const getDbSettings = () => {
    return axios.get('http://localhost:8080/v1/db-settings', {
        headers: {
            'x-correlation-id': '497e6b0a-d2d1-4aa7-a73b-99c6392847bf'
        }
    })
}

const Loader = () => <Stack alignItems="center">
    <CircularProgress />
</Stack>

const DbFileMissing = () => <React.Fragment>
    <Stack alignItems="center">
        <h3>It looks like you don't have a database configured </h3>
    </Stack>
    <Stack spacing={2} direction="row">
        <Button variant="contained">Create</Button>
        <Button variant="outlined">Import</Button>
    </Stack>
</React.Fragment>

export function Database() {

    const [dbSettings, setDbSettings] = React.useState({ isLoaded: false })

    React.useEffect(() => {
        getDbSettings().then(res => {
            const settings = {
                isLoaded: true,
                ...res.data
            }

            setDbSettings(settings)
        })
    }, [])

    if (!dbSettings.isLoaded) {
        return <Loader />
    }

    return <Stack alignItems="center">
        <Breadcrumbs aria-label="breadcrumb" p={2}>
            <Link underline="hover" color="inherit" component={RouterLink} to="/">
                Dashboard
            </Link>
            <Link underline="hover" color="inherit" component={RouterLink} to="/settings">
                Settings
            </Link>
            <Typography color="text.primary">database</Typography>
        </Breadcrumbs>
        <DbFileMissing />
    </Stack>
}