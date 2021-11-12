import {
  createSlice
} from "@reduxjs/toolkit";

const initialState = {
  count: 1
}

export const testSlice = createSlice({
  name: "test",
  initialState,
  reducers: {
    increment(state, payload) {
      state.count = state.count + payload; // 内置了immutable
    },
    decrement(state) {
      state.count -= 1;
    },
  }
})
export const {
  increment,
  decrement
} = testSlice.actions;
// // 内置了thunk插件，可以直接处理异步请求
export const asyncIncrement = (payload) => (dispatch) => {
  setTimeout(() => {
    dispatch(increment(payload));
  }, 2000);
}
export default testSlice.reducer;