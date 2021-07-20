import React, { FC } from 'react';
import styled from 'styled-components';
import StyledLink from '../common/StyledLink';

const AppBarContainer = styled.div`
  width: 100%;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 4px 0 #efefef;
`;

const AppBarItem = styled.div`
  padding: 8px;
  font-size: 1.5em;
  line-height: 1.5em;
  color: black;
`;

const LINK = ['Lobby', 'Webinars', 'Booths', 'Custom'];

interface AppBarProps {
  eventId: string;
}

const AppBar: FC<AppBarProps> = ({ eventId }) => (
  <AppBarContainer>
    {LINK.map((link) => (
      <AppBarItem>
        <StyledLink to={`/events/${eventId}/${link.toLocaleLowerCase()}`}>
          {link}
        </StyledLink>
      </AppBarItem>
    ))}
  </AppBarContainer>
);

export default AppBar;
