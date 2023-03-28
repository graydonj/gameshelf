import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import "./styles/App.scss";

function App() {
  return (
    <div className="App">
      <header className="header">
        <h1>GameShelf</h1>
      </header>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
