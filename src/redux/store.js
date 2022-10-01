import { configureStore } from '@reduxjs/toolkit';
import audioReducer from './audioSlice';
import toggleReducer from './toggleSlice';

export default configureStore({
    reducer: {
        audio: audioReducer,
        toggle: toggleReducer,
    },
});
