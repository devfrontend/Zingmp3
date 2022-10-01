import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    isOpenThemModal: false,
};

const toggleSlice = createSlice({
    name: 'toggle',
    initialState,
    reducers: {
        setIsOpenThemModal: (state, action) => {
            state.isOpenThemModal = action.payload;
        },
    },
});

export const { setIsOpenThemModal } = toggleSlice.actions;
export default toggleSlice.reducer;
