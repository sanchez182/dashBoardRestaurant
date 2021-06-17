import React from 'react';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { IModelDrinks, IModelFood } from '../interfaces/IModelMenuItem';
import { Card, CardContent, CardHeader } from '@material-ui/core';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

interface IDialogMenu {
    open: boolean;
    setOpenMenu: () => void;
}
const DialogMenu = ({open,setOpenMenu}: IDialogMenu)=> { 
    const { items }= useSelector((state: RootState) => state.menuItemReducer);
    const renderFood = items.food.filter( (x:IModelFood)=> x.cant > 0)
    const renderDrink = items.drink.filter( (x:IModelDrinks)=> x.cant > 0)
  return (
      <Dialog onClose={setOpenMenu} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={setOpenMenu}>
          Listado de productos seleccionados
        </DialogTitle>
        <DialogContent dividers> 
        <h4>Platillos</h4>
         { renderFood.length >0 ? renderFood.map((item:IModelFood)=>{
                  return <Card>
                  <CardHeader
                    title={`${item.plateName}   Cant.${item.cant}`}
                  />
                  <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                             {item.description}
                    </Typography>
                  </CardContent>
                </Card>
            }) :
            <Typography variant="body2" color="textSecondary" component="p">
            Aún no has seleccionado ningún platillo para pedir.
          </Typography>
          
          }
<br/>
<br/>
<br/>
          <h4>Bebidas</h4>
            { renderDrink.length >0 ? renderDrink.map((item:IModelDrinks)=>{
              return <Card>
              <CardHeader
                title={`${item.drinkName}   Cant.${item.cant}`}
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                         {item.description}
                </Typography>
              </CardContent>
            </Card>
        }) 
            :
            <Typography variant="body2" color="textSecondary" component="p">
            Aún no has seleccionado ninguna bebida para pedir.
          </Typography>
            }
          
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={setOpenMenu} color="primary">
            Pedir comida
          </Button>
          <Button autoFocus onClick={setOpenMenu} color="primary">
            Salir
          </Button>
        </DialogActions>
      </Dialog>
  );
}

export default DialogMenu;
