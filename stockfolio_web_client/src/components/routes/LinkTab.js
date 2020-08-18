import React from 'react';

import {Tab} from '@material-ui/core'
import { useHistory } from 'react-router-dom'


const LinkTab = props => {
  const history = useHistory()
  const { to } = props
  const clickHandler = e => {
    e.preventDefault()
    history.push(to)
  }
  return (
    <Tab 
      component="a"
      onClick={clickHandler}
      {...props}
    />
  )
      
}

export default LinkTab;
