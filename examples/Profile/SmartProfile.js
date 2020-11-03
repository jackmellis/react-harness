import React from 'react';
import { useSelector } from 'react-redux';
import DumbProfile from './DumbProfile';

const SmartProfile = () => {
  // do we really want to have to mock and then maintain our redux state in the header story?
  const profile = useSelector((state) => state.profile);

  return (
    <DumbProfile {...profile}/>
  );
};

export default SmartProfile;
