import {  useTheme,  } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { openCloseDrawer } from '../../store/actions/drawerActions';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Home } from '@material-ui/icons';
import ListItemMenu from '../ListItemMenu';
import React from 'react';



export const DrawerMenu = ({routes})=> {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { open } = useSelector((state) => state.drawerState);
  const isOpen = open ? "drawerOpen" : "drawerClose"

  const handleDrawerClose = () => {
    dispatch(openCloseDrawer(false));
  };

  const handleDrawerOpen = () => {
    dispatch(openCloseDrawer(true));
  };


  const renderListItem =()=>{
    return routes && routes.map((route)=>{
      const {showInMenu, name} = route;

      if(showInMenu){
        if(route.children && route.children.length <= 0){
          return null;
        }else{
          return ( 
            <ListItemMenu
              key={name}
              route={route}
              open={open}
            />
          )
        }
      }else{
        return null;
      }
    })
  }
  return (
    <Drawer
      variant="permanent"
      className={`drawer ${isOpen}`}
      classes={{paper: isOpen }}
    >
      <div className="toolbar justify-content-between">
        <Link to="/">
        <ListItem button >
            <ListItemIcon>
               <Home /></ListItemIcon>
            <ListItemText primary={"Home"} />
          </ListItem>
        </Link>
        <IconButton color="inherit" data-testid="close-button" onClick={handleDrawerClose}>
          {theme.direction === 'rtl' ?    <ChevronRightIcon/> : <ChevronLeftIcon />}
        </IconButton>
      </div>
      <Divider />
      <List className="general-list" onClick={handleDrawerOpen} >
        { renderListItem(routes)}
      </List>
    </Drawer>
  );
}

export default React.memo(DrawerMenu);