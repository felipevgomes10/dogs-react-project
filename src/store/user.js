import { USER_GET } from '../api';
import createAsyncSlice from './helpers/createAsyncSlice';
import { fetchToken, resetTokenState } from './token';

const user = createAsyncSlice({
  name: 'user',
  fetchConfig: (token) => USER_GET(token),
});

export const fetchUser = user.asyncAction;
const { resetState: resetUserState, fetchError } = user.actions;

export const userLogin = (user) => async (dispatch) => {
  const { payload } = await dispatch(fetchToken(user));
  if (payload.token) {
    await dispatch(fetchUser(payload.token));
    window.localStorage.setItem('token', payload.token);
  }
};

export const userLogout = () => async (dispatch) => {
  dispatch(resetUserState());
  dispatch(resetTokenState());
  window.localStorage.removeItem('token');
};

export const autoLogin = () => async (dispatch, getState) => {
  const { token } = getState();
  if (token?.data?.token) {
    const { type } = await dispatch(fetchUser(token.data.token));
    if (type === fetchError.type) dispatch(userLogout());
  }
};
export default user.reducer;
