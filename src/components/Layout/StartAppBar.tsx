import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Toolbar, AppBar, IconButton, Typography, Grid, List, ListItem, Menu, MenuItem } from '@material-ui/core';
import { Menu as MenuIcon, AccountCircle as UserIcon } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import { openCloseDrawer } from '../../store/actions/drawerActions';
import SpecialDialLenguage from '../SpecialDialLenguage';
import { RootState } from '../../store';
import { startLogout } from '../../actions/auth';
 
const StartAppBar = () => {
    
    const { t } = useTranslation();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const { name } = useSelector((state: RootState) => state.restaurantData);

    
  const { open } = useSelector((state: RootState) => state.drawerState); 

  const dispatch = useDispatch();

    const handleDrawerOpen = () => {
        dispatch(openCloseDrawer(true));
    };

    const handleClick = (event:any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const logoutMenu = () => {
        handleClose();
        dispatch( startLogout());
    }

    return (
        <AppBar elevation={0} position='fixed' className={`appBar ${(open ? 'appBarShift' : '')}`}>
            <Toolbar>
                <Grid container>
                    <Grid item xs={8} md={6} className="column-logo">
                            <IconButton
                                color='inherit'
                                aria-label='Menu'
                                onClick={handleDrawerOpen}
                                edge='start' 
                               className={`menuButton${(open ? ' hide' : '')}`} 
                            >
                                <MenuIcon />
                            </IconButton>
            
                        <Typography variant='h6' noWrap>
                           {name}
                        </Typography>
                    </Grid>
                    <Grid item xs={4} md={6} className="column-info">
                        <List className="menu">
                            <SpecialDialLenguage />
                            <ListItem>
                                <IconButton id="iconButton"  onClick={handleClick} color="inherit">
                                    <UserIcon />
                                </IconButton>
                                <Menu
                                    id="settings-menu"
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    <MenuItem  id="menuItem" onClick={logoutMenu}>
                                        {t("header.logout")}
                                    </MenuItem>
                                </Menu>
                            </ListItem>
                        </List>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
};

export default StartAppBar;