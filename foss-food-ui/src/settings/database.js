import * as React from 'react';
import axios from 'axios';
import { Link as RouterLink } from 'react-router-dom';

import { Button, CircularProgress, Grid, Paper, Stack, Typography } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import LoadingButton from '@mui/lab/LoadingButton';

const Loader = () => <Stack alignItems="center">
    <CircularProgress />
</Stack>

const DbFileMissing = ({ loadSettings }) => {

    const [loading, setLoading] = React.useState(false);

    const createDB = (setLoading, loadSettings) => {
        setLoading(true)
        axios.post('http://localhost:8080/v1/db-settings/create-db', {}, {
            headers: {
                'x-correlation-id': '497e6b0a-d2d1-4aa7-a73b-99c6392847bf'
            }
        })
            .then(function (response) {
                setLoading(false)
                loadSettings()
            })
            .catch(function (error) {
                alert(error)
            });
    }

    return <React.Fragment>
        <Stack alignItems="center">
            <h3>It looks like you don't have a database configured </h3>
        </Stack>
        <Stack spacing={2} direction="row">
            <LoadingButton
                loading={loading}
                variant="contained"
                onClick={() => { createDB(setLoading, loadSettings) }}>Create</LoadingButton>
            <Button variant="outlined">Import</Button>
        </Stack>
    </React.Fragment>
}

const TablesMissing = ({ loadSettings }) => {

    const [loading, setLoading] = React.useState(false);

    const createTables = (setLoading, loadSettings) => {
        setLoading(true)
        axios.post('http://localhost:8080/v1/db-settings/create-tables', {}, {
            headers: {
                'x-correlation-id': '497e6b0a-d2d1-4aa7-a73b-99c6392847bf'
            }
        })
            .then(function (response) {
                setLoading(false)
                loadSettings()
            })
            .catch(function (error) {
                alert(error)
            });
    }

    return <React.Fragment>
        <Stack alignItems="center">
            <h3>There are tables missing from the database</h3>
        </Stack>
        <Stack spacing={2} direction="row">
            <LoadingButton
                loading={loading}
                variant="contained"
                onClick={() => { createTables(setLoading, loadSettings) }}>Add Now</LoadingButton>
        </Stack>
    </React.Fragment>
}

export function Database() {

    const [dbSettings, setDbSettings] = React.useState({ isLoaded: false })

    const loadSettings = () => {
        setDbSettings({ isLoaded: false })
        axios.get('http://localhost:8080/v1/db-settings', {
            headers: {
                'x-correlation-id': '497e6b0a-d2d1-4aa7-a73b-99c6392847bf'
            }
        })
            .then(res => {
                const settings = {
                    isLoaded: true,
                    ...res.data
                }

                setDbSettings(settings)
            })
    }

    React.useEffect(() => { loadSettings() }, [])

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
            <Typography color="text.primary">Database</Typography>
        </Breadcrumbs>
        {!dbSettings.doesDbExist && <DbFileMissing loadSettings={loadSettings} />}
        {dbSettings.doesDbExist && !dbSettings.hasTables && <TablesMissing loadSettings={loadSettings} />}
        {dbSettings.isSetupComplete && <h3>DB is all setup and working</h3>}
    </Stack>
}