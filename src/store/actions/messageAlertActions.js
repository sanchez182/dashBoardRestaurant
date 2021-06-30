export const OPEN_ALERT = 'OPEN_ALERT';

export const setOpenMessageAlert = (params) => async (dispatch) => {
  dispatch({
    type: OPEN_ALERT,
    message: '',
    severity: 'success',
    show: false,
    duration: 6000
  });
  dispatch(
    {
      type: OPEN_ALERT,
      message: params.message,
      severity: params.severity,
      show: params.show,
      duration: params.duration
    });
}