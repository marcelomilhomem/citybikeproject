import { Route, Routes } from "react-router-dom";
import "./App.css";
import Nav from "./components/navbar/navBar";
import SignUp from "./components/login/Login";
import CityBike from "./components/citybike/citybike";
import Protected from "./context/Protected";
import { AuthContextProvider } from "./context/AuthContext";
import GoogleMap from "./components/googleMap/googleMap";
import MapTest from "./components/googleMap/googleMap";

function App() {
  return (
    <div>
      <AuthContextProvider>
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
            <Route
          path="/map"
          element={
              <MapTest />
          }
        />
      </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
