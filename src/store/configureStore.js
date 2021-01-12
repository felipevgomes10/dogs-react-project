import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import photo from './photo';
import photoPost from './photoPost';
import token from './token';
import user from './user';
import feed from './feed';
import ui from './ui';

const reducer = combineReducers({ photo, photoPost, token, user, feed, ui });
const middleware = [...getDefaultMiddleware()];
const store = configureStore({ reducer, middleware });

export default store;
