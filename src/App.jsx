import { Route, Routes } from "react-router-dom";
import "./App.css";
import Nav from "./components/navbar/navBar";
import Protected from "./context/Protected";
import { AuthContextProvider } from "./context/AuthContext";
import { Divider } from "@chakra-ui/react";
import LandingPage from "./pages/landingPage/LandingPage";
import MapPage from "./pages/mapPage/MapPage";
import { LanguageProvider } from "./context/LanguageContext";
import Login from "./pages/login/login";

function App() {
  return (
    <div>
      <LanguageProvider>
        <AuthContextProvider>
          <Nav />
          <Divider />
          <Routes>
            <Route path="/" element={<Login />} />
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
      </LanguageProvider>
    </div>
  );
}

export default App;
