import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    menus: null, isOpen: false, activeMenu: null,
};

const sidebarSlice = createSlice({
    name: "sidebar",
    initialState,
    reducers: {
        setMenus: (state, action) => { state.menus = action.payload; },
        openMenus: (state) => { state.isOpen = true; },
        closeMenus: (state) => { state.isOpen = false; },
        toggleMenus: (state) => { state.isOpen = !state.isOpen; },
        setActiveMenu: (state, action) => { state.activeMenu = action.payload; },
    },
});

export const {
    setMenus, openMenus, closeMenus, toggleMenus, setActiveMenu,
} = sidebarSlice.actions;

export const selectSidebar = (state) => state.sidebar;
export const selectIsSidebarOpen = (state) => state.sidebar.isOpen;
export default sidebarSlice.reducer