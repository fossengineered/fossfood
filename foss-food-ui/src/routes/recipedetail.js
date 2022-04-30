import * as React from 'react';
import axios from 'axios';
import { Link as RouterLink, Outlet, useParams } from 'react-router-dom';

import {
    Button,
    CircularProgress,
    Grid,
    List,
    ListItem,
    ListItemText,
    ListSubheader,
    Paper,
    Stack,
    Typography,
    IconButton,
    Checkbox,
    ListItemButton,
    ListItemIcon
} from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import LoadingButton from '@mui/lab/LoadingButton';
import ClearIcon from '@mui/icons-material/Clear';
import { Box } from '@mui/system';

const PAGE_STATE = {
    EDIT: 'edit',
    VIEW: 'view'
}

const RemoveButton = ({ pageMode }) => <IconButton edge="end" aria-label="remove">
    {pageMode === PAGE_STATE.EDIT && <ClearIcon />}
</IconButton>

const ToppingList = () => {
    const [checked, setChecked] = React.useState([0]);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    return (
        <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    <Typography sx={{ fontSize: 16, fontWeight: 'bold', textDecoration: 'underline' }}>
                        Toppings
                    </Typography>
                </ListSubheader>
            }
            dense={true}
        >
            {[0, 1, 2, 3].map((value) => {
                const labelId = `checkbox-list-label-${value}`;

                return (
                    <ListItem
                        key={value}
                        disablePadding
                    >
                        <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={checked.indexOf(value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
                        </ListItemButton>
                    </ListItem>
                );
            })}
        </List>
    );
}

export default function RecipeDetail() {

    const { id } = useParams();
    const [pageMode, setPageMode] = React.useState({ mode: PAGE_STATE.VIEW })

    return <Box><Stack alignItems="center">
        <Breadcrumbs aria-label="breadcrumb" p={2}>
            <Link underline="hover" color="inherit" component={RouterLink} to="/">
                Dashboard
            </Link>
            <Link underline="hover" color="inherit" component={RouterLink} to="/recipes">
                Recipes
            </Link>
            <Typography color="text.primary">Recipe: {id}</Typography>
        </Breadcrumbs>
    </Stack>
        <Stack alignItems="left" sx={{ p: 2 }}>
            <h1>Double Smashburger</h1>
            <Box
                component="img"
                sx={{
                    width: 350
                }}
                alt="The house from the offer."
                src='/images/burger.jpg'
            />
            <Typography paragraph>A double patty smashed burger with American cheese with on brioche bun</Typography>
            <Stack>
                <p>Cooking Process</p>
                ...
            </Stack>
            <Box sx={{ width: 400 }}>
                <List dense={true}
                    subheader={
                        <ListSubheader component="div" id="nested-list-subheader">
                            <Typography sx={{ fontSize: 16, fontWeight: 'bold', textDecoration: 'underline' }}>
                                Ingredients
                            </Typography>
                        </ListSubheader>
                    }>
                    <ListItem secondaryAction={<RemoveButton pageMode={pageMode} />} >
                        <ListItemText primary="Hamburger Bun" />
                    </ListItem>
                    <ListItem secondaryAction={<RemoveButton pageMode={pageMode} />} >
                        <ListItemText primary="Hamburger Meat (70g)" />
                    </ListItem>
                    <ListItem secondaryAction={<RemoveButton pageMode={pageMode} />} >
                        <ListItemText primary="Flavor Bomb Seasoning (1 tbsp)" />
                    </ListItem>
                </List>
                {pageMode === PAGE_STATE.EDIT && <Button fullWidth={false}>Add Ingredient</Button>}
            </Box>
            <Box sx={{ width: 400 }}>
                <List dense={true}
                    subheader={
                        <ListSubheader component="div" id="nested-list-subheader">
                            <Typography sx={{ fontSize: 16, fontWeight: 'bold', textDecoration: 'underline' }}>
                                Standard Toppings
                            </Typography>
                        </ListSubheader>
                    }>
                    <ListItem secondaryAction={<RemoveButton pageMode={pageMode} />} >
                        <ListItemText primary="American Cheese (2 slices)" />
                    </ListItem>
                    <ListItem secondaryAction={<RemoveButton pageMode={pageMode} />} >
                        <ListItemText primary="Ketchup" />
                    </ListItem>
                    <ListItem secondaryAction={<RemoveButton pageMode={pageMode} />} >
                        <ListItemText primary="Mustard" />
                    </ListItem>
                    <ListItem secondaryAction={<RemoveButton pageMode={pageMode} />} >
                        <ListItemText primary="Mayo" />
                    </ListItem>
                    <ListItem secondaryAction={<RemoveButton pageMode={pageMode} />} >
                        <ListItemText primary="Shredded Lettuce (1/16th)" />
                    </ListItem>
                    <ListItem secondaryAction={<RemoveButton pageMode={pageMode} />} >
                        <ListItemText primary="Sliced Tomato (1 slice)" />
                    </ListItem>
                    <ListItem secondaryAction={<RemoveButton pageMode={pageMode} />} >
                        <ListItemText primary="Pickles (5)" />
                    </ListItem>
                </List>
                {pageMode === PAGE_STATE.EDIT && <Button fullWidth={false}>Add Standard Topping</Button>}
            </Box>
        </Stack>
    </Box>
}