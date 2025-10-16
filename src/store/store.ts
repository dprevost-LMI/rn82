import { configureStore } from '@reduxjs/toolkit';
import { rozeniteDevToolsEnhancer } from '@rozenite/redux-devtools-plugin';
import counterReducer from './slices/counterSlice';

const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
  enhancers: (getDefaultEnhancers) =>
    getDefaultEnhancers().concat(rozeniteDevToolsEnhancer()),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;