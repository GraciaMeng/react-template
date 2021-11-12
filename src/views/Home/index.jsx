import React from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const testSlice = useSelector((state) => state.testSlice);
  return (
    <div>
      <h1>{testSlice.count}</h1>
    </div>
  );
};

export default Home;
