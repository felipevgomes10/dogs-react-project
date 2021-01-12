import { PHOTOS_GET } from '../api';
import createAsyncSlice from './helpers/createAsyncSlice';

const feed = createAsyncSlice({
  name: 'feed',
  initialState: {
    list: [],
    pages: 1,
    infinite: true,
  },
  reducers: {
    addPhotos(state, action) {
      state.list.push(...action.payload);
      if (action.payload.length === 0) state.infinite = false;
    },
    addPage(state) {
      state.pages++;
    },
    resetState(state) {
      state.list = [];
      state.pages = 1;
      state.infinite = true;
      state.data = null;
      state.error = null;
      state.loading = false;
    },
  },
  fetchConfig: ({ page, total, user }) => PHOTOS_GET({ page, total, user }),
});

export const fetchFeed = feed.asyncAction;
export const { addPhotos, addPage, resetState: resetFeedState } = feed.actions;

export const loadNewPhotos = ({ total = 6, user }) => async (
  dispatch,
  getState,
) => {
  const { feed } = getState();
  const { payload } = await dispatch(
    fetchFeed({ page: feed.pages, total, user }),
  );
  dispatch(addPage());
  dispatch(addPhotos(payload));
};

export default feed.reducer;
