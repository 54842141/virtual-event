import { createSlice } from '@reduxjs/toolkit';

export const viewedAnnouncementsSlice = createSlice({
  name: 'viewedAnnouncements',
  initialState: [] as string[],
  reducers: {
    addViewedAnnouncements: (state, action) => {
      console.log(state);
      return [...state, action.payload];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addViewedAnnouncements } = viewedAnnouncementsSlice.actions;

export default viewedAnnouncementsSlice.reducer;
