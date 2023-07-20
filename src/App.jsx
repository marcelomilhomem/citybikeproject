import { Route, Routes } from "react-router-dom";
import "./App.css";
import Nav from "./components/navbar/navBar";
import SignUp from "./components/login/Login";
import Protected from "./context/Protected";
import { AuthContextProvider } from "./context/AuthContext";
import MapTest from "./components/googleMap/googleMap";
import { Divider } from "@chakra-ui/react";
import LandingPage from "./components/landingPage/LandingPage";

function App() {
  return (
    <div>
      <AuthContextProvider>
        <Nav />
        <Divider />
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route
            path="/landing-page"
            element={
              <Protected>
                <LandingPage />
              </Protected>
            }
          />
          <Route path="/map" element={<MapTest />} />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
