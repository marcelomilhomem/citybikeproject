import { Route, Routes } from "react-router-dom";
import "./App.css";
import Nav from "./components/navbar/navBar";
import SignUp from "./components/login/Login";
import CityBike from "./components/citybike/citybike";
import Protected from "./components/navbar/Protected";

function App() {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route
          path="/citybike"
          element={
            <Protected>
              <CityBike />
            </Protected>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
