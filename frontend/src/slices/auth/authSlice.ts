import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector, TypedUseSelectorHook } from "react-redux";
import { RootState } from "src/app/store";

interface IAuthState {
  openDrawer: boolean;
  collapse: number | null;
}

const initialState: IAuthState = {
  openDrawer: false,
  collapse: null,
};

const ui = createSlice({
  name: "ui",
  initialState,
  reducers: {},
});

export const {} = ui.actions;

export const useUISelector: TypedUseSelectorHook<RootState> = useSelector;

export default ui.reducer;
