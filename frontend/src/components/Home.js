import React from "react";
import NavButtons from "./NavButtons";


const Home = () => {
  return (
    <div>
      <h1 className="home">Home</h1>
      <div className="image-container">
        <img
          src="https://f4.bcbits.com/img/0024637118_10.jpg"
          alt="taariq elliott"
          className="homeImage"
        />
      </div>

      <NavButtons />
    </div>
  );
};

export default Home;
