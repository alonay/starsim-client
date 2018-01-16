import React from 'react';
import withAuth from '../hocs/withAuth';

const Profile = props => {
  return (
    <div>
      <h1>Congrats You are Logged In</h1>
      <p>Stats...</p>
    </div>
  );
};

export default withAuth(Profile);
