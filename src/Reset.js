import React, {useEffect, useState} from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, redirect } from "react-router-dom";
import { auth, sendPasswordReset } from "./firebase";

function Reset() {

  // set state
  const [email, setEmail] = useState("");
  const [user, loading, error] = useAuthState(auth);

  // if we are loading pop out; if the user is valid go to the dashboard
  useEffect(() => {
    if (loading) return;
    if (user) return redirect("/dashboard");
  }, [user, loading]);

  //
  return (
    <div className="login">
      <div className="login-container">
        <input
          type="text"
          className="login-textbox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <button
          className="login-btn"
          onClick={() => sendPasswordReset(email)}
        >Send password reset e-mail</button>
        <div>
          Don't have an account? <Link to="/register">Register</Link> now.
        </div>
      </div>
    </div>
  )
}

export default Reset