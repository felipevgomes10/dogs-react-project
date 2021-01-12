import { TOKEN_POST } from '../api';
import createAsyncSlice from './helpers/createAsyncSlice';

const token = createAsyncSlice({
  name: 'token',
  initialState: {
    data: {
      token: window.localStorage.getItem('token') || null,
    },
  },
  fetchConfig: (user) => TOKEN_POST(user),
});

export const fetchToken = token.asyncAction;
export const { resetState: resetTokenState } = token.actions;
export default token.reducer;
