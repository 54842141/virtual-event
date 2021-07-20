import initFirebase from './helpers/initFirebase';
import eventHandler from './handlers/events';
import boothHandler from './handlers/booths';
import webinarHandler from './handlers/webinars';
import bannerContainerHandler from './handlers/bannerContainers';
import bannerHandler from './handlers/banners';
import announcementHandler from './handlers/announcements';
initFirebase();

export const event = eventHandler;
export const booth = boothHandler;
export const webinar = webinarHandler;
export const bannerContainer = bannerContainerHandler;
export const banner = bannerHandler;
export const announcements = announcementHandler;
