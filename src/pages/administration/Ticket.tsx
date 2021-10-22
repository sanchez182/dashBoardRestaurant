import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import { IOrder } from "../../store/actions/actionsInterfaces/IOrdersActions";
import './table.css';

interface ITicket{
    order: IOrder | undefined,
    open: boolean,
    setOpenMenu: any
}
const Ticket = ({order,open,setOpenMenu}: ITicket) => {
 
    const printReceipt = ()=> {
        window.print();
      }
debugger
  return (
    <Dialog  onClose={()=>setOpenMenu(false)} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title">
          Ticket
        </DialogTitle>
        <DialogContent dividers> 
        <table>
          <tr>
            <th>Price</th>
            <th>Cant</th>
            <th>Item</th>
          </tr>
          {order && order.itemsOrder.itemsDrink.map((item)=>{
            return <tr>
                  <td>{item.drink.price}</td>
                  <td>{item.quantity}</td>
                  <td>{item.drink.drinkName}</td>
           
          </tr>
              })} 
          {order && order.itemsOrder.itemsFood.map((item)=>{
            return  (<tr>
                  <td>{item.plate.plateName}</td>
           
          </tr>)
              })} 
        </table>
        </DialogContent>
        <DialogActions className="hide-on-print" >
          <Button autoFocus className="hide-on-print"  onClick={printReceipt} color="primary">
            Imprimir
          </Button>
          <Button autoFocus className="hide-on-print"  onClick={()=>setOpenMenu(false)} color="primary">
            Salir
          </Button>
        </DialogActions>
      </Dialog>
  );
};

export default Ticket;
