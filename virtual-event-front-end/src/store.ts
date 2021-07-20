import { configureStore } from '@reduxjs/toolkit';
import viewedAnnouncementsReducer from './model/viewedAnnouncements';

export default configureStore({
  reducer: {
    viewedAnnouncements: viewedAnnouncementsReducer,
  },
});
