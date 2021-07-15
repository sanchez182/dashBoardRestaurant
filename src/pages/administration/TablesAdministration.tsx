import { Grid } from '@material-ui/core';
import React, { FC } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTableData } from '../../actionsApi/tableActions';
import { RootState } from '../../store';

const TablesAdministration: FC = () => {
  const dispatch = useDispatch()
  const tableList = useSelector((state: RootState) => state.tablesData);
 debugger
  useEffect(() => {
    dispatch(getTableData())
  }, [dispatch])

  return (
        <Grid   container >
          <p>TablesAdministration</p>
          
        </Grid>
 
  );
}

export default TablesAdministration;