import React from 'react';
import SwipeableViews from 'react-swipeable-views';

export default function TabInfo(props) {
  return (
    <SwipeableViews index={props.activeTab} onChangeIndex={props.toggle}>
      {props.children}
    </SwipeableViews>
  );
}