import {configureStore} from '@reduxjs/toolkit';
import searchSlice from '../reducers/searchReducer';
import {logger} from '../logger';

const store = configureStore({
  reducer: {
    searchStore: searchSlice.reducer,
  },
  // Uncomment this to view redux logs
  // middleware: [logger],
});

export default store;
