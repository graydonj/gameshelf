import React, {useEffect, useState} from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { auth, logout } from './firebase';

function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  // on mount we check for the user
  useEffect(() => {
    if (loading) {
      // load screen
      return;
    }
    if (!user) return navigate("/");
  }, [user, loading]);

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        Logged in as 
        <div>{user?.displayName}</div>
        <div>{user?.email}</div>
        <button className="dashboard-btn" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  )
}

export default Dashboard