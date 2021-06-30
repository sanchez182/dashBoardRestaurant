import { Grid } from '@material-ui/core';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

const ClientTables: FC = () => {
/*   const { language } = useSelector((state: RootState) => state.lang);
 */
  return (
        <Grid   container >
          <p>Aca se muestran todas las mesas del restaurant</p>
          
        </Grid>
 
  );
}

export default ClientTables;