import { Grid } from '@material-ui/core'; 
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../store';
import ClientTables from './ClientTables/ClientTables';

const DashboardMenu = () => {
/*   const { language } = useSelector((state: RootState) => state.lang);
 */
  return (
        <ClientTables/>
 
  );
}

export default DashboardMenu;