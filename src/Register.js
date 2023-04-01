import React, {useEffect, useState} from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, redirect } from 'react-router-dom';
import { auth, registerWithEmailAndPassword, signInWithGoogle } from './firebase';
import Swal from 'sweetalert2';

function Register() {

  // set state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading, error] = useAuthState(auth);

  // register without Google
  const register = () => {
    if (!name) {
      Swal.fire({
        icon: "error",
        title: "Username Empty",
        text: "Please enter a user name"
      });
    }
    registerWithEmailAndPassword(name, email, password);
  }

  // if we are loading pop out; if the user is valid go to the dashboard
  useEffect(() => {
    if (loading) return;
    if (user) return redirect("/dashboard");
  }, [user, loading]);

  return (
    <div className="login">
      <div className="login-container">
        <input
          type="text"
          className="login-textbox"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="User Name"
        />
        <input
          type="text"
          className="login-textbox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="login-textbox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button className="login-btn" onClick={register}>Register</button>
        <button className="login-btn login-google" onClick={signInWithGoogle}>Register with Google</button>
        <div>
          Already have an account? <Link to="/">Login</Link> now.
        </div>
      </div>
    </div>
  )
}

export default Register