import React from 'react';
import Snackbar, { SnackbarOrigin } from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux';
import { RootState } from '../store';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
 

export interface State extends SnackbarOrigin {
  open: boolean;
}

export const AlertComponent = (props: any) => {
  const { t } = useTranslation();
  const { show, severity, message, duration } = useSelector((state: RootState) => state.openMessageAlert);
 
  const [state, setState] = React.useState<State>({
    open: false,
    vertical: 'top',
    horizontal: 'right',
  });
  
  const { vertical, horizontal, open } = state;

  React.useEffect(() => {
    if (show) {
      setState({ ...state, open: true });
    } else {
      setState({ ...state, open: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  return (
     
    <Snackbar open={open} id='Snack' autoHideDuration={!duration ? 6000 : duration}
     onClose={handleClose} anchorOrigin={{ vertical, horizontal }}>
      <Alert id='AlertComponent' onClose={handleClose} severity={severity}>
        {message.length > 0 ?
          <p>{t(message)}</p>
          :
          ''
        }

      </Alert>
    </Snackbar>
  );
}

export default AlertComponent;