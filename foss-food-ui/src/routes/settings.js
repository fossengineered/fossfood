import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import Paper from '@mui/material/Paper';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

import { RouteObject, Outlet, useRoutes, useParams, Navigate } from "react-router-dom";

export default function Settings() {
    return (
        <Paper style={{ height: 650, width: '100%' }}>
            <Outlet />
        </Paper>
    );
}