import * as React from 'react';
import Paper from '@mui/material/Paper';
import { RouteObject, Outlet, useRoutes, useParams, Navigate } from "react-router-dom";

export default function Settings() {
    return (
        <Paper style={{ height: 650, width: '100%' }}>
            <h1>Settings</h1>
            <Outlet/>
        </Paper>
    );
}