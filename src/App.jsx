import { Route, Routes } from "react-router-dom";
import "./App.css";
import Nav from "./components/navbar/navBar";
import SignUp from "./components/login/Login";
import Protected from "./context/Protected";
import { AuthContextProvider } from "./context/AuthContext";
import { Divider } from "@chakra-ui/react";
import LandingPage from "./pages/landingPage/LandingPage";
import MapPage from "./pages/mapPage/MapPage";

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
          <Route
            path="/map"
            element={
              <Protected>
                <MapPage />
              </Protected>
            }
          />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
