import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import routes from "./router";
import "./App.css";

function App() {
  const location = useLocation();
  return (
    <div className="App">
      <header className="App-header"></header>
      {/* 如果不这么做重定向，会出递归bug */}
      {location.pathname === "/" && <Navigate replace={true} to="/home" />}
      {/* 根路径为/的重定向 */}
      <Routes>
        {routes.map((route) => {
          return <Route {...route} />;
        })}
      </Routes>
    </div>
  );
}

export default App;
