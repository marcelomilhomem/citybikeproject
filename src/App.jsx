import { Route, Routes } from "react-router-dom";
import "./App.css";
import Nav from "./components/navbar/navBar";
import SignUp from "./components/login/Login";
import CityBike from "./components/citybike/citybike";

function App() {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/citybike" element={<CityBike />} />
      </Routes>
    </div>
  );
}

export default App;
