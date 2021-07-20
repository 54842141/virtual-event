import React from 'react';
import {
  Drawer,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import { useParams } from 'react-router-dom';
import StyledLink from '../common/StyledLink';

const LINK = [
  {
    link: '',
    label: 'General Settings',
  },
  {
    link: 'booths',
    label: 'Booths',
  },
  {
    link: 'webinars',
    label: 'Webinars',
  },
  {
    link: 'lobby',
    label: 'Lobby',
  }];
const StyledDrawer = () => {
  const { eventId } = useParams<{ eventId: string }>();
  return (
    <Drawer
      // className={classes.drawer}
      variant="persistent"
      anchor="left"
      open
      // classes={{
      //   paper: classes.drawerPaper,
      // }}
    >
      <List>
        {LINK.map(({ label, link }, index) => (
          <StyledLink key={link} to={`/cms/events/${eventId}/${link}`}>
            <ListItem button>
              <ListItemIcon><InboxIcon /></ListItemIcon>
              <ListItemText primary={label} />
            </ListItem>
          </StyledLink>
        ))}
      </List>
      <Divider />
    </Drawer>
  );
};

export default StyledDrawer;
