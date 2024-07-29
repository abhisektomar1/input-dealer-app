import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Lan {
  lan: number | null;
}

const initialState: Lan = {
  lan: 1,
};

const LanSlice = createSlice({
  name: "lan",
  initialState,
  reducers: {
    setLan(state, action: PayloadAction<number>) {
      state.lan = action.payload;
    },
    clearLan(state) {
      state.lan = null;
    },
  },
});

export const { setLan, clearLan } = LanSlice.actions;

export default LanSlice.reducer;