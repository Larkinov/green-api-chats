import { createSlice } from "@reduxjs/toolkit";

interface IprofileSlice {
  idInstance: string,
  apiTokenInstance: string,
}

const initialState : IprofileSlice = {
  idInstance: "",
  apiTokenInstance: "",
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setIdProfile(state, action) {      
      state.idInstance = action.payload.idInstanceUI;
      state.apiTokenInstance = action.payload.apiTokenInstanceUI;
    },
  },
});

export const {
  setIdProfile,
} = profileSlice.actions;

export default profileSlice.reducer;
