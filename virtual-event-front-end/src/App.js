import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CreateEventForm from './component/CMS/CreateEventForm';
import EventDetailsPage from './component/CMS/EventDetailsPage';
import BoothDetailsPage from './component/CMS/BoothDetailsPage';
import WebinarDetailsPage from './component/CMS/WebinarDetailsPage';
import EventLobbyPage from './component/VE/EventLobbyPage';
import EventWebinarListPage from './component/VE/EventWebinarListPage';
import EventWebinarDetailPage from './component/VE/EventWebinarDetailPage';
import EventBoothListPage from './component/VE/EventBoothListPage';
import EventBoothDetailPage from './component/VE/EventBoothDetailPage';
import EventCustomPage from './component/VE/EventCustomPage';
import CMSBoothListPage from './component/CMS/EventBoothListPage';
import CMSWebinarListPage from './component/CMS/EventWebinarListPage';
import EventLobbyEditor from './component/CMS/EventLobbyEditor';

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/cms/admin/create_event">
        <CreateEventForm />
      </Route>
      <Route exact path="/cms/events/:eventId/booths/:id">
        <BoothDetailsPage />
      </Route>
      <Route exact path="/cms/events/:eventId/booths">
        <CMSBoothListPage />
      </Route>
      <Route exact path="/cms/events/:eventId/webinars/:id">
        <WebinarDetailsPage />
      </Route>
      <Route exact path="/cms/events/:eventId/webinars">
        <CMSWebinarListPage />
      </Route>
      <Route exact path="/cms/events/:eventId/lobby">
        <EventLobbyEditor />
      </Route>
      <Route exact path="/cms/events/:eventId">
        <EventDetailsPage />
      </Route>
      <Route exact path="/events/:id">
        <EventLobbyPage />
      </Route>
      <Route exact path="/events/:id/lobby">
        <EventLobbyPage />
      </Route>
      <Route exact path="/events/:eventId/webinars">
        <EventWebinarListPage />
      </Route>
      <Route exact path="/events/:eventId/booths">
        <EventBoothListPage />
      </Route>
      <Route exact path="/events/:eventId/webinars/:webinarId">
        <EventWebinarDetailPage />
      </Route>
      <Route exact path="/events/:eventId/booths/:boothId">
        <EventBoothDetailPage />
      </Route>
      <Route exact path="/events/:eventId/custom">
        <EventCustomPage />
      </Route>
    </Switch>
  </Router>
);

export default App;
