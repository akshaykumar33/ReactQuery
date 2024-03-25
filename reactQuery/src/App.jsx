import './App.css'
import { Outlet } from "react-router-dom";


function App() {
  return (
    <>
      <div className="card">
        <h1 style={{ display: 'flex', boxShadow: '0.1em 0.2em 0.3em black', background: 'yellow' }}>
          {"It's a homePage"}
        </h1>
      </div>
      <Outlet />
      </>
  )
}

export default App;
