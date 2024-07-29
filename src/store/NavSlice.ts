import { createSlice, PayloadAction } from "@reduxjs/toolkit";



interface Nav {
  nav: string;
}

const initialState: Nav = {
  nav: "Home",
};

const NavSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    setNav(state, action: PayloadAction<string>) {
      state.nav = action.payload;
    },
    clearNav(state) {
      state.nav = "";
    },
  },
});

export const { setNav, clearNav } = NavSlice.actions;

export default NavSlice.reducer;