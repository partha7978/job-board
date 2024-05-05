import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "jobs",
  initialState: {
    items: [],
    totalCount: 0,
    backupItems: [],
    filteredItems: [],
  },
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    addTotalCount: (state, action) => {
      state.totalCount = action.payload;
    },
    removeItem: (state, action) => {
      state.items.splice(action.payload, 1);
    },
    clearItem: (state) => {
      state.items.length = 0;
    },
    clearTotalCount: (state) => {
      state.totalCount = 0;
    },
    addBackupItem: (state, action) => {
      state.backupItems.push(action.payload);
    },
    addFilteredItem: (state, action) => {
      state.filteredItems.push(action.payload);
    },
    removeFilteredItem: (state, action) => {
      state.filteredItems.length = 0;
    }
  },
});

export const { addItem, removeItem, clearItem, addFilteredItem, removeFilteredItem, addBackupItem, addTotalCount, clearTotalCount } = jobSlice.actions;

export default jobSlice.reducer;
