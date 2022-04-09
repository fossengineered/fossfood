import * as React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Stack, Typography } from '@mui/material';

import Paper from '@mui/material/Paper';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

import { RouteObject, Outlet, useRoutes, useParams, Navigate } from "react-router-dom";

export default function Settings() {
    const { pathname } = useLocation()

    if (pathname != '/settings') {
        return <Paper style={{ height: 650, width: '100%' }}>
            <Outlet />
        </Paper>
    }

    return (
        <Paper style={{ height: 650, width: '100%' }}>
            <Breadcrumbs aria-label="breadcrumb" p={2}>
                <Link underline="hover" color="inherit" component={RouterLink} to="/">
                    Dashboard
                </Link>
                <Typography color="text.primary">Settings</Typography>
            </Breadcrumbs>
            <Stack p={3}>
                <Link to="database" component={RouterLink}>Database</Link>
            </Stack>
        </Paper>
    );
}