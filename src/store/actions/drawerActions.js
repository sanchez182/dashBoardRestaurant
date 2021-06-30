export const OPEN_CLOSE = 'OPEN_CLOSE';

export const openCloseDrawer = (value) => async (dispatch) => {
    dispatch({
        type: OPEN_CLOSE,
        value
    });
};