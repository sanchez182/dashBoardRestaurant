
import React, { useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// Icons
import { ExpandLess, ExpandMore } from '@material-ui/icons';
// Components
import { ListItem, ListItemIcon, ListItemText, Collapse, List } from '@material-ui/core';
import RecursiveListItemMenu from './ListItemMenu';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    nestedLevel: {
        paddingLeft: theme.spacing(2),
    },
}));


const ListItemMenu = ({ route: { path, name, children, component, iconName }, open, location }) => {
    const [openNested, setOpenNested] = useState(false);
    const classes = useStyles();
    const { t } = useTranslation(); 

    const handleClick = () => {
        setOpenNested(!openNested);
    };

    const checkActive = (path) => {
        if (path === location.pathname) {
            return true;
        }
        return false;
    };

    const renderCollapse = (childInMenu) => {
        return (
            <Collapse in={openNested} timeout='auto' unmountOnExit>
                <List disablePadding className={classes.nestedLevel} style={{ paddingLeft: '8px', backgroundColor: 'gainsboro' }}>
                    {childInMenu.map((route) => {
                        const { name } = route;
                        return <RecursiveListItemMenu open={open} route={route} key={name} />;
                    })}
                </List>
            </Collapse>);
    }

    const renderListItem = (activeClass) => {
        return (
            <ListItem button component={Link} to={path} className={activeClass} style={{ backgroundColor: 'gainsboro' }}>
                {
                    iconName &&
                    <ListItemIcon>
                        {iconName}
                    </ListItemIcon>
                }
                <ListItemText primary={t(`sidebar.link.${name}`)} />
            </ListItem>
        );
    }
    const renderListItemComponent = (childInMenu, activeClass) => {
        return (
            <>
                <ListItem button component={Link} to={path} className={activeClass} >
                    {
                        iconName &&
                        <ListItemIcon>
                            {iconName}
                        </ListItemIcon>
                    }
                    <ListItemText primary={t(`sidebar.link.${name}`)} />
                    {openNested ? <ExpandLess onClick={handleClick} /> : <ExpandMore onClick={handleClick} />}
                </ListItem>

                {open && renderCollapse(childInMenu)}
            </>
        );
    }

    const drawRoutes = () => {
        const childInMenu = children && children.filter((child) => child.showInMenu === true);
        const activeClass = checkActive(path) ? 'activeLink' : '';
        if (component && (!childInMenu || childInMenu.length === 0)) {
            return renderListItem(activeClass)
        }
        if (childInMenu && childInMenu.length > 0) {
            if (component) {
                return renderListItemComponent(childInMenu, activeClass)
            }

            return (
                <>
                    <ListItem button onClick={handleClick} className={activeClass} >
                        {
                            iconName &&
                            <ListItemIcon>
                                {iconName}
                            </ListItemIcon>
                        }
                        <ListItemText primary={t(`sidebar.link.${name}`)} />
                        {openNested ? <ExpandLess onClick={handleClick} /> : <ExpandMore onClick={handleClick} />}
                    </ListItem>

                    {open && renderCollapse(childInMenu)}
                </>
            );
        }
        return null;
    };
    return drawRoutes();
};

export default  withRouter(ListItemMenu)