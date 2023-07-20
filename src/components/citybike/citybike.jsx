import { useEffect } from "react";
import { UserAuth } from "../../context/AuthContext";

function CityBike() {
  const { currentUser } = UserAuth();

  useEffect(() => {
    console.log("current use before load the page", currentUser);
  });
  return <div>CityBike</div>;
}

export default CityBike;
