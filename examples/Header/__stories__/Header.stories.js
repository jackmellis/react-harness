import React from 'react';
import Harness from 'react-harness';
import Header from '../Header';
import { DumbProfile, SmartProfile } from '../../Profile';

export default {
  title: 'Header',
};

export const BsaicHeader = () => (
  <Harness
    Component={SmartProfile}
    Stub={DumbProfile}
    name="joe"
    email="joe@blogs.com"
  >
    <Header/>
  </Harness>
);
