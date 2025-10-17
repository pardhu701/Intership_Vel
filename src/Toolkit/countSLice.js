import { createSlice } from "@reduxjs/toolkit";


const countSlice = createSlice(
    {
        name: 'counter',
        init: { count: 0 },
        reducers: {
            increment: (state) => {
                state.value += 1;
            },
            decrement: (state) => {
                state.value -= 1;
            },
            reset: (state) => {
                state.value = 0;
            }
        }
    }
)

export const { increment, decrement, reset } = countSlice.actions;
export default countSlice.reducer;