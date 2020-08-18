import React from 'react';
import {NavLink} from 'react-router-dom';

import { TopNav, Toolbar, Tab } from '@material-ui/core'

const navLinks = () => {
  return (
    <>
      <NavLink />
      <NavLink />
    </>
  )
}

const Nav = props => {
  const { loggedIn } = props
  return (
    <nav>
      {
        loggedIn ?
        navLinks() :
        null
      }
    </nav>
  );
}

export default Nav;
