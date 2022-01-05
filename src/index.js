import React, { useContext, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
// import {
//   BrowserRouter,
//   Routes,
//   Route,
//   Link
// } from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
const RouteContext = React.createContext({});
function BrowserRouter({ children }) {
  const [url, setUrl] = useState(window.location.pathname);

  useEffect(() => {
    window.history.pushState({}, '', url);
  }, [url]);

  return (
    <RouteContext.Provider value={{
      setUrl,
      url
    }}>
      {children}
    </RouteContext.Provider>
  );
}
function Routes(props) {
  return props.children;
}
function Route(props) {
  const { url } = useContext(RouteContext);

  return <div>{url === props.path ? <div>{props.element}</div> : null}</div>
}
function Link(props) {
  const { setUrl, url } = useContext(RouteContext);

  const handleClick = () => {
    setUrl(props.to);
  }
  return (
    <div onClick={handleClick}>{props.children}</div>
  )
}
function Home(props) {
  return <div>Home</div>;
}

function Teams() {
  return <div>Teams</div>;
}

function Team() {
  return <div>Team</div>;
}

ReactDOM.render(
  <BrowserRouter>
    <Link to="/">app</Link>
    <Link to="/home">home</Link>
    <Link to="/teams">teams</Link>
    <Link to="/team">team</Link>Ω
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/home" element={<Home />} />
      <Route path="/teams" element={<Teams />} />
      <Route path="/team" element={<Team />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
