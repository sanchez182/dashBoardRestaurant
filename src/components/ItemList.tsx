import { Grid } from '@material-ui/core';
import { useSelector } from 'react-redux';
import './itemTable.css';

const ItemList = () => {
/*   const { language } = useSelector((state: RootState) => state.lang);
 */
  return (
    <table className="itemsTable">
    <thead>
    <tr>
    <th>id item</th>
    <th>Item Name</th>
    <th>Cant</th>
    </tr>
    </thead>
    <tbody>
    <tr>
    <td>cell1_1</td><td>cell2_1</td><td>cell3_1</td></tr>
    <tr>
    <td>cell1_2</td><td>cell2_2</td><td>cell3_2</td></tr>
    <tr>
    <td>cell1_3</td><td>cell2_3</td><td>cell3_3</td></tr>
    </tbody>
    </table>
 
  );
}

export default ItemList;