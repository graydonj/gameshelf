import React from 'react';
import { Link } from 'react-router-dom';

function ErrorPage() {
  return (
    <div className="container">
      <h2>404!</h2>
      <p>In this crazy game we call life sometimes serendipity leads you down a path of fortuitous grace, allowing you to duck and dodge all the slings and arrows of outrageous fortune, as the bard would say, and sup at the table of the gods like a hero of yesteryear, draped in golden finery and reveling in the songs of the ancients as they are sung by the honeyed vocals of a choir of sun-kissed angels, and every song is about your stupendous exploits of valour and wisdom and courage and the fact that you smell real good.</p>
      <p>Other times you can't find the webpage you're looking for.</p>
      <div className="return-link">
        <p>
          Click <Link to={`/`}>here</Link> to return to GameShelf.
        </p>
      </div>
    </div>
  )
}

export default ErrorPage