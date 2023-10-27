import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector, TypedUseSelectorHook } from "react-redux";
import { RootState } from "app/store";

interface ICollapse {
  id: number;
  open: boolean;
}

interface IUIState {
  openDrawer: boolean;
  collapse: number | null;
  navbar: string | null;
}

const initialState: IUIState = {
  openDrawer: false,
  collapse: null,
  navbar: null,
};

export const isCollapsed = (collapsedItems: ICollapse[], itemId: number) => {
  return collapsedItems.some((item) => item.id === itemId);
};

const ui = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleOpenDrawer(state: IUIState) {
      state.openDrawer = !state.openDrawer;
    },
    setCollapse(state: IUIState, { payload }: PayloadAction<number | null>) {
      state.collapse = payload;
    },
    setNavbar(state: IUIState, { payload }: PayloadAction<string | null>) {
      state.navbar = payload;
    },
  },
});

export const { setCollapse, toggleOpenDrawer, setNavbar } = ui.actions;

export const useUISelector: TypedUseSelectorHook<RootState> = useSelector;

export default ui.reducer;
