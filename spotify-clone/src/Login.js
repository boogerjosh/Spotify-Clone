import React from 'react'
import "./Login.css";
import { accessUrl } from './spotify';


function Login() {
  return (
    <div className="login">
      <img
        src="https://www.freepnglogos.com/uploads/spotify-logo-png/image-gallery-spotify-logo-21.png"
        alt=""
      />

      <a href={accessUrl}>Login with Spotify</a>

    </div>
  )
}

export default Login