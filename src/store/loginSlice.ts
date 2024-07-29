import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  
}

interface LoginState {
  user: any | null;
}

const initialState: LoginState = {
  user: null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User  | null>) {
      state.user = action.payload;
    },
    clearUser(state) {
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = loginSlice.actions;

export default loginSlice.reducer;